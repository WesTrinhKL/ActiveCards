import datetime


def get_age_for_two_dates(old_time, most_recent):
    difference = most_recent - old_time
    difference_in_seconds = difference.total_seconds()
    difference_months = divmod(difference_in_seconds, 2592000)[0]
    difference_days = divmod(difference_in_seconds, 86400)[0]
    difference_hours = divmod(difference_in_seconds, 3600)[0]
    difference_minutes = divmod(difference_in_seconds, 60)[0]
    return {
        'difference_months': difference_months,
        'difference_days': difference_days,
        'difference_minutes': difference_minutes,
        'difference_seconds': difference_in_seconds,
        'difference_hours': difference_hours,
        'old_time': old_time,
        'most_recent': most_recent
    }


def get_age_type(self, type):
    old_time = datetime.datetime.utcnow()
    if type == 'created':
        old_time = (self.created_at).replace(tzinfo=datetime.timezone.utc)
    elif type == 'updated':
        old_time = (self.updated_at).replace(tzinfo=datetime.timezone.utc)
    most_recent = datetime.datetime.now(datetime.timezone.utc)
    return get_age_for_two_dates(old_time, most_recent)
