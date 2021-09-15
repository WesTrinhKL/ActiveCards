from flask_login import current_user


def this_model_belongs_to_user(model_obj_instance):
    return model_obj_instance and (model_obj_instance.user_id == current_user.id)
