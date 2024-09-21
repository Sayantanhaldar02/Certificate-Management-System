import { useEffect, useState } from 'react'
import { useLazyGetCertificateByIdQuery } from '../Reducers/apiReducers/certificateApi/certificateApi';
import { BallTriangle } from 'react-loader-spinner'
import { CertificateDesign } from '../Components/Certificate/Certificate';




const Certificate = () => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [isCertificateView, setIscertificateView] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorOccured, setIsErrorOccured] = useState(false);


    const [trigger, { data, isSuccess, isError, error }] = useLazyGetCertificateByIdQuery()
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIscertificateView(false);
        await trigger(search);
        setSearch("");
    };


    useEffect(() => {
        if (isSuccess) {
            setIsLoading(false);
            setIscertificateView(true);

        }
        if (isError) {
            setIsErrorOccured(true);
            setIsLoading(false);
            setIscertificateView(false);
        }
    }, [isSuccess, isError, data]);


    return (
        <>

            {
                isLoading ? <Loader /> : isSuccess && data && isCertificateView ? <CertificateDesign certificate={data && data.data} setIscertificateView={setIscertificateView} /> : isErrorOccured ? <CertificateNotFound setIsErrorOccured={setIsErrorOccured} /> :
                    <div className='h-[82vh] w-[100%] flex justify-center items-center'>
                        <div className=' w-[100%] flex flex-col justify-center items-center gap-10'>
                            <div>
                                <h2 className='text-[50px]  font-bold'>Get Your <span className='text-primary-color'>Certificate</span></h2>
                            </div>
                            <form onSubmit={handleSearchSubmit} className="flex justify-center mb-4 w-full ">
                                <input
                                    type="search"
                                    value={search}
                                    onChange={handleSearch}
                                    placeholder="Enter your certificate Id"
                                    className="w-[50%] p-2 pl-10 text-lg border border-primary-color rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg ml-2"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
            }
        </>
    )
}

export default Certificate





const Loader = () => {
    return (
        <div className='w-full h-[100vh] flex justify-center items-center py-10 '>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}


const CertificateNotFound = ({ setIsErrorOccured }) => {
    return (
        <div className='w-full h-[90vh] flex flex-col justify-center items-center py-10'>
            <h2 className='text-[70px] font-bold text-center'><span>Certificate Not</span> <span className='text-primary-color'>Found!</span></h2>
            <button onClick={() => setIsErrorOccured(false)} className="generate-pdf-btn border-2 px-5 py-2 font-semibold rounded-lg border-blue-600 flex justify-center items-center gap-2 text-blue-600 hover:bg-blue-600 hover:text-white">
                Close
            </button>
        </div>
    )
}