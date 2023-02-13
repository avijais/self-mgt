import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
    // used to maintaine id state
    const [userId, setUserId] = useState( () => 1);

    // array users having each user object
    const [users, setUsers] = useState([]);

    // boolean state to show/hide popup
    const [isShowPopup, setIsShowPopup] = useState(false);

    // handling the opening of popup
    const openPopup = () => {
        setIsShowPopup(true);
    }

    // handling the closing of popup
    const closePopup = () => {
        setIsShowPopup(false);
    }

    return(
        <UserContext.Provider value={[
            userId, setUserId,
            users, setUsers,
            isShowPopup, setIsShowPopup,
            openPopup,
            closePopup
        ]}>
            {props.children}
        </UserContext.Provider>
    )
}