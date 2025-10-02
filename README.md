# Dot2Line – The Kolam Project

Dot2Line is a demo prototype developed for Smart India Hackathon 2025 under the problem statement **SIH25107 – Rocket Rocks**.  
It explores how traditional **Kolam (Rangoli)** patterns can be digitized using a simple web interface and a Python backend.

---

## What It Does
- React.js frontend with a basic interface  
- FastAPI backend for handling requests  
- Sample use of OpenCV and NumPy for simple image utilities  
- Demonstrates communication between frontend and backend  

---

## Setup

### Backend

cd Kolam-backend
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend

cd Kolam-frontend
npm install
npm start

### NOTE:
This is a demo prototype. It is not a complete solution and currently only demonstrates the basic workflow. Planned features such as full Kolam pattern generation and AI-based enhancements are not yet implemented.
