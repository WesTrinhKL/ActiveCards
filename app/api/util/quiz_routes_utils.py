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
