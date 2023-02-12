import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
    // used to maintaine id state
    const [userId, setUserId] = useState( () => 1);

    const [users, setUsers] = useState([]);
    // { id: 1, fName: "Avi", lName: "Jais", email: "avi@email.com" },
    // { id: 2, fName: "Savi", lName: "Jaiswal", email: "savi@gmail.com" },

    const [isShowPopup, setIsShowPopup] = useState(false);

    const openPopup = () => {
        setIsShowPopup(true);
    }

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