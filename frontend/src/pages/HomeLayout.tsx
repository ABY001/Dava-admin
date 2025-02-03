import { Outlet } from "react-router-dom"
import { Footer, Header } from "../components"

const HomeLayout = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}
export default HomeLayout