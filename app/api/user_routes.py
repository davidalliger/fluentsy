from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Profile, Message

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}



@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# Check if profile exists for logged-in user

@user_routes.route('/<int:id>/profiles')
@login_required
def check_profile(id):
    try:
        profile = Profile.query.filter(Profile.user_id==id).first()
        if profile:
            return { 'exists': 'exists' }
    except:
        return { 'none': 'none' }

# Get messages for currently logged-in user

@user_routes.route('/<int:id>/messages')
@login_required
def get_messages(id):
    messages = Message.query.filter((Message.sender_id==id) | (Message.recipient_id==id)).all()
    return jsonify([message.to_dict() for message in messages])
