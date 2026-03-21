import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050314]">
      <Navbar />
      
      {}
      <main className="flex-1 w-full pt-16 md:pt-20"> 
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
