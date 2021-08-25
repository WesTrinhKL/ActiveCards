from .db import db


class QuizTemplate(db.Model):
    __tablename__ = 'quiz_templates'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000))

    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    user_relation = db.relationship(
        'User', back_populates='quiz_template_relation')

    quiz_directory_id = db.Column(db.Integer, db.ForeignKey(
        'quiz_directories.id'), nullable=False)
    directory_relation = db.relationship(
        'QuizDirectory', back_populates='quiz_template_relation')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'user_relation': self.user_relation.to_dict(),
        }
