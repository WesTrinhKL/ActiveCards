from flask import Blueprint, jsonify
import json
from flask_login import login_required
from app.models import User, QuizTemplate

quizzes_routes = Blueprint('quizzes', __name__)

# ---------------Helpers-----------------


def protect_private_quiz(template_func):
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
@ protect_private_quiz
def get_all_templates():
    all_templates = QuizTemplate.query.limit(30).all()
    return {'quiz_template_only': [template.to_dict() for template in all_templates]}


@ quizzes_routes.route('/', methods=['GET'])
# create wrapper to check if the quiz template is private or public
def get_all_quizzes():
    all_quizzes = QuizTemplate.query.limit(30).all()
    return {'quizzes': [quizzes.get_quiz_cards_with_all_relationship() for quizzes in all_quizzes]}


@ quizzes_routes.route('/page/<int:page>', methods=['GET'])
def get_paginated_quizzes(page):
    per_page = 30
    paged_quizzes = QuizTemplate.query.paginate(
        page, per_page, error_out=False)
    return {'quizzes': [quizzes.get_quiz_cards_with_all_relationship() for quizzes in paged_quizzes]}
# ---------------QuizTemplate CRUD Routes-----------------


# ---------------QuizCards CRUD Routes-----------------


# ---------------QuizCards CRUD Routes-----------------
