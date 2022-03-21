from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
# from app.models import Message

class MessageForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired()])
    sender_id = IntegerField('Sender', validators=[DataRequired()])
    recipient_id = IntegerField('Recipient', validators=[DataRequired()])
