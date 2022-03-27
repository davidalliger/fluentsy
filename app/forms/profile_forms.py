from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError, InputRequired, AnyOf, NumberRange, StopValidation
from app.models import User, Profile, Language
from .form_utils import validate_birthday, NotEqual, offered_languages, valid_levels, provided_countries, provided_timezones, valid_states, IsInt, RequiredIf, RequiredWhen, InRange, IsValidDate, IsValidYear
from datetime import datetime
import re
import requests

def validate_display_age(form, field):
    # Checking if display_age is a valid boolean value
    display_age = field.data
    if display_age != True and display_age != False:
        raise ValidationError('Display age on profile must be either true or false.')

def user_exists(form, field):
    # Checking if user exists
    id = field.data
    user = User.query.get(id)
    if not user:
        raise ValidationError('You must have an account to make a profile')

def validate_img_url(form, field):
    # Checking if image url is valid
    url = field.data
    print(url)
    if not url:
        raise StopValidation()
    extensions = re.compile(r'\.jpg$|\.jpeg$|\.png$|\.gif$|\.svg$|.bmp$', re.IGNORECASE)
    schemes = re.compile(r'^https:\/\/|^http:\/\/', re.IGNORECASE)
    correct_extension = re.search(extensions, url)
    correct_scheme = re.search(schemes, url)
    if not correct_extension:
        raise ValidationError('Please enter a valid image URL ending in any of the following extensions: .jpg, .jpeg, .png, .gif, .svg, .bmp')
    if not correct_scheme:
        raise ValidationError('Please enter a valid image URL beginning with either "http://" or "https://"')
    try:
        response = requests.get(url)
        print(response)
        if not response.ok:
            raise ValidationError('Please enter a valid URL')
    except:
        raise ValidationError('Please enter a valid URL')



class ProfileLanguagesForm(FlaskForm):
    native_language = StringField('Native Language', validators=[
                                                                    DataRequired('Please enter your native language'),
                                                                    AnyOf(offered_languages, message='Must select a language from the options provided')
                                                                ])
    learning_language = StringField('Learning Language', validators=[
                                                                        DataRequired('Please enter your target language'),
                                                                        AnyOf(offered_languages, message='Must select a language from the options provided'),
                                                                        NotEqual('native_language', message='Native language and target language cannot be the same')
                                                                    ])
    proficiency_level = StringField('Proficiency Level', validators=[
                                                                        RequiredIf('learning_language', message='Please enter your proficiency level'),
                                                                        AnyOf(valid_levels, message='Must select a proficiency level from the options provided')
                                                                    ])

class ProfileLocationForm(FlaskForm):
    country = StringField('Country', validators=[
                                                    DataRequired('Please select your country'),
                                                    AnyOf(provided_countries, message='Must select a country from the options provided')
                                                ])
    state = StringField('State', validators=[
                                                RequiredWhen('country', 'United States', message='Please select your state'),
                                                AnyOf(valid_states, message='Must select a state from the options provided')
                                            ])
    timezone = StringField('Time Zone', validators=[
                                                        DataRequired('Please select your time zone'),
                                                        AnyOf(provided_timezones, message='Must select a time zone from the options provided')
                                                    ])

class ProfileAboutForm(FlaskForm):
    month = StringField('Birthday', validators=[
                                                    DataRequired('Please enter your birth month'),
                                                    IsInt('Birth month must be an integer'),
                                                    InRange(min=1, max=12, message='Birth month must be a number between 1 and 12')
                                                ])
    day = StringField('Birthday', validators=[
                                                DataRequired('Please enter your birth date'),
                                                IsInt('Birth date must be an integer'),
                                                IsValidDate('month', message='Please select a valid date')
                                            ])
    year = StringField('Birthday', validators=[
                                                DataRequired('Please enter your birth year'),
                                                IsInt('Birth year must be an integer'),
                                                IsValidYear('month', 'day')
                                            ])
    display_age = BooleanField('Display Age', validators=[validate_display_age])
    about = StringField('About', validators=[DataRequired('Please enter a brief description')])

class ProfilePictureForm(FlaskForm):
    img_url = StringField('Image', validators=[validate_img_url])

class ProfileForm(FlaskForm):
    country = StringField('Country', validators=[
                                                    DataRequired('Please select your country'),
                                                    AnyOf(provided_countries, message='Must select a country from the options provided')
                                                ])
    state = StringField('State', validators=[
                                                RequiredWhen('country', 'United States', message='Please select your state'),
                                                AnyOf(valid_states, message='Must select a state from the options provided')
                                            ])
    timezone = StringField('Time Zone', validators=[
                                                        DataRequired('Please select your time zone'),
                                                        AnyOf(provided_timezones, message='Must select a time zone from the options provided')
                                                    ])
    birthday = StringField('Birthday', validators=[DataRequired('Please enter your birthday'), validate_birthday])
    display_age = BooleanField('Display Age', validators=[validate_display_age])
    about = StringField('About', validators=[DataRequired('Please enter a brief description')])
    img_url = StringField('Image', validators=[validate_img_url])
    user_id = IntegerField('User', validators=[user_exists])
