from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.profile_forms import ProfileLanguagesForm, ProfileLocationForm, ProfileAboutForm, ProfilePictureForm, ProfileForm
from app.models import db, Profile, Language, Message
from .route_utils import validation_errors_to_error_messages
from app.aws_config import upload_file_to_s3, allowed_file, get_unique_filename


profile_routes = Blueprint('profiles',__name__)


@profile_routes.route('/')
@login_required
def get_profiles():
    profiles = Profile.query.all()
    return jsonify([profile.to_dict() for profile in profiles])

@profile_routes.route('/languages', methods=['POST'])
@login_required
def add_profile_languages():
    form = ProfileLanguagesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        return {'success': 'Success'}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

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
    # print(dict(request))

    if 'image' not in request.files:
        return {'errors': ['Please provide an image']}, 400

    image = request.files['image']

    if not allowed_file(image.filename):
        return {'errors': ['File type not permitted']}, 400

    else:
        return {'success': 'Success'}

    # image.filename = get_unique_filename(image.filename)

    # upload = upload_file_to_s3(image)

    # if 'url' not in upload:
    #     return upload, 400

    # url = upload['url']


    # form = ProfilePictureForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     return {'success': 'Success'}
    # else:
    #     return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@profile_routes.route('/', methods=['POST'])
@login_required
def create_profile():
    if 'image' not in request.files:
        return {'errors': ['Please provide an image']}, 400

    image = request.files['image']
    print(image)

    if not allowed_file(image.filename):
        return {'errors': ['File type not permitted']}, 400

    image.filename = get_unique_filename(image.filename)
    print(image.filename)

    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        print('unable to upload???')
        return upload, 400

    url = upload['url']


    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # if 'image' not in request.files:
        #     return {'errors': ['Please provide an image']}, 400

        # image = request.files['image']

        # if not allowed_file(image.filename):
        #     return {'errors': ['File type not permitted']}, 400



        new_profile = Profile()
        print(new_profile)
        form.populate_obj(new_profile)
        print(new_profile)

        # image = new_profile.image

        # image.filename = get_unique_filename(image.filename)

        # upload = upload_file_to_s3(image)

        # if 'url' not in upload:
        #     return upload, 400

        # url = upload['url']
        new_profile.image = url

        db.session.add(new_profile)
        db.session.commit()

        return new_profile.to_dict()
    else:
        print('error occured')
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@profile_routes.route('/<int:id>/picture', methods=['PUT'])
@login_required
def edit_profile_picture(id):
    print('REQUEST IS ', request)
    print('REQUEST FILES ', request.files)
    if 'image' not in request.files:
        return {'errors': ['Please provide an image']}, 400

    image = request.files['image']
    print('THIS SHOULD BE THE IMAGE ', image)

    if not allowed_file(image.filename):
        return {'errors': ['File type not permitted']}, 400

    image.filename = get_unique_filename(image.filename)
    print(image.filename)

    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        print('unable to upload???')
        return upload, 400

    url = upload['url']
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_profile = Profile.query.get(id)
        form.populate_obj(edit_profile)
        edit_profile.image = url
        db.session.commit()
        return edit_profile.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@profile_routes.route('/<int:id>/header', methods=['PUT'])
@login_required
def edit_profile_header(id):
    # print('REQUEST IS ', request)
    # print('REQUEST FILES ', request.files)
    # if 'image' not in request.files:
    #     return {'errors': ['Please provide an image']}, 400

    # image = request.files['image']
    # print('THIS SHOULD BE THE IMAGE ', image)

    # if not allowed_file(image.filename):
    #     return {'errors': ['File type not permitted']}, 400

    # image.filename = get_unique_filename(image.filename)
    # print(image.filename)

    # upload = upload_file_to_s3(image)

    # if 'url' not in upload:
    #     print('unable to upload???')
    #     return upload, 400

    # url = upload['url']
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_profile = Profile.query.get(id)
        form.populate_obj(edit_profile)
        # edit_profile.image = url
        db.session.commit()
        return edit_profile.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@profile_routes.route('/<int:id>/about', methods=['PUT'])
@login_required
def edit_profile_about(id):
    # print('REQUEST IS ', request)
    # print('REQUEST FILES ', request.files)
    # if 'image' not in request.files:
    #     return {'errors': ['Please provide an image']}, 400

    # image = request.files['image']
    # print('THIS SHOULD BE THE IMAGE ', image)

    # if not allowed_file(image.filename):
    #     return {'errors': ['File type not permitted']}, 400

    # image.filename = get_unique_filename(image.filename)
    # print(image.filename)

    # upload = upload_file_to_s3(image)

    # if 'url' not in upload:
    #     print('unable to upload???')
    #     return upload, 400

    # url = upload['url']
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_profile = Profile.query.get(id)
        form.populate_obj(edit_profile)
        # edit_profile.image = url
        db.session.commit()
        return edit_profile.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@profile_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_profile(id):
    delete_profile = Profile.query.filter(Profile.id == id).first()
    print('profile to delete is ', delete_profile)
    delete_languages = Language.query.filter(Language.user_id == delete_profile.user_id).all()
    print('languages to delete are ', delete_languages)
    delete_messages = Message.query.filter((Message.sender_id == delete_profile.user_id) | (Message.recipient_id == delete_profile.user_id)).all()
    print('messages to delete are ', delete_messages)

    if delete_languages:
        for language in delete_languages:
            db.session.delete(language)
    if delete_messages:
        for message in delete_messages:
            db.session.delete(message)
    db.session.delete(delete_profile)
    db.session.commit()
    return {'success': 'success'}
