import { Outlet, Link } from "react-router-dom";
import "./client/styles/layout.css";

const Layout = () => {
  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
      </style>
      <nav>
        <localStorage>
          <div className="banner">
          <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/study">Study</Link></li>
        <li><Link to="/setEditor">Create/Edit Sets</Link></li>
        <li><Link to="/makeSet">Set Maker</Link></li>
        <li style={{ float: 'right' }}><Link className="active" to="/loginPage">Login</Link></li>
        </ul>
          </div>
        </localStorage>
        <Outlet />
      </nav>
    </>
  )
};

export default Layout;