'use client'
import withAuth from "../_components/protected-routes"
import AddDay from "./_components/add_day"
import Navbar from "../_components/navbar"
const Page : React.FC = () => {
    return <>
        <Navbar></Navbar>
        <AddDay></AddDay>
    </>
}
export default withAuth(Page)