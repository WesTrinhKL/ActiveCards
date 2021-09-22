from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, Field
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import QuizTemplate
from form_utils import user_id_belongs_to_user


def check_card_number_is_valid(form, field):
    # validate that card number is one number above the actually one and not anything else.
    # user_id = form.data['user_id']
    # NOTE change later
    return True


def quiz_template_belongs_to_user(form, field):
    # form is the whole form data api, field is itself.
    quiz_template_id = field.data
    quiz_template = QuizTemplate.query.get(quiz_template_id)
    if not quiz_template.template_belongs_to_current_user():
        raise ValidationError("Unauthorized, please try your own deck.")


class ListField(Field):
    # generate your own datafield
    def process_formdata(self, valuelist):
        self.data = valuelist


class QuizCardForm(FlaskForm):
    title = StringField(validators=[DataRequired(
        message="A title is required"), Length(max=255, message="Answer cannot be more than 255 characters")])
    question = StringField(validators=[DataRequired(
        message="A question is required"), Length(max=1000, message="Answer cannot be more than 1000 characters")])

    user_id = IntegerField(
        validators=[DataRequired(), user_id_belongs_to_user])

    # ensure quiz_template_id belongs to user
    quiz_template_id = IntegerField(
        validators=[DataRequired(), quiz_template_belongs_to_user])

    card_number = IntegerField(
        validators=[DataRequired(), check_card_number_is_valid])

    correct_answer = StringField(validators=[DataRequired(
        message="Active Recall Extension's answer field cannot be empty"), Length(max=1000, message="Active Recall Extension's answer cannot be more than 1000 characters")])
