from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, Field, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import QuizTemplate, QuizDirectory
from flask_login import current_user


# validate that directory input belongs to the user
def directory_belongs_to_user_and_exists(form, field):
    directory = QuizDirectory.query.filter_by(
        id=field.data).first() is not None
    if directory:
        # make sure directory belongs to user.
        if not directory.user_id == current_user.id:
            raise ValidationError(
                "Unauthorized, please try your own directories.")


class ListField(Field):
    # generate your own datafield
    def process_formdata(self, valuelist):
        self.data = valuelist


class QuizTemplateForm(FlaskForm):
    title = StringField(validators=[DataRequired(), Length(max=255)])
    description = StringField()
    user_id = IntegerField(validators=[DataRequired()])
    is_private = BooleanField(validators=[DataRequired()])
    quiz_directory_id = IntegerField(
        validators=[DataRequired(), directory_belongs_to_user_and_exists])

    # add categories in the future
