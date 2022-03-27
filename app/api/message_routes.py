from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.message_form import MessageForm
from app.models import db, Message
from .route_utils import validation_errors_to_error_messages

message_routes = Blueprint('messages',__name__)

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
