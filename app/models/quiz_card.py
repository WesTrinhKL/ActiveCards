from .db import db


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

    active_recall_relation = db.relationship(
        'ActiveRecallUtility', back_populates='quiz_card_relation', cascade="all, delete-orphan")
    user_active_recall_answer_relation = db.relationship(
        'UserActiveRecallAnswer', back_populates='quiz_card_relation')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'card_number': self.card_number,
            'question': self.question,
            'user_relation': self.user_relation.to_dict(),
            'quiz_template_relation': self.quiz_template_relation.to_dict(),
        }
