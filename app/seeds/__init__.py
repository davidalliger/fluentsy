from flask.cli import AppGroup
from .users import seed_users, undo_users
from .languages import seed_languages, undo_languages

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_languages()
    seed_users()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_languages()
    undo_users()
    # Add other undo functions here
