from .db import db
from app.models.spoken_language import spoken_languages

class Language(db.Model):
    __tablename__ = 'languages'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    native_speakers = db.relationship('User', back_populates='native_language')
    speakers = db.relationship('User', back_populates='spoken_languages', secondary=spoken_languages)
