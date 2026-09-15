"""Initial Item table

Revision ID: 0001_initial
Revises: 
Create Date: 2026-09-15 17:35:00.000000

"""
from collections.abc import Sequence

import sqlalchemy as sa
import sqlmodel

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0001_initial"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "items",
        sa.Column("title", sqlmodel.AutoString(length=100), nullable=False),
        sa.Column("description", sqlmodel.AutoString(length=255), nullable=True),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_items_title"), "items", ["title"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_items_title"), table_name="items")
    op.drop_table("items")
