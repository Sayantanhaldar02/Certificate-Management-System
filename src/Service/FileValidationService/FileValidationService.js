export const validateFile = (file) => {
    // Define allowed file types (e.g., Excel files)
    const allowedFileTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel (.xlsx)
        'application/vnd.ms-excel' // Excel (.xls)
    ];
  
    // Set maximum file size in bytes (e.g., 5MB = 5 * 1024 * 1024)
    const maxFileSize = 5 * 1024 * 1024;
  
    // Check if file type is valid
    if (!allowedFileTypes.includes(file.type)) {
      return { valid: false, message: 'Invalid file type. Please upload an Excel file.' };
    }
  
    // Check if file size is valid
    // if (file.size > maxFileSize) {
    //   return { valid: false, message: `File size exceeds the limit of 5MB.` };
    // }
  
    // If both checks pass, return valid
    return { valid: true, message: 'File is valid.' };
  };
  