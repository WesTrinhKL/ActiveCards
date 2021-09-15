from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Workspace, QuizDirectory
from app.api.util.error_handlers import validation_errors_to_error_messages, authorization_errors_to_error_messages
from app.api.util.general import this_model_belongs_to_user
from app.forms import WorkspaceForm, DirectoryForm

# /api/directories
directories_routes = Blueprint('directories', __name__)


# ---------------Queries-----------------
@ directories_routes.route('/first', methods=['GET'])
@ login_required
# get the first available directory for the user
def get_first_available_directory_for_user():
    return {'first_directory': QuizDirectory.get_first_available_directory_for(current_user.id)}


# ---------------Workspace CRUD Routes-----------------
@ directories_routes.route('/workspace', methods=['POST'])
@ login_required
def create_workspace():
    form = WorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # categories in future
    if form.validate_on_submit():
        workspace_to_create = Workspace()
        workspace_to_create.user_id = current_user.id
        workspace_to_create.name = form.name.data
        workspace_to_create.description = form.description.data

        db.session.add(workspace_to_create)
        db.session.commit()
        return workspace_to_create.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@ directories_routes.route('/workspace/<int:id>', methods=['PUT', 'DELETE'])
@ login_required
def update_delete_workspace(id):
    form = WorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method == 'PUT':
        if form.validate_on_submit():
            workspace_by_id = Workspace.query.get(id)

            if this_model_belongs_to_user(workspace_by_id):
                workspace_by_id.name = form.name.data
                workspace_by_id.description = form.description.data
                db.session.add(workspace_by_id)
                db.session.commit()
                return workspace_by_id.to_dict()

    elif request.method == 'DELETE':
        workspace_to_delete = Workspace.query.get(id)
        if this_model_belongs_to_user(workspace_to_delete):
            workspace_name = workspace_to_delete.name
            db.session.delete(workspace_to_delete)
            db.session.commit()
            return {'message': f'{workspace_name} Deleted'}
        return authorization_errors_to_error_messages("Unauthorized access.")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# ---------------Directories CRUD Routes-----------------


@ directories_routes.route('/directory', methods=['POST'])
@ login_required
def create_directory():
    form = DirectoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workspace_by_id = Workspace.query.get(form.workspace_id.data)
        # ensures workspace exists to add directory into
        if this_model_belongs_to_user(workspace_by_id):
            directory_to_create = QuizDirectory()
            directory_to_create.user_id = current_user.id
            directory_to_create.name = form.name.data
            directory_to_create.workspace_id = form.workspace_id.data
            directory_to_create.description = form.description.data
            db.session.add(directory_to_create)
            db.session.commit()
            return directory_to_create.to_dict()
        return authorization_errors_to_error_messages("Directory doesn't exist or belong to user.")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@ directories_routes.route('/directory/<int:id>', methods=['PUT', 'DELETE'])
@ login_required
def update_delete_directory(id):
    form = DirectoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method == 'PUT':
        if form.validate_on_submit():
            directory_by_id = QuizDirectory.query.get(id)

            if this_model_belongs_to_user(directory_by_id):
                directory_by_id.name = form.name.data
                directory_by_id.description = form.description.data
                db.session.add(directory_by_id)
                db.session.commit()
                return directory_by_id.to_dict()

    elif request.method == 'DELETE':
        directory_to_delete = QuizDirectory.query.get(id)
        if this_model_belongs_to_user(directory_to_delete):
            directory_name = directory_to_delete.name
            db.session.delete(directory_to_delete)
            db.session.commit()
            return {'message': f'{directory_name} Deleted'}
        return authorization_errors_to_error_messages("Unauthorized access.")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
