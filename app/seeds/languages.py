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
    tim_german = Language(
        name='German', user_id=4, level='Native', native=True, primary=True)
    zack_swahili = Language(
        name='Swahili', user_id=5, level='Native', native=True, primary=True)
    lisa_vietnamese = Language(
        name='Vietnamese', user_id=6, level='Native', native=True, primary=True)
    carl_hindi = Language(
        name='Hindi', user_id=7, level='Native', native=True, primary=True)
    tim_mandarin = Language(
        name='Mandarin', user_id=4, level='B1: Intermediate', native=False, primary=True)
    zack_arabic = Language(
        name='Arabic', user_id=5, level='B2: Upper Intermediate', native=False, primary=True)
    lisa_italian = Language(
        name='Italian', user_id=6, level='A1: Beginner', native=False, primary=True)
    carl_farsi = Language(
        name='Farsi', user_id=7, level='C2: Proficient', native=False, primary=True)

    db.session.add(demo_english)
    db.session.add(marnie_french)
    db.session.add(bobbie_spanish)
    db.session.add(demo_spanish)
    db.session.add(marnie_japanese)
    db.session.add(bobbie_klingon)
    db.session.add(tim_german)
    db.session.add(zack_swahili)
    db.session.add(lisa_vietnamese)
    db.session.add(carl_hindi)
    db.session.add(tim_mandarin)
    db.session.add(zack_arabic)
    db.session.add(lisa_italian)
    db.session.add(carl_farsi)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_languages():
    db.session.execute('TRUNCATE languages RESTART IDENTITY CASCADE;')
    db.session.commit()
