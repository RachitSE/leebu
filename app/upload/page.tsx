"use client";

import { useState } from "react";
import Header from "@/components/Header";

export default function Upload() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !title || !caption) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setProgress(20);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setProgress(60);

      const data = await res.json();

      if (data.success) {
        setProgress(80);
        const uploadedImageUrl = data.result.secure_url;

        const memoryRes = await fetch("/api/memories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, caption, imageUrl: uploadedImageUrl }),
        });

        if (memoryRes.ok) {
          setProgress(100);
          alert("Memory uploaded and saved successfully! 🚀");

          setImage(null);
          setTitle("");
          setCaption("");
          setPreview(null);
        } else {
          alert("Failed to save memory to the database.");
        }
      } else {
        alert("Image upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Header />
      <div className="grid-animation"></div>
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload Memory 🖼️</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
          <textarea
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="mt-4 max-h-64 w-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          {loading && (
            <div className="w-full bg-gray-200 rounded h-2">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Memory"}
          </button>
        </form>
      </div>
    </div>
  );
}
