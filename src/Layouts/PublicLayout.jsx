import Header from "../Components/Public/Header";
import { Outlet } from "react-router";
import Footer from "../Components/Public/Footer";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="grow w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
