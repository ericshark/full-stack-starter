import json
from pathlib import Path

from app.main import app


def export_openapi() -> None:
    """Export the FastAPI OpenAPI schema to frontend/src/lib/types/openapi.json."""
    schema = app.openapi()
    
    # Path relative to backend root directory
    base_dir = Path(__file__).resolve().parents[3]
    target_path = base_dir / "frontend" / "src" / "lib" / "types" / "openapi.json"
    
    # Ensure parent directory exists
    target_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(schema, f, indent=2)
        f.write("\n")
    
    print(f"✓ OpenAPI schema successfully exported to {target_path}")


if __name__ == "__main__":
    export_openapi()
