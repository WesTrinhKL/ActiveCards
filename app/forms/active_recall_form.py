from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError, Length
from flask_login import current_user


class ActiveRecallCreateForm(FlaskForm):
    user_active_answer = StringField(
        validators=[DataRequired(), Length(max=1000)])
    active_recall_utility_id = IntegerField(
        validators=[DataRequired()])
    # fix quiz_card_id later, vulnerable for attacks
    quiz_card_id = IntegerField(
        validators=[DataRequired()])
