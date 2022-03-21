from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Message

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

# Get messages for currently logged-in user

@user_routes.route('/<int:id>/messages')
@login_required
def get_messages(id):
    messages = Message.query.filter((Message.sender_id==id) | (Message.recipient_id==id)).all()
    return jsonify([message.to_dict() for message in messages])
