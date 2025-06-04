# 🧠 AI Services Flask App

This is a lightweight Flask-based microservice that powers **three AI-driven features** in your main application. These features—**Tag Generation**, **Summarization**, and **Content Beautification**—are exposed via simple REST API endpoints and are designed to enhance textual content using pre-trained transformer models.

---

## 📁 Project Structure

```
.
├── app/
│   └── ai_services.py       # Flask app with AI-powered endpoints
├── Dockerfile               # Docker image definition
├── docker-compose.yml       # Service configuration for Docker Compose
├── requirements.txt         # Python dependencies
```

---

## 🚀 Features

### 1. Tag Generation (`/tags`)

Extracts up to **5 unique one-word tags** from a given text using `KeyBERT` and `nltk` stemming to ensure relevance and uniqueness.

### 2. Summarization (`/summarize`)

Uses HuggingFace's `distilbart-cnn-12-6` summarizer to generate concise summaries for long-form content.

### 3. Content Beautification (`/beautify`)

Beautifies and formats content using OpenAI's `gpt-3.5-turbo`. This feature enhances readability with:

- Bullet points
- Line spacing
- Emojis (✨🚀✅)

> ⚠️ This requires an OpenAI API key.

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/GuiNom16/DevNotes.git
cd MLServices
```

### 2. Set up environment variables

Create a `.env` file or export manually:

```bash
export OPENAI_API_KEY="your-openai-api-key"
```

Alternatively, inject it when running the Docker container.

---

## 🐳 Running the App with Docker

Make sure Docker and Docker Compose are installed.

```bash
docker-compose up --build
```

This will expose the Flask API on `http://localhost:5000`.

---

## 🔌 API Endpoints

All endpoints accept `POST` requests with a JSON body.

### `/tags`

**Request:**

```json
{
  "content": "Artificial Intelligence is revolutionizing industries..."
}
```

**Response:**

```json
{
  "tags": ["intelligence", "revolution", "industry", "ai", "technology"]
}
```

---

### `/summarize`

**Request:**

```json
{
  "content": "Artificial Intelligence is a field of computer science focused on..."
}
```

**Response:**

```json
{
  "summary": "Artificial Intelligence is a branch of computer science that focuses on..."
}
```

---

### `/beautify`

**Request:**

```json
{
  "content": "Step 1: Turn on the device. Step 2: Connect to WiFi. Step 3: Begin setup..."
}
```

**Response:**

```json
{
  "beautified": "✨ Here's how to get started:\n\n- Step 1: Turn on the device\n- Step 2: Connect to WiFi\n- Step 3: Begin setup\n\nYou're all set! 🚀"
}
```

> 🔐 Requires the `OPENAI_API_KEY` environment variable.

---

## 🧪 Local Development

To run locally without Docker:

```bash
pip install -r requirements.txt
python app/ai_services.py
```

---

## 🛠 Tech Stack

- **Flask** — Lightweight Python web framework
- **Transformers (HuggingFace)** — Pretrained summarization and beautification models
- **KeyBERT** — Keyword extraction using BERT embeddings
- **OpenAI API** — GPT-3.5 for content beautification
- **Docker** — Containerized service

---
