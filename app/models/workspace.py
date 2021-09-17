from .db import db
import datetime
from flask_login import current_user


class Workspace(db.Model):
    __tablename__ = 'workspaces'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    description = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)

    user_relation = db.relationship(
        'User', back_populates='workspace_relation')
    directory_relation = db.relationship(
        'QuizDirectory', back_populates='workspace_relation', cascade="all, delete-orphan")

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

    def to_dict_all_workspace_children(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user_relation': self.user_relation.to_dict(),
            'directories': [directory.to_dict_all_directory_children() for directory in self.directory_relation]
        }

    @staticmethod
    def get_all_users_workspaces_and_children():
        if current_user.is_authenticated:
            workspaces = Workspace.query.filter_by(
                user_id=current_user.id).all()
            return [workspace.to_dict_all_workspace_children() for workspace in workspaces]
        return {'errors': 'workspace unavailable. please try again.'}, 401
