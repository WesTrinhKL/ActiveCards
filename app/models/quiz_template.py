import flask_login
from .db import db
from flask_login import current_user
import datetime
from app.models.utils import get_age_for_two_dates


class QuizTemplate(db.Model):
    __tablename__ = 'quiz_templates'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000))
    is_private = db.Column(db.Boolean, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    user_relation = db.relationship(
        'User', back_populates='quiz_template_relation')

    quiz_directory_id = db.Column(db.Integer, db.ForeignKey(
        'quiz_directories.id'), nullable=False)
    directory_relation = db.relationship(
        'QuizDirectory', back_populates='quiz_template_relation')

    quiz_card_relation = db.relationship(
        'QuizCard', back_populates='quiz_template_relation', cascade="all, delete-orphan")

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    def template_belongs_to_current_user(self):
        if current_user.is_authenticated:
            return current_user.id == self.user_id
        return False

    def get_age(self):
        old_time = (self.created_at).replace(tzinfo=datetime.timezone.utc)
        most_recent = datetime.datetime.now(datetime.timezone.utc)
        return get_age_for_two_dates(old_time, most_recent)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'is_private': self.is_private,
            'user_relation': self.user_relation.to_dict(),
            'directory_relation': self.directory_relation.to_dict_without_user(),
            'date_age': self.get_age(),
        }

    def get_quiz_cards_with_all_relationship(self):
        return {
            'id': self.id,
            'title': self.title,
            'is_private': self.is_private,
            'quiz_card_relation': sorted([card.to_dict() for card in self.quiz_card_relation], key=lambda i: i['id']),
            # example of sorting a diction by the key of age ---> sorted(lis, key = lambda i: i['age'])
            # 'user_active_recall_answer_relation': sorted([utility.to_dict() for utility in self.user_active_recall_answer_relation], key=lambda i: i['steps']),
            'user_id': self.user_id,
            'username': self.user_relation.username,
            'description': self.description,
            'date_age': self.get_age(),

        }

    def get_quiz_for_not_logged_in_users(self):
        return {
            'id': self.id,
            'title': self.title,
            'is_private': self.is_private,
            'quiz_card_relation': sorted([card.to_dict_not_logged_in() for card in self.quiz_card_relation], key=lambda i: i['id']),
            'username': self.user_relation.username,
            'description': self.description,
            'date_age': self.get_age(),
        }

    def get_quizzes_deck_cover(self):
        return {
            'id': self.id,
            'title': self.title,
            'is_private': self.is_private,
            'user_id': self.user_id,
            'username': self.user_relation.username,
            'description': self.description,
            'number_of_cards': len(self.quiz_card_relation),
            'date_age': self.get_age(),
        }
