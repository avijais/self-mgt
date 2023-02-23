// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <NavLink to='/'>Self Mgt</NavLink>
            <NavLink to='/user-mgt'>User Mgt</NavLink>
        </nav>
    )
}

export default Navbar;