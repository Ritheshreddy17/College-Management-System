import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* ── Sidebar ── */}
      <Sidebar />

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Navbar sits flush at the top */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default MainLayout;