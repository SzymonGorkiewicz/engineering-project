'use client'
import Navbar from "../_components/navbar"
import withAuth from "../_components/protected-routes"
import BodyStats from "./_components/body-stats"

const Page : React.FC = () => {
    return <>
        <Navbar></Navbar>
        <BodyStats></BodyStats>
    </>
    
}


export default withAuth(Page)