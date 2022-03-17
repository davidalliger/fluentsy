from app.models import db, Language

# Adds a demo user, you can add other users here if you want
def seed_languages():
    demo_english = Language(
        name='English', user_id=1, level='Native', native=True, primary=True)
    marnie_french = Language(
        name='French', user_id=2, level='Native', native=True, primary=True)
    bobbie_spanish = Language(
        name='Spanish', user_id=3, level='Native', native=True, primary=True)
    demo_spanish = Language(
        name='Spanish', user_id=1, level='A1: Beginner', native=False, primary=True)
    marnie_japanese = Language(
        name='Japanese', user_id=2, level='A2: Elementary', native=False, primary=True)
    bobbie_klingon = Language(
        name='Klingon', user_id=3, level='C1: Advanced', native=False, primary=True)

    db.session.add(demo_english)
    db.session.add(marnie_french)
    db.session.add(bobbie_spanish)
    db.session.add(demo_spanish)
    db.session.add(marnie_japanese)
    db.session.add(bobbie_klingon)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_languages():
    db.session.execute('TRUNCATE languages RESTART IDENTITY CASCADE;')
    db.session.commit()
