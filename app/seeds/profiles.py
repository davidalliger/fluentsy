from app.models import db, Profile
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_profiles():
    demo_profile = Profile(
        user_id=1, country='United States', state='California', timezone='Pacific Standard Time (GMT-8:00)', about='Hello! I am a demo user!', birthday="1970, 7, 4", display_age=True)
    marnie_profile = Profile(
        user_id=2, country='France', timezone='Central European Time (GMT+1:00)', about='Hello! My name is Marnie!', birthday="1990, 12, 25", display_age=True)
    bobbie_profile = Profile(
        user_id=3, country='Mexico', timezone='Central Standard Time (GMT-6:00)', about='Hello! My name is Bobbie!', birthday="1985, 10, 31", display_age=True)

    db.session.add(demo_profile)
    db.session.add(marnie_profile)
    db.session.add(bobbie_profile)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_profiles():
    db.session.execute('TRUNCATE profiles RESTART IDENTITY CASCADE;')
    db.session.commit()
