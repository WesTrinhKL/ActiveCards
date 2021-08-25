from .db import db


class UserActiveRecallAnswer(db.Model):
    __tablename__ = 'user_active_recall_answers'

    id = db.Column(db.Integer, primary_key=True)
    user_active_answer = db.Column(db.Text, nullable=True)
    user_previous_answer = db.Column(db.Text, nullable=True)
    # is_utility = db.Column(db.Boolean, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    user_relation = db.relationship(
        'User', back_populates='user_active_recall_answer_relation')

    quiz_card_id = db.Column(db.Integer, db.ForeignKey(
        'quiz_cards.id'), nullable=False)
    quiz_card_relation = db.relationship(
        'QuizCard', back_populates='user_active_recall_answer_relation')

    active_recall_utility_id = db.Column(db.Integer, db.ForeignKey(
        'active_recall_utilities.id'), nullable=False)
    active_recall_utilities_relation = db.relationship(
        'ActiveRecallUtility', back_populates='user_active_recall_answer_relation')

    def to_dict(self):
        return {
            'id': self.id,
            'user_active_answer': self.user_active_answer,
            'user_previous_answer': self.user_previous_answer,
            'user_relation': self.user_relation.to_dict(),
            'quiz_card_relation': self.quiz_card_relation.to_dict(),
            'active_recall_utilities_relation': self.active_recall_utilities_relation.to_dict(),
        }
