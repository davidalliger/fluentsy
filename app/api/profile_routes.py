from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.profile_forms import ProfileLocationForm, ProfileAboutForm, ProfilePictureForm, ProfileForm
from app.models import db, Profile
from .route_utils import validation_errors_to_error_messages

profile_routes = Blueprint('profiles',__name__)


@profile_routes.route('/')
@login_required
def get_profiles():
    profiles = Profile.query.all()
    return jsonify([profile.to_dict() for profile in profiles])

@profile_routes.route('/location', methods=['POST'])
@login_required
def add_profile_location():
    form = ProfileLocationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        return {'success': 'Success'}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@profile_routes.route('/about', methods=['POST'])
@login_required
def add_profile_about():
    form = ProfileAboutForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        return {'success': 'Success'}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@profile_routes.route('/picture', methods=['POST'])
@login_required
def add_profile_picture():
    form = ProfilePictureForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        return {'success': 'Success'}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@profile_routes.route('/', methods=['POST'])
@login_required
def create_profile():
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_profile = Profile()
        form.populate_obj(new_profile)

        db.session.add(new_profile)
        db.session.commit()

        return new_profile.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@profile_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_profile(id):
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_profile = Profile.query.get(id)
        form.populate_obj(edit_profile)
        db.session.commit()
        return edit_profile.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@profile_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_profile(id):
    delete_profile = Profile.query.get(id)

    db.session.delete(delete_profile)
    db.session.commit()
    return {'success': 'success'}
