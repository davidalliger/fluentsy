"""empty message

Revision ID: 448e00becc38
Revises: ffdc0a98111c
Create Date: 2022-03-16 19:39:15.814939

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '448e00becc38'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('languages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('level', sa.String(), nullable=False),
    sa.Column('native', sa.Boolean(), nullable=False),
    sa.Column('primary', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('img_url', sa.String(), nullable=True),
    sa.Column('country', sa.String(), nullable=True),
    sa.Column('state', sa.String(), nullable=True),
    sa.Column('timezone', sa.String(), nullable=True),
    sa.Column('about', sa.String(), nullable=True),
    sa.Column('birthday', sa.Date(), nullable=True),
    sa.Column('display_age', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('profiles')
    op.drop_table('languages')
    # ### end Alembic commands ###