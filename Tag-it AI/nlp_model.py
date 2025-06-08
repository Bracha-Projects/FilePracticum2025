import os
import json
import logging
from langdetect import detect
from openai import OpenAI
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from docx import Document
import httpx

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

http_client = httpx.Client()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    http_client=http_client
)

def read_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

def read_pdf(file_path):
    text = ""
    with open(file_path, "rb") as f:
        reader = PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() or ""
    return text

def read_docx(file_path):
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

def extract_text_from_file(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".txt":
        return read_txt(file_path)
    elif ext == ".pdf":
        return read_pdf(file_path)
    elif ext == ".docx":
        return read_docx(file_path)
    else:
        logger.warning(f"Unsupported file type: {file_path}")
        return ""

def generate_tags(text: str) -> list:
    if not text.strip():
        return []

    try:
        lang = detect(text)
    except Exception:
        lang = "he"

    prompt = f"""
Analyze the following document content and generate 5–10 relevant, high-level tags that summarize the main topics or document type.
Output the tags as a JSON list of strings only.

Document:
\"\"\"{text[:4000]}\"\"\"

Return the tags in the same language as the document (detected language code: {lang}).
"""

    try:
        logger.info("Preparing to send request to OpenAI. Text length: %d, Language: %s", len(text), lang)
        logger.info("Sending request to OpenAI API...")
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system",
                 "content": "You are a helpful assistant that extracts meaningful tags from documents."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=500,
        )
        tags_text = response.choices[0].message.content.strip()

        if tags_text.startswith("```json"):
            tags_text = tags_text[len("```json"):].strip()
        if tags_text.endswith("```"):
            tags_text = tags_text[:-3].strip()

        logger.info(f"Cleaned response: {tags_text}")
        return json.loads(tags_text)

    except Exception as e:
        import traceback
        logger.error("Tagging failed: %s", str(e))
        logger.error("Full traceback:\n%s", traceback.format_exc())
        logger.error(f"Tagging failed: {e}")
        return []
