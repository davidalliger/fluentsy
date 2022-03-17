from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Profile, Language

def validate_display_age(form, field):
    # Checking if display_age is a valid boolean value
    display_age = field.data
    if display_age != True and display_age != False:
        raise ValidationError('Display age on profile must be either true or false.')


class ProfileLanguagesForm(FlaskForm):
    native_language = StringField('Native Language', validators=[DataRequired()])
    learning_language = StringField('Learning Language', validators=[DataRequired()])
    proficiency_level = StringField('Proficiency Level', validators=[DataRequired()])

class ProfileLocationForm(FlaskForm):
    country = StringField('Country', validators=[DataRequired()])
    state = StringField('State')
    timezone = StringField('Time Zone', validators=[DataRequired()])

class ProfileAboutForm(FlaskForm):
    month = StringField('Birthday', validators=[DataRequired()])
    day = StringField('Birthday', validators=[DataRequired()])
    year = StringField('Birthday', validators=[DataRequired()])
    display_age = BooleanField('Display Age', validators=[validate_display_age])
    about = StringField('About', validators=[DataRequired()])

class ProfilePictureForm(FlaskForm):
    img_url = StringField('Image')

class CreateProfileForm(FlaskForm):
    country = StringField('Country', validators=[DataRequired()])
    state = StringField('State')
    timezone = StringField('Time Zone', validators=[DataRequired()])
    birthday = StringField('Birthday', validators=[DataRequired()])
    display_age = BooleanField('Display Age', validators=[validate_display_age])
    about = StringField('About', validators=[DataRequired()])
    img_url = StringField('Image')
    user_id = IntegerField('User', validators=[DataRequired()])
