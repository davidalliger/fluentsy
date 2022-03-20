from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.message_form import MessageForm
from app.models import db, Message
from .route_utils import validation_errors_to_error_messages

message_routes = Blueprint('messages',__name__)

# GET route is in user_routes (GET '/users/<int:id>/messages'),
# so that only the messages pertaining to the currently logged-in user
# are retrieved.

# @message_routes.route('/')
# @login_required
# def get_messages():
#     messages = message.query.all()
#     return jsonify([message.to_dict() for message in messages])

# @message_routes.route('/location', methods=['POST'])
# @login_required
# def add_message_location():
#     form = messageLocationForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         return {'success': 'Success'}
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# @message_routes.route('/about', methods=['POST'])
# @login_required
# def add_message_about():
#     form = messageAboutForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         return {'success': 'Success'}
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# @message_routes.route('/picture', methods=['POST'])
# @login_required
# def add_message_picture():
#     form = messagePictureForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         return {'success': 'Success'}
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@message_routes.route('/', methods=['POST'])
@login_required
def create_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_message = Message()
        form.populate_obj(new_message)

        db.session.add(new_message)
        db.session.commit()

        return new_message.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# @message_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_message(id):
#     form = messageForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         edit_message = message.query.get(id)
#         form.populate_obj(edit_message)
#         db.session.commit()
#         return edit_message.to_dict()
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# @message_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_message(id):
#     delete_message = message.query.get(id)

#     db.session.delete(delete_message)
#     db.session.commit()
#     return {'success': 'success'}
