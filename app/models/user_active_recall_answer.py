from .db import db
from flask_login import current_user
import datetime


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
                           default=datetime.datetime.now(datetime.timezone.utc))
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now(datetime.timezone.utc))

    def get_difference_between_dates(self):
        old_time = (self.created_at).replace(tzinfo=datetime.timezone.utc)
        most_recent = datetime.datetime.now(datetime.timezone.utc)
        difference = most_recent - old_time

        difference_in_seconds = difference.total_seconds() - 25200
        difference_months = divmod(difference_in_seconds, 2592000)[0]
        difference_days = divmod(difference_in_seconds, 86400)[0]
        difference_minutes = divmod(difference_in_seconds, 60)[0]
        difference_hours = divmod(difference_in_seconds, 3600)[0]

        return {
            'difference_months': difference_months,
            'difference_days': difference_days,
            'difference_minutes': difference_minutes,
            'difference_seconds': difference_in_seconds,
            'difference_hours': difference_hours,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'user_active_answer': self.user_active_answer,
            # 'user_previous_answer': self.user_previous_answer,
            'user_relation': self.user_relation.to_dict_basic_user_info(),
            'quiz_card_relation': self.quiz_card_relation.to_dict_basic_info(),
            # 'active_recall_utilities_relation': self.active_recall_utilities_relation.to_dict(),
        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'user_active_answer': self.user_active_answer,
            # 'user_relation': self.user_relation.to_dict_basic_user_info(),
            # 'active_recall_utilities_relation': self.active_recall_utilities_relation.to_dict()
            'date_age': self.get_difference_between_dates()
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
                    return {'user_active_answer': '', 'user_previous_answer': ''}
        return "Unavailable. Please try a different directory"
