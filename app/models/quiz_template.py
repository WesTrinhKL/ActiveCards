from .db import db
from flask_login import current_user
import datetime
from app.models.utils import get_age_type
from sqlalchemy import desc


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
        'quiz_directories.id'), nullable=True)
    directory_relation = db.relationship(
        'QuizDirectory', back_populates='quiz_template_relation')

    quiz_card_relation = db.relationship(
        'QuizCard', back_populates='quiz_template_relation', cascade="all, delete-orphan")

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    def template_belongs_to_current_user(self):
        return current_user.is_authenticated and current_user.id == self.user_id

    def update_time(self):
        self.updated_at = datetime.datetime.utcnow()

    def get_age(self):
        return get_age_type(self, 'created')

    def get_age_updated_at(self):
        return get_age_type(self, 'updated')

    def to_dict_base(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'is_private': self.is_private,
        }

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

    def to_dict_simple_workspace(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'is_private': self.is_private,
        }

    def get_quiz_cards_with_all_relationship(self):
        return {
            'id': self.id,
            'title': self.title,
            'is_private': self.is_private,
            'description': self.description,
            'quiz_card_relation': sorted([card.to_dict() for card in self.quiz_card_relation], key=lambda i: i['id']),
            'user_id': self.user_id,
            'username': self.user_relation.username,
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

    def get_quizzes_deck_for_workspace(self):
        return {
            'id': self.id,
            'title': self.title,
            'is_private': self.is_private,
            'user_id': self.user_id,
            'username': self.user_relation.username,
            'description': self.description,
            'number_of_cards': len(self.quiz_card_relation),
            'date_age': self.get_age(),
            'date_age_last_updated': self.get_age_updated_at(),
            # 'date_updated_at': self.updated_at

        }

    @staticmethod
    # get all decks for curren user
    def get_all_quiz_decks_simple_for_user(order='none'):
        if current_user.is_authenticated:
            user_decks_all = None
            if order == 'recent':
                user_decks_all = QuizTemplate.query.filter_by(
                    user_id=current_user.id).order_by(desc(QuizTemplate.updated_at)).all()
            else:
                user_decks_all = QuizTemplate.query.filter_by(
                    user_id=current_user.id).all()
            return {'all_user_decks': [deck.get_quizzes_deck_for_workspace() for deck in user_decks_all]}
        return {'errors': 'Unavailable. please try again.'}, 401
