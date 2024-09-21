import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import axios from 'axios';
import {validateFile} from '../../../Service/FileValidationService/FileValidationService';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [fileName, setfileName] = useState('')
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files.length>0){
      setFile(e.target.files[0]);
      setfileName(e.target.files[0].name)
    }
    const validate = validateFile(e.target.files[0])
    if(!validate.valid){
      toast.error("Upload an excel file!!")
    }
  };



  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setUploadStatus('');

    const formData = new FormData();
    formData.append('file', file);
  };

  return (
    <div className=" p-6">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardContent>
          <div className="mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<UploadFile />}
                className="w-full py-3"
              >
                Select Excel File
              </Button>
            </label>
            <p>{fileName && fileName}</p>
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            className="w-full py-3"
            disabled={uploading}
          >
            {uploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Upload File'
            )}
          </Button>

          {uploadStatus && (
            <Typography
              variant="body1"
              className={`mt-4 text-center ${uploadStatus.includes('successful') ? 'text-green-500' : 'text-red-500'}`}
            >
              {uploadStatus}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;


