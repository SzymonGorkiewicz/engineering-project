'use client'
import withAuth from "../_components/protected-routes"
import AddDay from "./_components/add_day"

const Page : React.FC = () => {
    return <>
        <h1>homepage works</h1> 
        <AddDay></AddDay>
    </>
}
export default withAuth(Page)