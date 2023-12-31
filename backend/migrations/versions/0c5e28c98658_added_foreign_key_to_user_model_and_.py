"""Added foreign key to user model and deleted a column

Revision ID: 0c5e28c98658
Revises: f4e45e4afb0a
Create Date: 2023-12-02 20:19:33.799124

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0c5e28c98658'
down_revision: Union[str, None] = 'f4e45e4afb0a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('role_id', sa.Integer(), nullable=False))
    op.drop_constraint('user_phone_number_key', 'user', type_='unique')
    op.create_foreign_key(None, 'user', 'role', ['role_id'], ['id'], ondelete='CASCADE')
    op.drop_column('user', 'phone_number')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('phone_number', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.create_unique_constraint('user_phone_number_key', 'user', ['phone_number'])
    op.drop_column('user', 'role_id')
    # ### end Alembic commands ###
