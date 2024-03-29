"""empty message

Revision ID: 44ff61aa24f0
Revises: 3860753fc31b
Create Date: 2021-08-30 21:15:23.661656

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '44ff61aa24f0'
down_revision = '3860753fc31b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_active_recall_answers', sa.Column('created_at', sa.DateTime(), nullable=False))
    op.add_column('user_active_recall_answers', sa.Column('updated_at', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user_active_recall_answers', 'updated_at')
    op.drop_column('user_active_recall_answers', 'created_at')
    # ### end Alembic commands ###
