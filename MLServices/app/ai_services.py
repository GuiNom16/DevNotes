from flask import Flask, request, jsonify
from transformers import pipeline
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer
import nltk
from nltk.stem import PorterStemmer
import openai

nltk.download('punkt')
stemmer = PorterStemmer()

app = Flask(__name__)

# Load models once
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
kw_model = KeyBERT(model=sentence_model)

beautifier = pipeline("text2text-generation", model="facebook/bart-large-cnn")

def generate_tags(content):
    raw_keywords = kw_model.extract_keywords(
        content,
        keyphrase_ngram_range=(1, 1),  # one-word only
        stop_words='english',
        top_n=20  # overfetch to allow for filtering
    )

    seen_stems = set()
    final_tags = []

    for kw, _ in raw_keywords:
        if len(kw.split()) > 1:  # just a safety check
            continue

        stemmed = stemmer.stem(kw.lower())

        if stemmed not in seen_stems:
            seen_stems.add(stemmed)
            final_tags.append(kw)

        if len(final_tags) == 5:
            break

    return final_tags

def summarize_content(content):
    if len(content.split()) < 50:
        return content
    summary = summarizer(content, max_length=100, min_length=30, do_sample=False)
    return summary[0]['summary_text']

def beautify_content(content):
    if not openai.api_key:
        return "OpenAI API key not configured. Please set OPENAI_API_KEY."

    prompt = (
        "Beautify the following content for better readability without changing its meaning. "
        "Use line spacing, bullet points for steps or lists, and add emojis where appropriate "
        "to make the content visually appealing:\n\n"
        f"{content}"
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that formats content nicely."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=800
        )

        beautified = response['choices'][0]['message']['content'].strip()
        return beautified

    except Exception as e:
        return f"Failed to beautify content: {str(e)}"

@app.route('/tags', methods=['POST'])
def tags_endpoint():
    data = request.json
    content = data.get("content", "")
    if not content:
        return jsonify({"error": "Content is required"}), 400
    tags = generate_tags(content)
    return jsonify({"tags": tags})

@app.route('/summary', methods=['POST'])
def summary_endpoint():
    data = request.json
    content = data.get("content", "")
    if not content:
        return jsonify({"error": "Content is required"}), 400
    summary = summarize_content(content)
    return jsonify({"summary": summary})

@app.route('/beautify', methods=['POST'])
def beautify_endpoint():
    data = request.json
    content = data.get("content", "")
    if not content:
        return jsonify({"error": "Content is required"}), 400
    beautified = beautify_content(content)
    return jsonify({"beautified": beautified})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
