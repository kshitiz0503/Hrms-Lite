import { useState } from "react";
import Navbar from "../components/Navbar/Component";
import Sidebar from "../components/Sidebar/Component";
import "./layout.css";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div id="layout-container">
      <Sidebar isOpen={sidebarOpen} />
      <div id="layout-main">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div id="layout-content">
          {children}
        </div>
      </div>
    </div>
  );
}
