from .db import db
from flask_login import current_user
import datetime


class QuizDirectory(db.Model):
    __tablename__ = 'quiz_directories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    description = db.Column(db.String(255), nullable=True, default=None)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    user_relation = db.relationship(
        'User', back_populates='directory_relation')

    workspace_id = db.Column(db.Integer, db.ForeignKey(
        'workspaces.id'), nullable=False)
    workspace_relation = db.relationship(
        'Workspace', back_populates='directory_relation')

    quiz_template_relation = db.relationship(
        'QuizTemplate', back_populates='directory_relation', cascade="all, delete-orphan")

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user_relation': self.user_relation.to_dict(),
        }

    def to_dict_without_user(self):
        return {
            'id': self.id,
            'description': self.description,
            'name': self.name,
        }

    def to_dict_all_directory_children(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'decks': [deck.get_quizzes_deck_for_workspace() for deck in self.quiz_template_relation]
        }

    @staticmethod
    def get_first_available_directory_for(userId):
        if current_user.is_authenticated:
            if userId == current_user.id:
                first_directory = QuizDirectory.query.filter_by(
                    user_id=userId).first()
                return first_directory.to_dict()
        return "Unavailable. Please try a different directory"
