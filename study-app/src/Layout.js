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
          <h1 className="bannerHome"><Link to="/" className="bannerLink" >Home</Link></h1>
          <h1 className="bannerBoobPage"><Link to="/boobPage" className="bannerLink">Boob Page</Link></h1>
          <h1 className="bannerSetEditor"><Link to="/setEditor" className="bannerLink">Create/Edit Sets</Link></h1>
          <h1 className="bannerLogin"><Link to="/loginPage" className="bannerLink">Login </Link></h1>
        </div>
        </localStorage>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;