from .db import db

spoken_languages = db.Table(
    'spoken_languages',
    db.Column('user_id', db.Ingeger, db.ForeignKey('users.id'), nullable=False),
    db.Column('language_id', db.Integer, db.ForeignKey('languages.id'), nullable=False),
    level = db.Column(db.String, nullable=False)
)
