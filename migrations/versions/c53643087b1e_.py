"""empty message

Revision ID: c53643087b1e
Revises: 
Create Date: 2019-01-31 10:02:23.520000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c53643087b1e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('admins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('admin_name', sa.String(length=50), nullable=False),
    sa.Column('admin_password', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('admin_name'),
    sa.UniqueConstraint('admin_password')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name', sa.String(length=50), nullable=False),
    sa.Column('user_password', sa.String(length=50), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=True),
    sa.Column('last_name', sa.String(length=50), nullable=True),
    sa.Column('timecreated', sa.DateTime(), nullable=True),
    sa.Column('user_signature', sa.LargeBinary(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_name'),
    sa.UniqueConstraint('user_password')
    )
    op.create_table('awards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('award_type', sa.String(length=100), nullable=True),
    sa.Column('recipient_first_name', sa.String(length=100), nullable=True),
    sa.Column('recipient_last_name', sa.String(length=100), nullable=True),
    sa.Column('time_granted', sa.Time(), nullable=True),
    sa.Column('date_granted', sa.Date(), nullable=True),
    sa.Column('created_by_user', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['created_by_user'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('awards')
    op.drop_table('users')
    op.drop_table('admins')
    # ### end Alembic commands ###
