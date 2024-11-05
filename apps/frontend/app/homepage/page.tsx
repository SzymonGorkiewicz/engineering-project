'use client'
import withAuth from "../_components/protected-routes"

const Page : React.FC = () => {
    return <>
        <h1>homepage works</h1> 
    </>
}
export default withAuth(Page)