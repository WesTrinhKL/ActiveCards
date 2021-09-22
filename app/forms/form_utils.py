from wtforms.validators import ValidationError
from app.models import QuizDirectory
from flask_login import current_user


def directory_belongs_to_user_and_exists(form, field):
    # validate that directory input belongs to the user
    directory = QuizDirectory.query.filter_by(
        id=field.data).first()

    if (directory is not None and directory.user_id != current_user.id) or directory is None:
        raise ValidationError(
            "Unauthorized, please try your own directories.")


def user_id_belongs_to_user(form, field):
    if field.data is not current_user.id:
        raise ValidationError("Unauthorized, please try your own user id.")
