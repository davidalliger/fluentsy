from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired()])
    sender_id = IntegerField('Sender', validators=[DataRequired()])
    recipient_id = IntegerField('Recipient', validators=[DataRequired()])
