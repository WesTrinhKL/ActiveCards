from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, QuizTemplate, QuizCard
from app.api.util.error_handlers import validation_errors_to_error_messages, authorization_errors_to_error_messages
from app.forms.quiz_template_form import QuizTemplateForm
from app.forms.quiz_card_form import QuizCardForm


quizzes_routes = Blueprint('quizzes', __name__)

# ---------------Helpers-----------------


def protect_private_templates(template_func):
    # decorator warpper method to only get public
    def private_quiz_wrapper():
        all_templates = template_func()
        key = ''
        if 'quiz_template_only' in all_templates:
            key = 'quiz_template_only'
        elif 'quizzes' in all_templates:
            key = 'quizzes'
        all_templates = all_templates[key]
        return {key: [private_template for private_template in all_templates if private_template['is_private'] is False]}
    return private_quiz_wrapper
# ---------------Queries-----------------


@ quizzes_routes.route('/templates', methods=['GET'])
@ protect_private_templates
# get all templates
def get_all_templates():
    all_templates = QuizTemplate.query.limit(30).all()
    return {'quiz_template_only': [template.to_dict() for template in all_templates]}


@ quizzes_routes.route('/', methods=['GET'])
# get all quizzes that are not private
def get_all_quizzes():
    all_quizzes = QuizTemplate.query.filter_by(is_private=False).limit(
        30).all()
    return {'quizzes': [quiz.get_quiz_cards_with_all_relationship() for quiz in all_quizzes]}


@ quizzes_routes.route('/page/<int:page>', methods=['GET'])
# get all quizzes paginated
def get_paginated_quizzes(page):
    per_page = 30
    paged_quizzes = QuizTemplate.query.paginate(
        page, per_page, error_out=False)
    return {'quizzes': [quizzes.get_quiz_cards_with_all_relationship() for quizzes in paged_quizzes]}


@ quizzes_routes.route('/<int:id>', methods=['GET'])
# get a single quiz, if it's private, make sure current user is the correct one, else raise error.
def get_single_quiz(id):
    quiz = QuizTemplate.query.get(id)
    quiz = quiz.get_quiz_cards_with_all_relationship()
    if quiz['is_private'] is False or (quiz['is_private'] is True and current_user.id == quiz['user_id']):
        return {'quiz': quiz}
    return authorization_errors_to_error_messages("sorry, unavailable")
    # return {'quiz': quiz.get_quiz_cards_with_all_relationship()}


@ quizzes_routes.route('cards/<int:id>', methods=['GET'])
# get a single card from the quiz
def get_single_card(id):
    quizCard = QuizCard.query.get(id)
    if quizCard.card_is_public() or quizCard.user_owns_card():
        return {'quiz_card_single': quizCard.to_dict()}
    return authorization_errors_to_error_messages("sorry, unavailable")


# ---------------QuizTemplate CRUD Routes-----------------


@ quizzes_routes.route('/', methods=['POST'])
@ login_required
def create_quiz_template():
    form = QuizTemplateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # categories in future
    if form.validate_on_submit():
        create_quiz_template = QuizTemplate()
        create_quiz_template.user_id = form.user_id.data
        create_quiz_template.title = form.title.data
        create_quiz_template.description = form.description.data
        create_quiz_template.quiz_directory_id = form.quiz_directory_id.data

        if str(form.is_private.data[0]).lower() == 'false':
            create_quiz_template.is_private = False
        elif str(form.is_private.data[0]).lower() == 'true':
            create_quiz_template.is_private = True
        else:
            return {'errors': f'{form.is_private.data[0]} is not a valid boolean value. Try true or false'}, 401

        db.session.add(create_quiz_template)
        db.session.commit()
        return create_quiz_template.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@ quizzes_routes.route('/<int:id>', methods=['PUT', 'DELETE'])
@ login_required
def create_quiz_template_edit_delete(id):
    form = QuizTemplateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method == 'PUT':
        if form.validate_on_submit():
            # ensure that id belongs to the user (done by form validation)
            quiz_by_id = QuizTemplate.query.get(id)
            if quiz_by_id and (quiz_by_id.user_id == current_user.id):
                quiz_by_id.title = form.title.data
                quiz_by_id.description = form.description.data
                quiz_by_id.quiz_directory_id = form.quiz_directory_id.data

                if str(form.is_private.data[0]).lower() == 'false':
                    quiz_by_id.is_private = False
                elif str(form.is_private.data[0]).lower() == 'true':
                    quiz_by_id.is_private = True
                else:
                    return {'errors': f'{form.is_private.data[0]} is not a valid boolean value. Try true or false'}, 401
                db.session.add(quiz_by_id)
                db.session.commit()
                return quiz_by_id.to_dict()

    elif request.method == 'DELETE':
        template_to_delete = QuizTemplate.query.get(id)
        if template_to_delete and (template_to_delete.user_id == current_user.id):
            db.session.delete(template_to_delete)
            db.session.commit()
            return {'message': 'Quiz Deleted'}
        return authorization_errors_to_error_messages("Unauthorized access.")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# ---------------QuizCards CRUD Routes-----------------
@ quizzes_routes.route('/', methods=['POST'])
@ login_required
def create_card_template():
    form = QuizCardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # categories in future
    if form.validate_on_submit():
        create_quiz_template = QuizTemplate()
        create_quiz_template.user_id = form.user_id.data
        create_quiz_template.title = form.title.data
        create_quiz_template.description = form.description.data
        create_quiz_template.quiz_directory_id = form.quiz_directory_id.data

        if str(form.is_private.data[0]).lower() == 'false':
            create_quiz_template.is_private = False
        elif str(form.is_private.data[0]).lower() == 'true':
            create_quiz_template.is_private = True
        else:
            return {'errors': f'{form.is_private.data[0]} is not a valid boolean value. Try true or false'}, 401

        db.session.add(create_quiz_template)
        db.session.commit()
        return create_quiz_template.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@ quizzes_routes.route('/<int:id>', methods=['PUT', 'DELETE'])
@ login_required
def create_quiz_card_edit_delete(id):
    form = QuizCardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method == 'PUT':
        if form.validate_on_submit():
            # ensure that id belongs to the user (done by form validation)
            quiz_by_id = QuizTemplate.query.get(id)
            if quiz_by_id and (quiz_by_id.user_id == current_user.id):
                quiz_by_id.title = form.title.data
                quiz_by_id.description = form.description.data
                quiz_by_id.quiz_directory_id = form.quiz_directory_id.data

                if str(form.is_private.data[0]).lower() == 'false':
                    quiz_by_id.is_private = False
                elif str(form.is_private.data[0]).lower() == 'true':
                    quiz_by_id.is_private = True
                else:
                    return {'errors': f'{form.is_private.data[0]} is not a valid boolean value. Try true or false'}, 401
                db.session.add(quiz_by_id)
                db.session.commit()
                return quiz_by_id.to_dict()

    elif request.method == 'DELETE':
        template_to_delete = QuizTemplate.query.get(id)
        if template_to_delete and (template_to_delete.user_id == current_user.id):
            db.session.delete(template_to_delete)
            db.session.commit()
            return {'message': 'Quiz Deleted'}
        return authorization_errors_to_error_messages("Unauthorized access.")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# ---------------QuizCards CRUD Routes-----------------
