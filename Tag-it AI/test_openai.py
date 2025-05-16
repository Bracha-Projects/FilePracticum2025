import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
def main():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("ERROR: OPENAI_API_KEY not set")
        return

    client = OpenAI(api_key=api_key)

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "כתוב לי הודעה בעברית."}
            ],
        )
        print(response.choices[0].message.content)

    except Exception as e:
        print("Error during API request:", e)

if __name__ == "__main__":
    main()
