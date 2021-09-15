from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, User, QuizTemplate, QuizCard, QuizDirectory
from app.api.util.error_handlers import validation_errors_to_error_messages, authorization_errors_to_error_messages

# from app.forms.quiz_template_form import QuizTemplateForm
# from app.forms.quiz_card_form import QuizCardForm

# /api/directories
directories_routes = Blueprint('directories', __name__)


# ---------------Queries-----------------
@ directories_routes.route('/first', methods=['GET'])
# get the first available directory for the user
def get_first_available_directory_for_user():
    return {'first_directory': QuizDirectory.get_first_available_directory_for(current_user.id)}


# ---------------Workspace CRUD Routes-----------------
@ directories_routes.route('/', methods=['POST'])
