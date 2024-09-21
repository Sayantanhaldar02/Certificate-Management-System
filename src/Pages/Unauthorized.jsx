import { useEffect } from 'react'
import unauthorizedImage from '../assets/unauthorized.svg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Unauthorized = () => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const user = useSelector(state=>state.user.userData)
    useEffect(() => {
        setTimeout(() =>
            setCount(prevCount => prevCount - 1),
            count > 0 ? null : user && user.role==="admin"? navigate("/admin", {replace:true}) :navigate("/",{replace:true})
        )
    }, [])
    return (
        <>
            <img src={unauthorizedImage} alt="unauthorizedImage" className='w-full' />
        </>
    )
}

export default Unauthorized