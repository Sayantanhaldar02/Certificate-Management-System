import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Tooltip, } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import { useAllCertificatesQuery, useDeleteCertificateMutation } from '../../../Reducers/apiReducers/certificateApi/certificateApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CertificateDesign } from '../../Certificate/Certificate';


const Certificate_table = (props) => {

    const { isLoading } = useAllCertificatesQuery()

    const allCertificates = useSelector(state => state.certificate.allCertificates)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const [delete_certificate, delete_response] = useDeleteCertificateMutation()
    const handelDelete = async (id) => {
        await delete_certificate(id);
        // console.log(id)
    }

    useEffect(() => {
        if (delete_response.isSuccess) {
            toast.success("certificate delete successfully");
        }
        if (delete_response.isError) {
            toast.error("Failed to delete certificate")
        }
    }, [delete_response.isSuccess, delete_response.isError]);




    return (
        <>
            <TableContainer component={Paper} className='border-2 border-primary-color max-h-[500px] myTable'>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead >
                        <TableRow className='border-b-2 border-green-400 text-center'>
                            <TableCell style={{ borderBottom: '2px solid #fd715d' }}><strong>Sl. No</strong></TableCell>
                            <TableCell style={{ borderBottom: '2px solid #fd715d' }}><strong>Certificate ID</strong></TableCell>
                            <TableCell style={{ borderBottom: '2px solid #fd715d' }} align='center'><strong>Student Name</strong></TableCell>
                            <TableCell style={{ borderBottom: '2px solid #fd715d' }} align='center'><strong>Internship Domain</strong></TableCell>
                            <TableCell style={{ borderBottom: '2px solid #fd715d' }} align='center'><strong>Starting Date</strong></TableCell>
                            <TableCell style={{ borderBottom: '2px solid #fd715d' }} align='center'><strong>Ending Date</strong></TableCell>
                            <TableCell style={{ borderBottom: '2px solid #fd715d' }} align='center'><strong>Update</strong></TableCell>
                            <TableCell style={{ borderBottom: '2px solid #fd715d' }} align='center'><strong>Delete</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        isLoading ?
                            <>
                                <div className='w-full'>
                                    <Animations />
                                </div>
                            </> :
                            <>
                                <TableBody>
                                    {
                                        allCertificates && allCertificates
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .sort((a, b) => new Date(b.createdAt).getMilliseconds() - new Date(a.createdAt).getMilliseconds())
                                            .map((certificate, index) => (<Table_body key={certificate._id} certificate={certificate} index={index} handelDelete={handelDelete} />))
                                    }
                                </TableBody>
                            </>
                    }
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={allCertificates ? allCertificates.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default Certificate_table


function Table_body({ certificate, handelDelete, index }) {
    const handel_delete = (id) => {
        handelDelete(id)
    }

    return (
        <>
            <TableRow className=''>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{certificate.certificateId}</TableCell>
                <TableCell align='center'>{certificate.studentName}</TableCell>
                <TableCell align='center'>{certificate.internshipDomain}</TableCell>
                <TableCell align='center'>{new Date(certificate.startDate).toLocaleDateString()}</TableCell>
                <TableCell align='center'>{new Date(certificate.endDate).toLocaleDateString()}</TableCell>
                <TableCell align='center'>
                    <Link to="/update-certificate" state={certificate && certificate}>
                        <button
                            className="text-green-700"
                        >
                            <Tooltip title="Update">
                                <InfoIcon />
                            </Tooltip>
                        </button>
                    </Link>
                </TableCell>
                <TableCell align='center'>
                    <button
                        className='text-red-600'
                        onClick={() => handel_delete(certificate._id)}
                    >
                        <Tooltip title="Delete">
                            <DeleteIcon />
                        </Tooltip>
                    </button>
                </TableCell>
            </TableRow>
        </>
    )
}


function Animations() {
    return (
        <div className='w-[100%]'>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={true} />
        </div>
    );
}