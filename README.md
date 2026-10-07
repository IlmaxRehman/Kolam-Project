# DOT2LINE

A computer vision-based web application that analyzes traditional **Kolam patterns** from uploaded images, detects their structural elements, and regenerates the Kolam digitally.

The project combines a **React frontend** with a **FastAPI + OpenCV backend** to provide an interactive workflow for uploading, analyzing, and recreating Kolam designs.

## Live Demo

**Frontend:** https://kolam-project.vercel.app

**Backend API:** https://kolam-project.onrender.com

**API Documentation:** https://kolam-project.onrender.com/docs

> The backend is hosted on Render and the frontend is deployed on Vercel.

---

## Features

- Upload a Kolam image directly from the browser
- Detect dots and line/curve structures using computer vision
- Generate an analyzed version of the uploaded Kolam
- Recreate the detected Kolam pattern programmatically
- Interactive React interface
- REST API built with FastAPI
- Automatic CORS configuration for the deployed frontend
- Swagger UI for testing backend API endpoints

---

## How It Works

The application follows a three-step workflow:

```text
Upload Kolam
     ↓
Computer Vision Analysis
     ↓
Regenerate Kolam
```

### 1. Upload

The user uploads a Kolam image through the React frontend.

The image is sent to the FastAPI backend through:

```http
POST /upload
```

The backend stores the uploaded image and generates a unique file ID.

### 2. Analyze

The uploaded image is processed using the Kolam detection module.

```http
POST /analyze
```

The system detects:

- Kolam dots
- Straight lines
- Curves / polylines

The detected information is stored as JSON and an analyzed image is generated with the detected elements highlighted.

### 3. Regenerate

The stored detection data is used to recreate the Kolam on a blank canvas.

```http
POST /regenerate
```

The generated Kolam image is then returned to the frontend.

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- GSAP
- CSS

### Backend

- Python
- FastAPI
- Uvicorn
- OpenCV
- NumPy
- Pillow

### Computer Vision

- OpenCV
- NumPy
- Custom Kolam detection logic

### Deployment

- Vercel — Frontend
- Render — Backend
- GitHub — Source Code

---

## Project Structure

```text
Kolam-Project/
│
├── Kolam-frontend/
│   ├── public/
│   ├── src/
│   │   ├── homepage/
│   │   ├── collections/
│   │   ├── App.jsx
│   │   ├── AboutUs.jsx
│   │   ├── LearnWithUs.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── Kolam-backend/
│   ├── Image_Detection/
│   ├── uploads/
│   ├── analyzed/
│   ├── generated/
│   ├── json_data/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

---

## API Endpoints

The FastAPI backend provides the following endpoints.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/upload` | Upload a Kolam image |
| `POST` | `/analyze` | Analyze the uploaded image |
| `POST` | `/regenerate` | Regenerate the Kolam |
| `GET` | `/docs` | Interactive Swagger API documentation |

### Upload

```http
POST /upload
```

Accepts an image file and returns a unique file ID and file path.

### Analyze

```http
POST /analyze
```

Example request:

```json
{
  "file_id": "your-file-id",
  "file_path": "uploads/your-file.png"
}
```

The endpoint returns the URL of the analyzed image.

### Regenerate

```http
POST /regenerate
```

Example request:

```json
{
  "file_id": "your-file-id"
}
```

The endpoint returns the URL of the generated Kolam.

---

## Running Locally

### Prerequisites

Make sure you have installed:

- Python 3.12
- Node.js
- npm
- Git

---

### Backend Setup

Navigate to the backend:

```bash
cd Kolam-backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

Open another terminal and navigate to:

```bash
cd Kolam-frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## Environment Configuration

The frontend uses the deployed backend URL through the `BACKEND_URL` configuration.

For production:

```javascript
const BACKEND_URL = "https://kolam-project.onrender.com";
```

For local development, use:

```javascript
const BACKEND_URL = "http://127.0.0.1:8000";
```

---

## Deployment

### Frontend — Vercel

The frontend is deployed from:

```text
Kolam-frontend/
```

Recommended Vercel configuration:

```text
Framework: Vite
Root Directory: Kolam-frontend
Build Command: npm run build
Output Directory: dist
```

### Backend — Render

The backend is deployed from:

```text
Kolam-backend/
```

Recommended Render configuration:

```text
Root Directory: Kolam-backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
Python Version: 3.12
```

---

## CORS Configuration

The FastAPI backend allows requests from the local Vite development server and the deployed Vercel frontend.

```python
allow_origins=[
    "http://localhost:5173",
    "https://kolam-project.vercel.app"
]
```

---

## Computer Vision Pipeline

The backend processes uploaded images through the Kolam detection module.

The general pipeline is:

```text
Input Image
     ↓
Image Processing
     ↓
Kolam Element Detection
     ↓
Dot Detection
     ↓
Line / Curve Detection
     ↓
JSON Representation
     ↓
Visualization
     ↓
Regenerated Kolam
```

The detected structure is stored in JSON format containing information such as:

```json
{
  "dots": [],
  "lines_curves": []
}
```

This representation allows the Kolam to be recreated without directly using the original image.

---

## Future Improvements

- Improve detection accuracy for complex Kolam patterns
- Support more image orientations and lighting conditions
- Add additional Kolam generation algorithms
- Allow users to customize colors and canvas size
- Add downloadable generated Kolam images
- Add persistent cloud storage for uploaded images
- Improve mobile responsiveness
- Add authentication and user accounts
- Add a Kolam pattern gallery
- Add support for drawing Kolam directly in the browser

---

## Author

**Ilma Rehman**

B.Tech Computer Science & Engineering

GitHub: https://github.com/IlmaxRehman

---

## License

This project is intended for educational and portfolio purposes.
