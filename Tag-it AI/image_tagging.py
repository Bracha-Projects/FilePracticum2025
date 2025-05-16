from transformers import pipeline
from PIL import Image

# טוען את מודל זיהוי התמונה
classifier = pipeline("image-classification")

def classify_image(image_path):
    image = Image.open(image_path)
    results = classifier(image)
    return results

if __name__ == "__main__":
    image_path = "path_to_your_image.jpg"
    tags = classify_image(image_path)
    print(tags)
