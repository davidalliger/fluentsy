from flask import jsonify
from flask_socketio import SocketIO, emit, send, join_room
import os

from app.models import db, Message
from app.forms.message_form import MessageForm

if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://fluentsy.herokuapp.com',
        'https://fluentsy.herokuapp.com'
    ]
else:
    origins = '*'

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on('join')
def on_join(data):
    room = data['room_id']
    join_room(room)

@socketio.on('chat')
def handle_chat(data):
    room = data['recipient_id']
    self = data['sender_id']
    if not data['content']:
        error_message = {'message': 'Message cannot be empty', 'type': 'chat', 'content': data['content']}
        emit('error', error_message, to=self)
    elif len(data['content']) > 255:
        error_message = {'message': 'Message must be 255 characters or less', 'type': 'chat', 'content': data['content']}
        emit('error', error_message, to=self)
    else:
        new_message = Message()
        new_message.sender_id = data['sender_id']
        new_message.recipient_id = data['recipient_id']
        new_message.content = data['content']
        db.session.add(new_message)
        db.session.commit()
        response = new_message.to_dict()
        error_message = {'none': 'none'}
        emit('chat', response, to=room)
        emit('chat', response, to=self)
        emit('error', error_message, to=self)


@socketio.on('edit_chat')
def edit_chat(data):
    room = data['recipient_id']
    self = data['sender_id']
    if not data['content']:
        error_message = {'message': 'Message cannot be empty', 'type': 'edit', 'content': data['content']}
        emit('error', error_message, to=self)
    elif len(data['content']) > 255:
        error_message = {'message': 'Message must be 255 characters or less', 'type': 'edit', 'content': data['content']}
        emit('error', error_message, to=self)
    else:
        message_id = data['id']
        edit_message = Message.query.get(message_id)
        edit_message.content = data['content']
        db.session.commit()
        response = edit_message.to_dict()
        error_message = {'none': 'none'}
        emit('edit_chat', response, to=room)
        emit('edit_chat', response, to=self)
        emit('error', error_message, to=self)


@socketio.on('delete_chat')
def delete_chat(data):
    message_id = data['id']
    delete_message = Message.query.get(message_id)
    response = {'id': delete_message.id, 'recipient_id': delete_message.recipient_id, 'sender_id': delete_message.sender_id}
    db.session.delete(delete_message)
    db.session.commit()
    room = response['recipient_id']
    self = response['sender_id']
    emit('delete_chat', response, to=room)
    emit('delete_chat', response, to=self)
