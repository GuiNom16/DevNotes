from flask import Flask, request, jsonify
from transformers import pipeline
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)

# Load summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Load sentence transformer once (used for keyword extraction)
sentence_model = SentenceTransformer("all-MiniLM-L6-v2")


def extract_keywords(text: str, top_k: int = 5):
    # Naive candidate split — can improve with spaCy or regex
    candidates = list(set(text.lower().split()))

    doc_embedding = sentence_model.encode([text])
    candidate_embeddings = sentence_model.encode(candidates)

    distances = cosine_similarity(doc_embedding, candidate_embeddings)
    keywords = [candidates[index] for index in distances[0].argsort()[-top_k:][::-1]]

    return keywords


@app.route("/generate-tags", methods=["POST"])
def generate_tags():
    data = request.json
    text = data.get("text", "").strip()

    if not text:
        return jsonify({"tags": []})

    tags = extract_keywords(text)
    return jsonify({"tags": tags})


@app.route("/summarize-content", methods=["POST"])
def summarize_content():
    data = request.json
    text = data.get("text", "").strip()

    if not text:
        return jsonify({"summary": ""})

    try:
        summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
        return jsonify({"summary": summary[0]["summary_text"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
