from .db import db


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
        'QuizTemplates', back_populates='directory_relation')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_relation': self.user_relation.to_dict(),
        }
