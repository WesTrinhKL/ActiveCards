from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, Field, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import QuizTemplate, QuizDirectory, QuizCard
from flask_login import current_user
from app.forms.quiz_template_form import user_id_belongs_to_user


def check_card_number_is_valid(form, field):
    # validate that card number is one number above the actually one and not anything else.
    # user_id = form.data['user_id']
    return True


def quiz_template_belongs_to_user(form, field):
    quiz_template_id = field.data
    quiz_template = QuizTemplate.query.get(quiz_template_id)
    if not quiz_template.template_belongs_to_current_user():
        raise ValidationError("Unauthorized, please try your own deck.")


class ListField(Field):
    # generate your own datafield
    def process_formdata(self, valuelist):
        self.data = valuelist


class QuizCardForm(FlaskForm):
    title = StringField(validators=[DataRequired(), Length(max=255)])
    question = StringField(validators=[DataRequired(), Length(max=1000)])

    # ensure user_id input belongs to user
    user_id = IntegerField(
        validators=[DataRequired(), user_id_belongs_to_user])

    # ensure quiz_template_id belongs to user
    quiz_template_id = IntegerField(
        validators=[DataRequired(), quiz_template_belongs_to_user])

    # ensure card_number is valid, call static
    card_number = IntegerField(
        validators=[DataRequired(), check_card_number_is_valid])

    correct_answer = StringField(validators=[DataRequired(), Length(max=1000)])
