from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, AnyOf
from app.models import User, Profile, Language
from .form_utils import valid_levels

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

class NoDuplicateLanguages(object):
    """
    Checks a language field against a userId field. Pretty limited use cases.

    """
    def __init__(self, fieldname):
        self.fieldname = fieldname

    def __call__(self, form, field):
        language_name = field.data
        user_id = form[self.fieldname].data
        dup_languages = Language.query.filter(Language.name==language_name, Language.user_id==user_id).all()
        if len(dup_languages) > 0:
            raise ValidationError('User has already added this language')

class EditNoDuplicateLanguages(object):
    """
    Checks a language field against a userId field. Pretty limited use cases.

    """
    def __init__(self, fieldname1, fieldname2):
        self.fieldname1 = fieldname1
        self.fieldname2 = fieldname2

    def __call__(self, form, field):
        language_name = field.data
        id = form[self.fieldname1].data
        user_id = form[self.fieldname2].data
        dup_languages = Language.query.filter(Language.name==language_name, Language.user_id==user_id, Language.id !=id).all()
        if len(dup_languages) > 0:
            raise ValidationError('User has already added this language')

class NoMultiplePrimaries(object):
    """
    Checks a language field against a userId field. Pretty limited use cases.

    """
    def __init__(self, fieldname1, fieldname2):
        self.fieldname1 = fieldname1
        self.fieldname2 = fieldname2

    def __call__(self, form, field):
        primary = field.data
        user_id = form[self.fieldname1].data
        native = form[self.fieldname2].data
        if primary:
            if native:
                dup_primary_natives = Language.query.filter(Language.primary==True, Language.user_id==user_id, Language.native==True).all()
                if len(dup_primary_natives) > 0:
                    raise ValidationError('User can only select one primary native language')
            else:
                dup_primary_targets = Language.query.filter(Language.primary==True, Language.user_id==user_id, Language.native==False).all()
                if len(dup_primary_targets) > 0:
                    raise ValidationError('User can only select one primary target language')

class AddLanguageForm(FlaskForm):
    name = StringField('Name', validators=[
                                            DataRequired('Please select a language'),
                                            NoDuplicateLanguages('user_id')
                                        ])
    user_id = IntegerField('User Id', validators=[
                                                    DataRequired('Must have an account to add languages')
                                                ])
    level = StringField('Level', validators=[
                                                DataRequired('Please select a proficiency level'),
                                                AnyOf(valid_levels, message='Must select a proficiency level from the options provided')
                                            ])
    native = BooleanField('Native', validators=[validate_native])
    primary = BooleanField('Primary', validators=[
                                                    validate_primary,
                                                    NoMultiplePrimaries('user_id', 'native')
                                                ])

class EditLanguageForm(FlaskForm):
    id = IntegerField('Id')
    name = StringField('Name', validators=[
                                            DataRequired('Please select a language'),
                                            EditNoDuplicateLanguages('id', 'user_id')
                                        ])
    user_id = IntegerField('User Id', validators=[
                                                    DataRequired('Must have an account to add languages')
                                                ])
    level = StringField('Level', validators=[
                                                DataRequired('Please select a proficiency level'),
                                                AnyOf(valid_levels, message='Must select a proficiency level from the options provided')
                                            ])
    native = BooleanField('Native', validators=[validate_native])
    primary = BooleanField('Primary', validators=[
                                                    validate_primary
                                                ])
