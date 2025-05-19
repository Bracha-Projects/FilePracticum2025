from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re
from utils import extract_text_from_file
from nlp_model import generate_tags

UPLOAD_FOLDER = "uploaded_files"
ALLOWED_EXTENSIONS = {'.pdf', '.docx', '.txt', '.html'}

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    ext = os.path.splitext(filename)[1].lower()
    return ext in ALLOWED_EXTENSIONS

def sanitize_filename(filename: str) -> str:
    import unicodedata
    name, ext = os.path.splitext(filename)
    name = ''.join(c if re.match(r'[א-תA-Za-z0-9._-]', c) else '_' for c in name)
    ext = ''.join(c if re.match(r'[A-Za-z0-9.]', c) else '' for c in ext)
    if not name:
        name = 'file'
    return f"{name}{ext}"

@app.route("/api/tag", methods=["POST"])
def tag_file():
    print("Start tag_file endpoint")

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    print(f"Received file: {file.filename}")

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file and allowed_file(file.filename):
        filename = sanitize_filename(file.filename)
        print(f"Sanitized filename: {filename}")
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        file.save(filepath)
        print(f"File saved to {filepath}")

        if not os.path.exists(filepath):
            return jsonify({"error": "File not saved properly"}), 500

        try:
            text = extract_text_from_file(filepath)
            print(f"Extracted text length: {len(text)}")
            tags = generate_tags(text)
            print(f"Generated tags: {tags}")
            return jsonify({"tags": tags})
        except Exception as e:
            print("Error during processing:", str(e))
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "File type not allowed"}), 400


if __name__ == "__main__":
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(host="0.0.0.0", port=5000)
