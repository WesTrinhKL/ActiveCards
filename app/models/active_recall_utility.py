from .db import db


class ActiveRecallUtility(db.Model):
    __tablename__ = 'active_recall_utilities'

    id = db.Column(db.Integer, primary_key=True)
    correct_answer = db.Column(db.Text, nullable=False)
    # is_utility = db.Column(db.Boolean, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    user_relation = db.relationship(
        'User', back_populates='active_recall_relation')

    quiz_card_id = db.Column(db.Integer, db.ForeignKey(
        'quiz_cards.id'), nullable=False)
    quiz_card_relation = db.relationship(
        'QuizCard', back_populates='active_recall_relation')
    user_active_recall_answer_relation = db.relationship(
        'UserActiveRecallAnswer', back_populates='active_recall_utilities_relation', cascade='all ,delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'correct_answer': self.correct_answer,
            'user_relation': self.user_relation.to_dict(),
            'question': self.question,
            'quiz_card_relation': self.quiz_card_relation.to_dict(),
        }
