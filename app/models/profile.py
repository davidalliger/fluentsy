from .db import db
from datetime import datetime

class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image = db.Column(db.String)
    country = db.Column(db.String)
    state = db.Column(db.String)
    timezone = db.Column(db.String)
    about = db.Column(db.String)
    birthday = db.Column(db.String)
    display_age = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=datetime.now)

    user = db.relationship('User', back_populates='profile')

    def to_dict(self):

        return {
            'id': self.id,
            'username': self.user.username,
            'languages': [language.to_dict() for language in self.user.languages],
            'userId': self.user_id,
            'imgUrl': self.image,
            'country': self.country,
            'state': self.state,
            'timezone': self.timezone,
            'about': self.about,
            'birthday': self.birthday,
            'displayAge': self.display_age,
        }
