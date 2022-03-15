from app.models import db, Language


# Adds a demo user, you can add other users here if you want
def seed_languages():
    english = Language(name='English')
    spanish = Language(name='Spanish')
    french = Language(name='French')
    japanese = Language(name='Japanese')
    german = Language(name='German')
    mandarin = Language(name='Mandarin')
    cantonese = Language(name='Cantonese')
    vietnamese = Language(name='Vietnamese')
    greek = Language(name='Greek')
    swedish = Language(name='Swedish')
    norwegian = Language(name='Norwegian')
    russian = Language(name='Russian')
    arabic= Language(name='Arabic')
    hindi= Language(name='Hindi')
    farsi= Language(name='Farsi')
    klingon= Language(name='Klingon')

    db.session.add(english)
    db.session.add(spanish)
    db.session.add(french)
    db.session.add(japanese)
    db.session.add(german)
    db.session.add(mandarin)
    db.session.add(cantonese)
    db.session.add(vietnamese)
    db.session.add(greek)
    db.session.add(swedish)
    db.session.add(norwegian)
    db.session.add(russian)
    db.session.add(arabic)
    db.session.add(hindi)
    db.session.add(farsi)
    db.session.add(klingon)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_languages():
    db.session.execute('TRUNCATE languages RESTART IDENTITY CASCADE;')
    db.session.commit()
