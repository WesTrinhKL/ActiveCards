from .db import db


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

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'is_private': self.is_private,
            'user_relation': self.user_relation.to_dict(),
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
        }
