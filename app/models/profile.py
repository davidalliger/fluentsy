from .db import db

class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    img_url = db.Column(db.String)
    country = db.Column(db.String)
    state = db.Column(db.String)
    timezone = db.Column(db.String)
    about = db.Column(db.String)
    birthday = db.Column(db.Date)
    display_age = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.current_timestamp)

    user = db.relationship('User', back_populates='profile')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.user.username,
            'user_id': self.user_id,
            'imgUrl': self.img_url,
            'country': self.country,
            'state': self.state,
            'timezone': self.timezone,
            'about': self.about,
            'birthday': self.birthday,
            'displayAge': self.display_age
        }
