import { Navabr } from "../Components/Common/Navabr"
import Footer from "../Components/Common/Footer"
const Layout = ({ children }) => {
    return (
        <>
            <Navabr />
            {children}
            <Footer />
        </>
    )
}

export default Layout