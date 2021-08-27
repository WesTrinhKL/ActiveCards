from .db import db
from flask_login import current_user


class QuizDirectory(db.Model):
    __tablename__ = 'quiz_directories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
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

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_relation': self.user_relation.to_dict(),
        }

    def to_dict_without_user(self):
        return {
            'id': self.id,
            'name': self.name,
        }

    @staticmethod
    def get_first_available_directory_for(userId):
        if current_user.is_authenticated:
            if userId == current_user.id:
                first_directory = QuizDirectory.query.filter_by(
                    user_id=userId).first()
                return first_directory.to_dict()
        return "Unavailable. Please try a different directory"
