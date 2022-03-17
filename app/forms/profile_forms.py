from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Profile, Language

class ProfileLanguagesForm(FlaskForm):
    native_language = StringField('Native Language', validators=[DataRequired()])
    learning_language = StringField('Learning Language', validators=[DataRequired()])
    proficiency_level = StringField('Proficiency Level', validators=[DataRequired()])

class ProfileLocationForm(FlaskForm):
    country = StringField('Country', validators=[DataRequired()])
    state = StringField('State')
    timezone = StringField('Time Zone', validators=[DataRequired()])

class ProfileAboutForm(FlaskForm):
    birthday = StringField('Birthday', validators=[DataRequired()])
    display_age = StringField('Display Age', validators=[DataRequired()])
    about = StringField('About', validators=[DataRequired()])

class ProfilePictureForm(FlaskForm):
    img_url = StringField('Image', validators=[DataRequired()])

class CreateProfileForm(FlaskForm):
    country = StringField('Country', validators=[DataRequired()])
    state = StringField('State')
    timezone = StringField('Time Zone', validators=[DataRequired()])
    birthday = StringField('Birthday', validators=[DataRequired()])
    display_age = StringField('Display Age', validators=[DataRequired()])
    about = StringField('About', validators=[DataRequired()])
    img_url = StringField('Image', validators=[DataRequired()])
    user_id = IntegerField('User', validators=[DataRequired()])
