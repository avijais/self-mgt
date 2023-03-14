// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <NavLink to='/'>User Mgt</NavLink>
            <NavLink to='/self-mgt'>Self Mgt</NavLink>
        </nav>
    )
}

export default Navbar;