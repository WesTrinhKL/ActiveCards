from app.models import db, QuizDirectory


def seed_directories():
    directory1 = QuizDirectory(name="Frontend", user_id=1, workspace_id=1)
    directory2 = QuizDirectory(name="Backend", user_id=1, workspace_id=1)
    directory3 = QuizDirectory(name="UI/UX Design", user_id=1, workspace_id=1)
    directory4 = QuizDirectory(name="DevOps", user_id=1, workspace_id=1)

    db.session.add(directory1)
    db.session.add(directory2)
    db.session.add(directory3)
    db.session.add(directory4)
    db.session.commit()

def undo_directories():
    db.session.execute('TRUNCATE quiz_directories RESTART IDENTITY CASCADE;')
    db.session.commit()
