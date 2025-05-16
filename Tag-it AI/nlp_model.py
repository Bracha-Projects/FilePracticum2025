import os
import json
import logging
import requests
from langdetect import detect
from openai import OpenAI
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from docx import Document
import httpx
import time

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# יצירת HTTP client עם verify=False
http_client = httpx.Client(verify=False)

# יצירת לקוח OpenAI עם HTTP client מותאם
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
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

def read_file(file_path):
    if file_path.endswith(".txt"):
        return read_txt(file_path)
    elif file_path.endswith(".pdf"):
        return read_pdf(file_path)
    elif file_path.endswith(".docx"):
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

        print("Cleaned response:", tags_text)
        return json.loads(tags_text)

    except Exception as e:
        logger.error(f"Tagging failed: {e}")
        return []