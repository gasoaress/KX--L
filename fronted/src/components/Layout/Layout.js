import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sibebar';
import Header from '../Header/Header'; 

function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default Layout;
