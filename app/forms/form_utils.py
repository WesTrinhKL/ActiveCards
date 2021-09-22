from wtforms.validators import ValidationError
from app.models import QuizDirectory, QuizTemplate
from flask_login import current_user


def directory_belongs_to_user_and_exists(form, field):
    # validate that directory input belongs to the user
    directory = QuizDirectory.query.filter_by(
        id=field.data).first()

    if (directory is not None and directory.user_id != current_user.id) or directory is None:
        raise ValidationError("Unauthorized, please try your own directories.")
    if (directory is None):
        raise ValidationError("Unauthorized, please try again.")


def user_id_belongs_to_user(form, field):
    if field.data is not current_user.id:
        raise ValidationError("Unauthorized, please try your own user id.")


def quiz_template_belongs_to_user(form, field):
    # form is the whole form data api, field is itself.
    quiz_template_id = field.data
    quiz_template = QuizTemplate.query.get(quiz_template_id)
    if not quiz_template or not quiz_template.template_belongs_to_current_user():
        raise ValidationError("Unauthorized, please try your own deck.")
