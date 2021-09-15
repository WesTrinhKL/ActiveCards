from .db import db
from flask_login import current_user
from app.models.user_active_recall_answer import UserActiveRecallAnswer
import datetime
from app.models.utils import get_age_for_two_dates


class QuizCard(db.Model):
    __tablename__ = 'quiz_cards'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    card_number = db.Column(db.Integer, nullable=False)
    question = db.Column(db.String(1000), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    user_relation = db.relationship(
        'User', back_populates='quiz_card_relation')

    quiz_template_id = db.Column(db.Integer, db.ForeignKey(
        'quiz_templates.id'), nullable=False)
    quiz_template_relation = db.relationship(
        'QuizTemplate', back_populates='quiz_card_relation')

    # children (one card has many of these)
    active_recall_relation = db.relationship(
        'ActiveRecallUtility', back_populates='quiz_card_relation', cascade="all, delete-orphan")
    user_active_recall_answer_relation = db.relationship(
        'UserActiveRecallAnswer', back_populates='quiz_card_relation', cascade="all, delete-orphan")

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    def card_is_public(self):
        return not self.quiz_template_relation.is_private

    def user_owns_card(self):
        if current_user.is_authenticated:
            return current_user.id == self.user_id
        return False

    def update_time(self):
        self.updated_at = datetime.datetime.utcnow()

    def get_age(self):
        old_time = (self.created_at).replace(tzinfo=datetime.timezone.utc)
        most_recent = datetime.datetime.now(datetime.timezone.utc)
        return get_age_for_two_dates(old_time, most_recent)

    def get_age_updated_at(self):
        old_time = (self.updated_at).replace(tzinfo=datetime.timezone.utc)
        most_recent = datetime.datetime.now(datetime.timezone.utc)
        return get_age_for_two_dates(old_time, most_recent)

    def to_dict_after_created(self):
        return {
            'id': self.id,
            'title': self.title,
            'card_number': self.card_number,
            'question': self.question,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'card_number': self.card_number,
            'question': self.question,
            # 'user_relation': self.user_relation.to_dict_basic_user_info(),
            'quiz_template_id': self.quiz_template_relation.id,
            'active_recall_utility_answer': [active_recall.to_dict() for active_recall in self.active_recall_relation][0],
            # we can get the current user answer from the static method, or filter child from own model
            'current_user_answers': UserActiveRecallAnswer.get_current_user_active_recall_answers(current_user.id, self.id),
            # 'all_users_answer':
            'date_age': self.get_age(),
            # 'date_updated_at': self.get_age_updated_at(),
        }

    def to_dict_not_logged_in(self):
        return {
            'id': self.id,
            'title': self.title,
            'card_number': self.card_number,
            'question': self.question,
            'quiz_template_id': self.quiz_template_relation.id,
            'active_recall_utility_answer': [active_recall.to_dict() for active_recall in self.active_recall_relation][0],
        }

    def to_dict_basic_info(self):
        return {
            'id': self.id,
        }
