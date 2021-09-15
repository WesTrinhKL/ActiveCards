from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError, Length


class WorkspaceForm(FlaskForm):
    name = StringField(validators=[DataRequired(message="Workspace name is required"), Length(
        max=120, message="Workspace name cannot be more than 120 characters")])
