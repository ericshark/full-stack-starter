from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application runtime configuration and environment variables."""

    PROJECT_NAME: str = "FastAPI Next.js Agentic App"
    API_V1_STR: str = "/api/v1"
    
    # PostgreSQL connection string (defaults to local docker postgres)
    DATABASE_URL: str = "postgresql+asyncpg://app:app@localhost:5432/app"
    
    # Allowed origins for CORS (default includes Next.js local dev server)
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    # Environment mode (development, test, production)
    ENVIRONMENT: str = "development"

    model_config = SettingsConfigDict(
        env_file=("../.env", ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
