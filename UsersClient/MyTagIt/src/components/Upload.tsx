import React, { useState } from 'react';
import AppLayout from './AppLayout';
import axios from 'axios';
import { FileToUpload } from '../models/FileToUpload';

const Upload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setMessage(null); //Clear previous messages
        }
    };

    const handleFolderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const folderId = e.target.value ? Number(e.target.value) : null;
        setSelectedFolderId(folderId);
    };
    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        try {
            setMessage("Generating upload URL...");
            
            // Step 1: Get a Pre-Signed URL from the server
            console.log("selectedFolderId", selectedFolderId);
            console.log("file.name", file.name);
            const response = await axios.get("https://localhost:7153/api/files/presigned-url", {
                params: { fileName: file.name, folderId: selectedFolderId },
            });
            const presignedUrl = response.data.url;

            // Step 2: Upload the file directly to S3
            await axios.put(presignedUrl, file, {
                headers: {
                    "Content-Type": file.type,
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setProgress(percent);
                },
            });
            const fileToUpload: FileToUpload = {
                UserId: 1,
                FileName: file.name,
                FileType: file.type,
                FileSize: file.size,
                StorageUrl: presignedUrl.split('?')[0],
            }
            await axios.post("https://localhost:7153/api/files/add-file", fileToUpload)

            setMessage("File uploaded successfully!");
            setFile(null);
            setProgress(0);
        } catch (error) {
            alert("Upload failed! Please try again.");
            console.error("Upload error:", error);
            setMessage("Upload failed. Please try again.");
        }
    };
    return (
        <AppLayout>
            <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
                <h2>Upload File</h2>

                {/* Folder Selection */}
                <label>
                    Select Folder:
                    <select onChange={handleFolderChange}>
                        <option value="">Default (uploads)</option>
                        <option value="1">Folder 1</option>
                        <option value="2">Folder 2</option>
                        <option value="3">Folder 3</option>
                    </select>
                </label>

                <br />

                {/* File Selection */}
                <input type="file" onChange={handleFileChange} />

                {/* Upload Button */}
                <button onClick={handleUpload} disabled={!file}>
                    Upload
                </button>

                {/* Progress Bar */}
                {progress > 0 && <div>Progress: {progress}%</div>}

                {/* Status Message */}
                {message && <div style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</div>}
            </div>
        </AppLayout>
    );
};

export default Upload;