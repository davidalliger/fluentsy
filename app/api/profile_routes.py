from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Profile

profile_routes = Blueprint('profiles',__name__)

@profile_routes.route('/')
@login_required
def get_profiles():
    profiles = Profile.query.all()
    return jsonify([profile.to_dict() for profile in profiles])
