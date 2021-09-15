from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length


class DirectoryForm(FlaskForm):
    name = StringField(validators=[DataRequired(message="Directory name is required"), Length(
        max=120, message="Directory name cannot be more than 120 characters")])
    workspace_id = IntegerField(
        validators=[DataRequired()])
    description = StringField(validators=[Length(
        max=255, message="Directory description cannot be more than 255 characters")])
