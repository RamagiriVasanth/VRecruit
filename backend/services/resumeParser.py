import sys
import json
from PyPDF2 import PdfReader

def parse_resume(path):
    try:
        reader = PdfReader(path)
        text = " ".join(page.extract_text() or '' for page in reader.pages).lower()
        keywords = ['python', 'react', 'node.js', 'flask', 'django', 'docker', 'mongodb']
        skills = [kw for kw in keywords if kw in text]
        return { "skills": skills, "experience": 3 }
    except Exception as e:
        return { "skills": [], "experience": 0, "error": str(e) }

if __name__ == "__main__":
    path = sys.argv[1]
    result = parse_resume(path)
    print(json.dumps(result))
