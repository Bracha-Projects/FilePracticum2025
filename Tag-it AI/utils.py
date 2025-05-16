import pdfplumber
import docx
from bs4 import BeautifulSoup
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_text_from_file(filepath: str) -> str:
    if filepath.endswith(".pdf"):
        return extract_text_from_pdf(filepath)
    elif filepath.endswith(".docx"):
        return extract_text_from_docx(filepath)
    elif filepath.endswith(".html"):
        return extract_text_from_html(filepath)
    elif filepath.endswith(".txt"):
        return extract_text_from_txt(filepath)
    else:
        raise ValueError("Unsupported file type")

def extract_text_from_pdf(path):
    try:
        with pdfplumber.open(path) as pdf:
            return "\n".join(page.extract_text() or "" for page in pdf.pages)
    except Exception as e:
        logger.error(f"Error reading PDF: {e}")
        return ""

def extract_text_from_docx(path):
    try:
        doc = docx.Document(path)
        return "\n".join(p.text for p in doc.paragraphs)
    except Exception as e:
        logger.error(f"Error reading DOCX: {e}")
        return ""

def extract_text_from_html(path):
    try:
        with open(path, encoding="utf-8") as f:
            soup = BeautifulSoup(f.read(), "html.parser")
            return soup.get_text()
    except Exception as e:
        logger.error(f"Error reading HTML: {e}")
        return ""

def extract_text_from_txt(path):
    try:
        with open(path, encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        logger.error(f"Error reading TXT: {e}")
        return ""
