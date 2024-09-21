import { useRef } from 'react'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import water_mark_logo from "../../assets/water_mark_logo.jpeg"
import DownloadIcon from '@mui/icons-material/Download';


export function CertificateDesign({ certificate, setIscertificateView }) {
    const { certificateId, studentName, internshipDomain, startDate, endDate } = certificate;

    const certificateRef = useRef();

    // Function to generate PDF
    const generatePdf = async () => {
        const canvas = await html2canvas(certificateRef.current, {
            scale: 2, // Adjust scale for better resolution
            useCORS: true, // Ensure images load correctly
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Create PDF with the same dimensions as the canvas (matches image dimensions)
        const pdf = new jsPDF({
            orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
            unit: 'pt',
            format: [imgWidth, imgHeight], // Use image dimensions for PDF
        });

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${studentName && studentName.split(" ").join("-")}-internship-completion-certificate.pdf`);
    };



    return (
        <>


            <div className="w-full flex flex-col justify-center">
                <div class="certificate-container relative w-[90%] mx-auto " ref={certificateRef}>
                    <div class="certificate border-8 border-blue-900 p-6 h-[800px] relative ">

                        <div class="absolute inset-0 opacity-10 pointer-events-none flex justify-center items-center w-full">
                            <img src={water_mark_logo} alt="Watermark" class="w-[100%] h-[800px] object-cover" />
                        </div>
                        <div class="certificate-body text-center relative ">
                            <h1 class="font-normal text-[70px] text-blue-900 mt-[80px]">Certificate of Internship Completion</h1>
                            <p class="student-name text-[55px] mt-[20px] underline ">{studentName}</p>
                            <div className='flex flex-col justify-between  gap-[45px] mt-[50px]'>
                                <div class="certificate-content mx-auto w-[90%]">
                                    <div class="about-certificate mx-auto w-[] text-[22px] font-medium">
                                        <p>This is to certify that {studentName} has successfully completed an internship in {internshipDomain} from {new Date(startDate).toLocaleDateString()}, to {new Date(endDate).toLocaleDateString()}. During this period, {studentName} demonstrated a strong understanding of {internshipDomain} concepts and skills, contributing effectively to various projects and tasks assigned.</p>
                                    </div>
                                    <div class="text-center mt-4">
                                        <p class="topic-description text-gray-700 font-medium">We congratulate {studentName} on this achievement and wish him continued success in his future endeavors.</p>
                                    </div>
                                </div>
                                <div class="certificate-footer flex justify-start text-gray-500 mt-[130px]">
                                    Certificate ID: {certificateId}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-9 mt-8'>
                    <button onClick={generatePdf} className="generate-pdf-btn border-2 px-5 py-2 font-semibold rounded-lg border-primary-color flex justify-center items-center gap-2 text-primary-color hover:bg-primary-color hover:text-white ">
                        <span>Download PDF</span>
                        <DownloadIcon />
                    </button>
                    <button onClick={() => setIscertificateView(false)} className="generate-pdf-btn border-2 px-5 py-2 font-semibold rounded-lg border-blue-600 flex justify-center items-center gap-2 text-blue-600 hover:bg-blue-600 hover:text-white">
                        Close
                    </button>
                </div>
            </div>



        </>
    )
}
