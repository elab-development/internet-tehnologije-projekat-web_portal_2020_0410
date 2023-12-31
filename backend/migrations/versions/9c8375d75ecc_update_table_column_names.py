"""update table/column names

Revision ID: 9c8375d75ecc
Revises: 0c5e28c98658
Create Date: 2023-12-02 20:42:02.032675

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '9c8375d75ecc'
down_revision: Union[str, None] = '0c5e28c98658'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('roles',
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('displayName', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('role_id')
    )
    op.create_table('users',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('last_log_in', sa.TIMESTAMP(timezone=True), nullable=False),
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['roles.role_id'], ),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.drop_table('user')
    op.drop_table('role')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('username', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('password', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('first_name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('last_name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('last_log_in', postgresql.TIMESTAMP(timezone=True), autoincrement=False, nullable=False),
    sa.Column('role_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['role.id'], name='user_role_id_fkey', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='user_pkey'),
    sa.UniqueConstraint('email', name='user_email_key'),
    sa.UniqueConstraint('username', name='user_username_key')
    )
    op.create_table('role',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('title', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('displayName', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='role_pkey')
    )
    op.drop_table('users')
    op.drop_table('roles')
    # ### end Alembic commands ###
