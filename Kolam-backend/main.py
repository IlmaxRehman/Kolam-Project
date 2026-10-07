from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uuid, os, shutil
import json
import cv2
import numpy as np
from Image_Detection.input import detect_kolam_elements

app = FastAPI()

#  React frontend Access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://kolam-project.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories
UPLOAD_DIR = "uploads"
ANALYZED_DIR = "analyzed"
GENERATED_DIR = "generated"
JSON_DIR = "json_data"

for d in [UPLOAD_DIR, ANALYZED_DIR, GENERATED_DIR, JSON_DIR]:
    os.makedirs(d, exist_ok=True)

# Serve static files so React can access images
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
app.mount("/analyzed", StaticFiles(directory=ANALYZED_DIR), name="analyzed")
app.mount("/generated", StaticFiles(directory=GENERATED_DIR), name="generated")


# Upload File
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.png")
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return {
        "file_id": file_id,
        "file_path": file_path,
        "file_url": f"https://kolam-project.onrender.com/uploads/{file_id}.png"
    }


# Analyze File
@app.post("/analyze")
async def analyze_file(payload: dict):
    file_id = payload.get("file_id")
    file_path = payload.get("file_path")
    if not file_id or not file_path or not os.path.exists(file_path):
        return JSONResponse(status_code=400, content={"error": "Invalid file"})

    json_path = os.path.join(JSON_DIR, f"{file_id}.json")

    # Run Kolam detection
    data = detect_kolam_elements(file_path, show_visualization=False)

    # Save JSON data
    with open(json_path, "w") as f:
        json.dump(data, f, indent=4)

    # Create analyzed image
    img = cv2.imread(file_path)

    # Draw dots
    for (x, y) in data["dots"]:
        cv2.circle(img, (x, y), 5, (0, 255, 0), 2)

    # Draw lines & curves
    for seg in data["lines_curves"]:
        if len(seg) == 2:  # straight line
            cv2.line(img, seg[0], seg[1], (255, 0, 0), 2)
        elif len(seg) > 2:  # curve/polyline
            pts = np.array(seg, np.int32).reshape((-1, 1, 2))
            cv2.polylines(img, [pts], False, (0, 255, 255), 2)

    analyzed_path = os.path.join(ANALYZED_DIR, f"{file_id}_analyzed.png")
    cv2.imwrite(analyzed_path, img)

    return {"analyzed_url": f"https://kolam-project.onrender.com/analyzed/{file_id}_analyzed.png"}


# Regenerate File
@app.post("/regenerate")
async def regenerate_file(payload: dict):
    file_id = payload.get("file_id")
    if not file_id:
        return JSONResponse(status_code=400, content={"error": "file_id missing"})

    json_path = os.path.join(JSON_DIR, f"{file_id}.json")
    if not os.path.exists(json_path):
        return JSONResponse(status_code=400, content={"error": "JSON data not found"})

    # Load JSON
    with open(json_path) as f:
        data = json.load(f)

    dots = data.get("dots", [])
    lines_curves = data.get("lines_curves", [])

    # Create blank canvas
    canvas_size = 680
    img = np.ones((canvas_size, canvas_size, 3), dtype=np.uint8) * 255

    # Draw dots
    for (x, y) in dots:
        cv2.circle(img, (x, y), 5, (0, 0, 255), -1)

    # Draw lines and curves
    for seg in lines_curves:
        if len(seg) == 2:
            cv2.line(img, seg[0], seg[1], (0, 0, 0), 2)
        elif len(seg) > 2:
            pts = np.array(seg, np.int32).reshape((-1, 1, 2))
            cv2.polylines(img, [pts], False, (0, 128, 0), 2)

    # Save generated image
    generated_path = os.path.join(GENERATED_DIR, f"{file_id}_generated.png")
    cv2.imwrite(generated_path, img)

    return {"generated_url": f"https://kolam-project.onrender.com/generated/{file_id}_generated.png"}
