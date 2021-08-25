from flask.cli import AppGroup
from .users import seed_users, undo_users
from .quizzes import seed_quizzes, undo_quizzes
from .directories import seed_directories, undo_directories
from .workspace import seed_workspace, undo_workspace
from .quiz_cards import seed_quiz_cards, undo_quiz_cards

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_workspace()
    seed_directories()
    seed_quizzes()
    seed_quiz_cards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_workspace()
    undo_directories()
    undo_quizzes()
    undo_quiz_cards()
    # Add other undo functions here
