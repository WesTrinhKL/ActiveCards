from app.models import db, QuizDirectory


def seed_directories():
    directory1 = QuizDirectory(name="Frontend", user_id=1, workspace_id=1)
    directory2 = QuizDirectory(name="Backend", user_id=1, workspace_id=1)
    directory3 = QuizDirectory(name="UI/UX Design", user_id=1, workspace_id=2)
    directory4 = QuizDirectory(name="Home", user_id=2, workspace_id=4)
    directory5 = QuizDirectory(name="World History", user_id=2, workspace_id=5)
    directory6 = QuizDirectory(name="Home", user_id=2, workspace_id=6)
    directory7 = QuizDirectory(name="Algebra", user_id=2, workspace_id=7)

    db.session.add(directory1)
    db.session.add(directory2)
    db.session.add(directory3)
    db.session.add(directory4)
    db.session.add(directory5)
    db.session.add(directory6)
    db.session.add(directory7)
    db.session.commit()


def undo_directories():
    db.session.execute('TRUNCATE quiz_directories RESTART IDENTITY CASCADE;')
    db.session.commit()
