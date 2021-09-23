from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length


class ActiveRecallCreateForm(FlaskForm):
    user_active_answer = StringField(
        validators=[DataRequired(message="An answer is required"), Length(max=500, message="Answer cannot be more than 500 characters")])
    active_recall_utility_id = IntegerField(
        validators=[DataRequired()])
    # fix quiz_card_id later, vulnerable for attacks
    quiz_card_id = IntegerField(
        validators=[DataRequired()])
