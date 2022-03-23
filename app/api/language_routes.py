from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.language_form import LanguageForm
from app.models import db, Language
from .route_utils import validation_errors_to_error_messages

language_routes = Blueprint('languages',__name__)


@language_routes.route('/')
@login_required
def get_languages():
    languages = Language.query.all()
    return jsonify([language.to_dict() for language in languages])

@language_routes.route('/', methods=['POST'])
@login_required
def create_language():
    form = LanguageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_language = Language()
        form.populate_obj(new_language)

        db.session.add(new_language)
        db.session.commit()

        return new_language.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@language_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_language(id):
    delete_language = Language.query.get(id)

    db.session.delete(delete_language)
    db.session.commit()
    return delete_language.to_dict()

# @language_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_profile(id):
#     form = ProfileForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         edit_profile = Profile.query.get(id)
#         form.populate_obj(edit_profile)
#         db.session.commit()
#         return edit_profile.to_dict()
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400
