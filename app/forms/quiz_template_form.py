from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, Field, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import QuizTemplate, QuizDirectory
from flask_login import current_user


def directory_belongs_to_user_and_exists(form, field):
    # validate that directory input belongs to the user
    directory = QuizDirectory.query.filter_by(
        id=field.data).first()

    if (directory is not None and directory.user_id != current_user.id) or directory is None:
        raise ValidationError(
            "Unauthorized, please try your own directories.")


def user_id_belongs_to_user(form, field):
    # validate that user_id passed in belongs to the user
    if field.data is not current_user.id:
        raise ValidationError("Unauthorized, please try your own user id.")


class ListField(Field):
    # generate your own datafield
    def process_formdata(self, valuelist):
        self.data = valuelist


class QuizTemplateForm(FlaskForm):
    title = StringField(validators=[DataRequired(), Length(max=255)])
    description = StringField(validators=[Length(max=1000)])

    # ensure user_id input belongs to user
    user_id = IntegerField(
        validators=[DataRequired(), user_id_belongs_to_user])

    is_private = ListField(
        validators=[DataRequired()])

    # ensure directory belongs to user
    quiz_directory_id = IntegerField(
        validators=[directory_belongs_to_user_and_exists])

    # add categories in the future
