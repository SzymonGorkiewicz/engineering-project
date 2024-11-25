"use client";
import withAuth from "../_components/protected-routes";
import Navbar from "../_components/navbar";
import AddDay from "./_components/add_day";

const Page: React.FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <AddDay></AddDay>
    </>
  );
};
export default withAuth(Page);
