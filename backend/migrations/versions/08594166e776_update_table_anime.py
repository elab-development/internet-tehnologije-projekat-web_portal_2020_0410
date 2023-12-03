"""update table anime

Revision ID: 08594166e776
Revises: 570caee593fc
Create Date: 2023-12-02 21:10:42.552143

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '08594166e776'
down_revision: Union[str, None] = '570caee593fc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('animes', 'other_name')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('animes', sa.Column('other_name', sa.VARCHAR(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###