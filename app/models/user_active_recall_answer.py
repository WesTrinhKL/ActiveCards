from .db import db
from flask_login import current_user
import datetime
from app.models.utils import get_age_for_two_dates


class UserActiveRecallAnswer(db.Model):
    __tablename__ = 'user_active_recall_answers'

    id = db.Column(db.Integer, primary_key=True)
    user_active_answer = db.Column(db.Text, nullable=True)
    user_previous_answer = db.Column(db.Text, nullable=True)
    # is_utility = db.Column(db.Boolean, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    user_relation = db.relationship(
        'User', back_populates='user_active_recall_answer_relation')

    quiz_card_id = db.Column(db.Integer, db.ForeignKey(
        'quiz_cards.id'), nullable=False)
    quiz_card_relation = db.relationship(
        'QuizCard', back_populates='user_active_recall_answer_relation')

    active_recall_utility_id = db.Column(db.Integer, db.ForeignKey(
        'active_recall_utilities.id'), nullable=False)
    active_recall_utilities_relation = db.relationship(
        'ActiveRecallUtility', back_populates='user_active_recall_answer_relation')

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    def get_age(self):
        old_time = (self.created_at).replace(tzinfo=datetime.timezone.utc)
        most_recent = datetime.datetime.now(datetime.timezone.utc)
        return get_age_for_two_dates(old_time, most_recent)

    def to_dict(self):
        return {
            'id': self.id,
            'user_active_answer': self.user_active_answer,
            'user_relation': self.user_relation.to_dict_basic_user_info(),
            'quiz_card_relation': self.quiz_card_relation.to_dict_basic_info(),

        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'user_active_answer': self.user_active_answer,
            'date_age': self.get_age()
        }

    @staticmethod
    # queries to see if the current user has an answer yet
    def get_current_user_active_recall_answers(userId, quiz_card_id):
        if current_user.is_authenticated:
            if userId == current_user.id:
                user_answer_instance = UserActiveRecallAnswer.query.filter_by(
                    user_id=userId, quiz_card_id=quiz_card_id).all()
                if user_answer_instance:
                    return [user_answer.to_dict_basic() for user_answer in user_answer_instance]
                else:
                    return []
        return ["Unavailable. Please try a different directory"]
