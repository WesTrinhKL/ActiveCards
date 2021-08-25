from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, QuizTemplate

quizzes_routes = Blueprint('quizzes', __name__)

# ---------------Helpers-----------------


# ---------------Queries-----------------
@quizzes_routes.route('/', methods=['GET'])
def get_all_quizzes():
    all_quizzes = QuizTemplate.query.limit(30).all()
    return {'quizzes': [quiz.to_dict() for quiz in all_quizzes]}


# ---------------QuizTemplate CRUD Routes-----------------


# ---------------QuizCards CRUD Routes-----------------


# ---------------QuizCards CRUD Routes-----------------
