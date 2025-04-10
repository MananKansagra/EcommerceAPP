import React, { useState } from 'react';
import axios from 'axios';

const PlantDiseaseDetection = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload an image first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Is the backend running?");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Instructions */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">How to Use</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Select a clear image of a plant leaf.</li>
            <li>Click the "Upload" button to analyze.</li>
            <li>Wait for the prediction and tips to appear below.</li>
          </ol>
        </div>

        {/* Right: Upload Form */}
        <div className="bg-white border p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Upload Plant Leaf Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto mb-4 max-h-48 rounded-lg object-cover"
            />
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            {loading ? "Analyzing..." : "Upload & Predict"}
          </button>
        </div>
      </div>

      {/* Bottom: Result Section */}
      {result && (
        <div className="mt-8 bg-green-50 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-center mb-2">Prediction Result</h3>
          <p className="text-2xl font-bold text-green-800 text-center">{result.predicted_label}</p>
          <p className="text-center text-gray-600 mb-6">
            Confidence: {result.confidence.toFixed(2)}%
          </p>

          <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm">
            <h4 className="text-lg font-semibold text-green-700 mb-2">Prevention & Treatment Tips</h4>
            <p className="text-gray-800 whitespace-pre-line">
              {result.gpt_suggestions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDiseaseDetection;
