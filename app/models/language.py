from sqlalchemy import null
from .db import db

class Language(db.Model):
    __tablename__= 'languages'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    level = db.Column(db.String, nullable=False)
    native = db.Column(db.Boolean, nullable=False)
    primary= db.Column(db.Boolean, nullable=False)

    speaker = db.relationship('User', back_populates='languages')

    def to_dict(self):
        return {
            'id': self.id,
            'speaker': self.speaker.username,
            'name': self.name,
            'userId': self.user_id,
            'level': self.level,
            'native': self.native,
            'primary': self.primary,
        }
