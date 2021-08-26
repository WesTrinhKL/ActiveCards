from app.models import db, QuizTemplate


def seed_quizzes():
    quiz1 = QuizTemplate(
        title='Top Javascript Interview Problems', description='This is a collection of all the most common Javascript coding and concept problems that you will encounter during the Javascript interview process', user_id=1, is_private=False, quiz_directory_id=1)
    quiz2 = QuizTemplate(
        title='Top React Interview Problems', description='This is a collection of all the most common React coding and concept problems that you will encounter during the React interview process', user_id=1, is_private=True, quiz_directory_id=1)
    quiz3 = QuizTemplate(
        title='Top server APIs Interview Problems', description='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters', user_id=1, is_private=False, quiz_directory_id=2)
    quiz4 = QuizTemplate(
        title='Top Database Interview Problems', description='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters', user_id=1, is_private=False, quiz_directory_id=2)
    quiz5 = QuizTemplate(
        title='Top US History Problems', description='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters', user_id=2, is_private=True, quiz_directory_id=5)
    quiz6 = QuizTemplate(
        title='Top World History Problems', description='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters', user_id=2, is_private=False, quiz_directory_id=5)
    quiz7 = QuizTemplate(
        title='Algebra Interview Problems', description='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters', user_id=3, is_private=False, quiz_directory_id=7)
    db.session.add(quiz1)
    db.session.add(quiz2)
    db.session.add(quiz3)
    db.session.add(quiz4)
    db.session.add(quiz5)
    db.session.add(quiz6)
    db.session.add(quiz7)
    db.session.commit()


def undo_quizzes():
    db.session.execute('TRUNCATE quiz_directories RESTART IDENTITY CASCADE;')
    db.session.commit()
