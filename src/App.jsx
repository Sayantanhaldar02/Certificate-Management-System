import AdminPage from './Pages/AdminPage'
import { Login } from './Components/Auth/Login'
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from './Protected_Routes/ProtectedRoute'
import { Registration } from './Components/Auth/Registration'
import { PageNotFound } from './Pages/PageNotFound'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import Certificate from './Pages/Certificate'
import { useEffect } from 'react'
import { modifyPdf } from './Service/GenereatePDF/generatePdf'
import UpdateCertificateForm from './Pages/UpdateCertificate'

function App() {

  useEffect(() => {
    // modifyPdf();
  }, [])

  return (
    <>

      <Routes>
        <Route path='/' element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path='/certificate' element={
          <Layout>
            <ProtectedRoute allowedRoles={["user","admin"]}>
              <Certificate />
            </ProtectedRoute>
          </Layout>
        } />
        <Route path='/admin' element={
          <Layout>
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          </Layout>
        } />
        <Route path='/update-certificate' element={
          <Layout>
            <ProtectedRoute allowedRoles={['admin']}>
              <UpdateCertificateForm />
            </ProtectedRoute>
          </Layout>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </>
  )
}

export default App
