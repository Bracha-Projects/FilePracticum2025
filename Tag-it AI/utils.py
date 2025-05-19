import pdfplumber
import docx
from bs4 import BeautifulSoup
import logging
import pytesseract

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_text_from_file(filepath: str) -> str:
    ext = filepath.lower().split('.')[-1]
    if ext == "pdf":
        text = extract_text_from_pdf(filepath)
        if not text.strip():
            logger.info("No text extracted from PDF, trying OCR...")
            text = ocr_pdf(filepath)
        return text
    elif ext == "docx":
        return extract_text_from_docx(filepath)
    elif ext == "html":
        return extract_text_from_html(filepath)
    elif ext == "txt":
        return extract_text_from_txt(filepath)
    else:
        raise ValueError("Unsupported file type")

def extract_text_from_pdf(path):
    try:
        with pdfplumber.open(path) as pdf:
            texts = [page.extract_text() or "" for page in pdf.pages]
            full_text = "\n".join(texts)
            logger.info(f"Extracted text length from PDF: {len(full_text)}")
            return full_text
    except Exception as e:
        logger.error(f"Error reading PDF: {e}")
        return ""

def ocr_pdf(path):
    try:
        text = ""
        with pdfplumber.open(path) as pdf:
            for i, page in enumerate(pdf.pages):
                logger.info(f"Running OCR on page {i + 1}")
                # יוצרים תמונה של העמוד
                pil_image = page.to_image(resolution=300).original
                # מפעילים OCR על התמונה
                page_text = pytesseract.image_to_string(pil_image, lang='eng+heb')
                text += page_text + "\n"
        return text
    except Exception as e:
        logger.error(f"Error during OCR processing: {e}")
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
