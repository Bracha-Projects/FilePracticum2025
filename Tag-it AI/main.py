import os
import logging
from utils import extract_text_from_file
from nlp_model import generate_tags

UPLOAD_DIR = "uploaded_files"
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def process_all_files():
    for filename in os.listdir(UPLOAD_DIR):
        filepath = os.path.join(UPLOAD_DIR, filename)
        if not os.path.isfile(filepath):
            continue

        logger.info(f"\n📄 Processing file: {filename}")
        try:
            text = extract_text_from_file(filepath)
            tags = generate_tags(text)
            logger.info(f"✅ Tags: {tags}")
        except Exception as e:
            logger.error(f"❌ Failed to process {filename}: {e}")

if __name__ == "__main__":
    process_all_files()