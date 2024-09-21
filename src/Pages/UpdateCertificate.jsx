import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateCertificateMutation } from '../Reducers/apiReducers/certificateApi/certificateApi';
import { toast } from 'react-toastify';

const UpdateCertificateForm = () => {

    const certificateData = useLocation().state;
    console.log(certificateData);

    const formatDate = (date) => {
        return date ? new Date(date).toISOString().slice(0, 10) : ''; // Format to 'YYYY-MM-DD'
    };

    const [certificateId, setCertificateId] = useState(certificateData.certificateId);
    const [studentName, setStudentName] = useState(certificateData.studentName);
    const [internshipDomain, setInternshipDomain] = useState(certificateData.internshipDomain);
    const [startDate, setStartingDate] = useState(formatDate(certificateData.startDate));
    const [endDate, setEndingDate] = useState(formatDate(certificateData.endDate));


    const [update_certificate, update_response] = useUpdateCertificateMutation()

    const handleSubmit = async (event) => {
        event.preventDefault();
        await update_certificate({
            _id: certificateData._id,
            certificateId,
            studentName,
            internshipDomain,
            startDate,
            endDate,
        })
    };

    const navigate = useNavigate()
    useEffect(() => {
        if (update_response.isSuccess) {
            toast.success("certificate updated successfully");
            navigate("/admin", { replace: true });
        }
        if (update_response.isError) {
            toast.error("Failed to update certificate")
        }
    }, [update_response.isSuccess, update_response.isError]);


    return (
        <div className='w-full h-[80vh]'>
            <h2 className='text-[30px] font-bold text-center mt-5'>Update <span className='text-primary-color'>Certificate</span></h2>
            <form onSubmit={handleSubmit} className="p-6 space-y-6 w-[70%] mx-auto shadow-lg mt-5 border-[1px] border-primary-color rounded-lg">
                <div className="space-y-2">
                    <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700">
                        Certificate ID
                    </label>
                    <input
                        type="text"
                        id="certificateId"
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                        Student Name
                    </label>
                    <input
                        type="text"
                        id="studentName"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="internshipDomain" className="block text-sm font-medium text-gray-700">
                        Internship Domain
                    </label>
                    <input
                        type="text"
                        id="internshipDomain"
                        value={internshipDomain}
                        onChange={(e) => setInternshipDomain(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="startingDate" className="block text-sm font-medium text-gray-700">
                        Starting Date
                    </label>
                    <input
                        type="date"
                        id="startingDate"
                        value={startDate}
                        onChange={(e) => setStartingDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="endingDate" className="block text-sm font-medium text-gray-700">
                        Ending Date
                    </label>
                    <input
                        type="date"
                        id="endingDate"
                        value={endDate}
                        onChange={(e) => setEndingDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-primary-color rounded-md transition-all"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UpdateCertificateForm;