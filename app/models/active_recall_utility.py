from .db import db
import datetime


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

    # child
    user_active_recall_answer_relation = db.relationship(
        'UserActiveRecallAnswer', back_populates='active_recall_utilities_relation', cascade='all ,delete-orphan')
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    # active recall utility is a one to one with quiz_cards, so their id should always match

    def to_dict(self):
        return {
            'active_recall_id': self.id,
            'correct_answer': self.correct_answer,
            'user_relation': self.user_relation.to_dict_basic_user_info(),
        }

    def to_dict_author_answer(self):
        return {
            'correct_answer': self.correct_answer,
        }

    @staticmethod
    # TODO add backend validations later for answering (prevents people injecting answers into private instances)
    def active_recall_quiz_is_public_or_user_owns(id):
        # active_check = ActiveRecallUtility.query.filter_by(id=id).first()
        # if active_check:
        #     return not active_check.quiz_card_relation.quiz_template_relation.is_private
        return True
