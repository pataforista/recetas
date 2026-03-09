import pypdf
import os

pdf_path = r"c:\Users\Admin\Desktop\recetas\libros\__RECETARIO_131224_op.pdf"
output_path = r"c:\Users\Admin\Desktop\recetas\libros\__RECETARIO_EXTRACTED.txt"

def extract_text():
    if not os.path.exists(pdf_path):
        print(f"Error: PDF not found at {pdf_path}")
        return

    try:
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Success: Text extracted to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_text()
