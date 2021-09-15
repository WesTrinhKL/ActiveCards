"""empty message

Revision ID: d3ccd1913175
Revises: 1307f911b477
Create Date: 2021-09-15 11:50:07.866359

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3ccd1913175'
down_revision = '1307f911b477'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('quiz_directories', sa.Column('description', sa.String(length=255), nullable=True))
    op.alter_column('quiz_templates', 'quiz_directory_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.add_column('workspaces', sa.Column('description', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('workspaces', 'description')
    op.alter_column('quiz_templates', 'quiz_directory_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_column('quiz_directories', 'description')
    # ### end Alembic commands ###
