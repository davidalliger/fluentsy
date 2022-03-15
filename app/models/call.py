from platform import platform
from .db import db

class Call(db.Model):
    __tablename__ = 'calls'

    id = db.Column(db.Integer, primary_key=True)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    guest_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('languages.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    platform = db.Column(db.String, nullable=False)
    message = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.current_timestamp)

    host = db.relationship('User', back_populates='hosted_calls')
    guest = db.relationship('User', back_populates='invited_calls')
    language = db.relationship('Language', back_populates='calls')
