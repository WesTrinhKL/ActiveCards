from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class WorkspaceForm(FlaskForm):
    name = StringField(validators=[DataRequired(message="Workspace name is required"), Length(
        max=120, message="Workspace name cannot be more than 120 characters")])
    description = StringField(validators=[Length(
        max=255, message="Workspace description cannot be more than 255 characters")])
