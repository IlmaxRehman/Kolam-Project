import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const BACKEND_URL = "https://kolam-project.onrender.com";

function Hero() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [analyzedUrl, setAnalyzedUrl] = useState(null);
  const [generatedUrl, setGeneratedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.to("#kolam-img", {
      rotation: 360,
      transformOrigin: "50% 50%",
      repeat: -1,
      yoyo: true,
      duration: 60,
      ease: "power1.inOut",
      filter: "drop-shadow(0 0 30px #adc178) drop-shadow(0 0 40px #a98467)",
    });
  }, []);

  // Upload file
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedImage(URL.createObjectURL(file));
    setUploadedFile(file);
    setAnalyzedUrl(null);
    setGeneratedUrl(null);

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setFileId(data.file_id);
      setFilePath(data.file_path);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Analyze image
  const handleAnalyze = async () => {
    if (!fileId || !filePath) return;
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_id: fileId, file_path: filePath }),
      });
      if (!res.ok) throw new Error("Analyze failed");
      const data = await res.json();
      setAnalyzedUrl(data.analyzed_url);
    } catch (err) {
      console.error("Analyze failed:", err);
    } finally {
      setLoading(false);
    }
  };


  // Generate image
const handleGenerate = async () => {
  if (!fileId) return; // make sure a file was uploaded
  setLoading(true);
  try {
    const res = await fetch(`${BACKEND_URL}/regenerate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_id: fileId }), // <-- send fileId here
    });
    const data = await res.json();
    setGeneratedUrl(data.generated_url);
  } catch (err) {
    console.error("Generate failed:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <header className="hero">
      <img id="kolam-img" src="/kolam.png" alt="Kolam" className="kolam-bg" />

      <div className="hero-content">
        <h1 className="hero-heading">Upload. Analyze. Recreate</h1>

        {!uploadedImage && (
          <div className="upload-box">
            <label htmlFor="upload-input">Upload Kolam Photo</label>
            <input
              type="file"
              id="upload-input"
              accept="image/*"
              onChange={handleUpload}
            />
          </div>
        )}

        {(uploadedImage || analyzedUrl || generatedUrl) && (
          <div className="preview-box">
            {uploadedImage && <img src={uploadedImage} alt="Uploaded Kolam" />}
            {analyzedUrl && <img src={analyzedUrl} alt="Analyzed Kolam" />}
            {generatedUrl && <img src={generatedUrl} alt="Generated Kolam" />}
          </div>
        )}

        {uploadedImage && !analyzedUrl && !loading && (
          <button className="hero-btn" onClick={handleAnalyze}>
            Analyze
          </button>
        )}

        {analyzedUrl && !generatedUrl && !loading && (
          <button className="hero-btn" onClick={handleGenerate}>
            Generate Kolam
          </button>
        )}

        {loading && <p className="loading-text">Processing your Kolam... ⏳</p>}
      </div>
    </header>
  );
}

export default Hero;
