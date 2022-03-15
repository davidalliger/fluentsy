from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models.spoken_language import spoken_languages

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    img_url = db.Column(db.String)
    country = db.Column(db.String)
    state = db.Column(db.String)
    timezone = db.Column(db.String)
    intro = db.Column(db.String)
    birthday = db.Column(db.Date)
    native_language_id = db.Column(db.Integer, db.ForeignKey("languages.id"))
    online_now = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.current_timestamp)

    native_language = db.relationship('Language', back_populates='native_speakers')
    spoken_languages = db.relationship('Language', back_populates='speakers', secondary=spoken_languages)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
