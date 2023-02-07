import { Outlet, Link } from "react-router-dom";
import "./client/styles/layout.css";

function noUnderline() {
  var el = document.getElementById('homeBanner');
  el.style.textDecoration = "none";
}
function noUnderline2() {
  var el = document.getElementById('boobPageBanner');
  el.style.textDecoration = "none";
}
const Layout = () => {
  return (
    <>
      <nav>
        <div className="banner">
          <h2 className="bannerHome"><Link to="/" className="bannerLink1" >Flashcard</Link></h2>
          <h2 className="bannerBoobPage"><Link to="/boobPage" className="bannerLink2">Boob Page</Link></h2>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;