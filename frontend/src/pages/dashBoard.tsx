import HandleHeader from "../components/landingPage.components/header";
import { Outlet } from "react-router-dom";
const DashboardPage = () => {
  return (
    <>
      <HandleHeader />
      <Outlet/>
    </>
  );
};

export default DashboardPage;
