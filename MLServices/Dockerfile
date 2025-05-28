FROM python:3.10-slim

WORKDIR /app

# Install basic dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything from app folder into /app
COPY app/ .

# Run the Flask app
CMD ["python", "ai_services.py"]
