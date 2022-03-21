from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Profile, Language

def validate_native(form, field):
    # Checking if native is a valid boolean value
    native = field.data
    if native != True and native != False:
        raise ValidationError('Native must be a valid boolean value.')

def validate_primary(form, field):
    # Checking if primary is a valid boolean value
    display_age = field.data
    if display_age != True and display_age != False:
        raise ValidationError('Primary must be a valid boolean value.')

class LanguageForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    user_id = IntegerField('User Id', validators=[DataRequired()])
    level = StringField('Level', validators=[DataRequired()])
    native = BooleanField('Native', validators=[validate_native])
    primary = BooleanField('Primary', validators=[validate_primary])
