from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', country='United States', state='California', timezone='PST (GMT-9:00)', intro='Hello! I am a demo user!', birthday=datetime.date(1970, 7, 4), native_language_id=1, online_now=True)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', country='France', timezone='ECT (GMT+1:00)', intro='Hello! My name is Marnie!', birthday=datetime.date(1990, 12, 25), native_language_id=3, online_now=True)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', country='Mexico', timezone='CST (GMT-6:00)', intro='Hello! My name is Bobbie!', birthday=datetime.date(1985, 10, 31), native_language_id=2, online_now=True)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
