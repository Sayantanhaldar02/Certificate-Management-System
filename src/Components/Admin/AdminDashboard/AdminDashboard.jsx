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




// import React from 'react';
// import { Button, Card, CardContent, Typography } from '@mui/material';
// import { UploadFile } from '@mui/icons-material';

// const AdminDashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-3xl mx-auto">
//         <Card className="shadow-lg">
//           <CardContent>
//             <Typography variant="h4" className="text-center mb-6">
//               Admin Dashboard
//             </Typography>

//             <div className="mb-6">
//               <Typography variant="h6" className="mb-2">
//                 Upload Student Data
//               </Typography>
//               <Typography variant="body1" className="mb-4">
//                 Please upload an Excel file containing student information. The system will process and store the data.
//               </Typography>
//               <input
//                 type="file"
//                 id="file-upload"
//                 className="hidden"
//               />
//               <label htmlFor="file-upload">
//                 <Button
//                   variant="contained"
//                   component="span"
//                   startIcon={<UploadFile />}
//                   className="w-full py-3"
//                 >
//                   Select Excel File
//                 </Button>
//               </label>
//             </div>

//             <Button
//               variant="contained"
//               color="primary"
//               className="w-full py-3"
//             >
//               Upload File
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
