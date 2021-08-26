from app.models import ActiveRecallUtility, db, QuizCard, UserActiveRecallAnswer


def seed_quiz_cards():
    quiz_card1 = QuizCard(
        title='Top Javascript Interview Problems', question='Explain what a callback function is and provide a simple example', card_number=1, user_id=1, quiz_template_id=1)

    quiz_card2 = QuizCard(
        title='Top Javascript Interview Problems', question='What are undeclared and undefined variables?', card_number=2, user_id=1, quiz_template_id=1)

    quiz_card3 = QuizCard(
        title='Top Javascript Interview Problems', question='What are global variables? How are these variable declared?', card_number=3, user_id=1, quiz_template_id=1)

    active_recall1 = ActiveRecallUtility(
        correct_answer='A callback function is a function that is passed to another function as an argument and is executed after some operation has been completed. Below is an example of a simple callback function that logs to the console after some operations have been completed.', user_id=1, quiz_card_relation=quiz_card1)

    user_2_answer = UserActiveRecallAnswer(
        user_active_answer="A callback is a function that is passed to a higher order function to be executed at a later time.", user_previous_answer=None,
        user_id=2,
        quiz_card_id=1,
        active_recall_utilities_relation=active_recall1
    )

    active_recall2 = ActiveRecallUtility(
        correct_answer='Undeclared variables are those that do not exist in a program and are not declared. If the program tries to read the value of an undeclared variable, then a runtime error is encountered.Undefined variables are those that are declared in the program but have not been given any value. If the program tries to read the value of an undefined variable, an undefined value is returned.', user_id=1, quiz_card_relation=quiz_card2)

    active_recall3 = ActiveRecallUtility(
        correct_answer='Global variables are available throughout the length of the code so that it has no scope. The var keyword is used to declare a local variable or object. If the var keyword is omitted, a global variable is declared.', user_id=1, quiz_card_relation=quiz_card3)

    quiz_card4 = QuizCard(
        title='What are the next question who are the next questions?', question='What are global variables? How are these variable declared?', card_number=1, user_id=2, quiz_template_id=7)
    quiz_card5 = QuizCard(
        title='who are the next questions What are the next question ?', question='What are global variables? How are these variable declared?', card_number=2, user_id=2, quiz_template_id=7)

    active_recall4 = ActiveRecallUtility(
        correct_answer='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters', user_id=2, quiz_card_relation=quiz_card4)

    active_recall5 = ActiveRecallUtility(
        correct_answer='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters', user_id=2, quiz_card_relation=quiz_card5)

    db.session.add(quiz_card1)
    db.session.add(quiz_card2)
    db.session.add(quiz_card3)
    db.session.add(quiz_card4)
    db.session.add(quiz_card5)
    db.session.commit()


def undo_quiz_cards():
    db.session.execute('TRUNCATE quiz_cards RESTART IDENTITY CASCADE;')
    db.session.commit()
