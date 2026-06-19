import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({
  children,
}) {
  return (
    <div className="flex bg-slate-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

        <Navbar />

        {children}

        <Footer />

      </div>

    </div>
  );
}

export default MainLayout;