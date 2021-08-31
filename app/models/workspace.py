from .db import db
import datetime


class Workspace(db.Model):
    __tablename__ = 'workspaces'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    user_relation = db.relationship(
        'User', back_populates='workspace_relation')
    directory_relation = db.relationship(
        'QuizDirectory', back_populates='workspace_relation', cascade="all, delete-orphan")

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now(datetime.timezone.utc))
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now(datetime.timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_relation': self.user_relation.to_dict(),
        }
