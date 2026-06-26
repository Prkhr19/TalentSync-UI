import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Mainlayout = () => {
  return (
    <div className="min-h-screen w-full pb-24">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Mainlayout
