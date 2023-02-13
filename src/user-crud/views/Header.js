import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../provider/UserContext";

function Header() {
    const [
        userId, setUserId,
        users, setUsers,
        isShowPopup, setIsShowPopup,
        openPopup,
        closePopup,
        responseMsg, setResponseMsg
    ] = useContext(UserContext);

    return (
        <>
            {/* heading and add button section */}
            <div className='mb-5'>
                <h1>
                    <span>Users</span>
                    <Button className="addBtn" variant="primary" onClick={openPopup}>Add</Button>
                </h1>
                {
                    (responseMsg.length > 0)
                    ? <div className="responsMsg green">{responseMsg}</div>
                    : ''
                }
                <hr />
            </div>
        </>
    )
}

export default Header;