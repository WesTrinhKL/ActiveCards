from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    quiz_template_relation = db.relationship(
        'QuizTemplate', back_populates='user_relation', cascade="all, delete-orphan")
    workspace_relation = db.relationship(
        'Workspace', back_populates='user_relation', cascade="all, delete-orphan")
    directory_relation = db.relationship(
        'QuizDirectory', back_populates='user_relation', cascade="all, delete-orphan")
    quiz_card_relation = db.relationship(
        'QuizCard', back_populates='user_relation', cascade="all, delete-orphan")
    active_recall_relation = db.relationship(
        'ActiveRecallUtility', back_populates='user_relation', cascade="all, delete-orphan")
    user_active_recall_answer_relation = db.relationship(
        'UserActiveRecallAnswer', back_populates='user_relation', cascade="all, delete-orphan")

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def to_dict_basic_user_info(self):
        return{
            'id': self.id,
            'username': self.username,
        }
