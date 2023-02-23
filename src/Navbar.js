import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to='/'>Self Mgt</Link>
            <Link to='/user-mgt'>User Mgt</Link>
        </nav>
    )
}

export default Navbar;