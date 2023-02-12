import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
    const [users, setUsers] = useState([
        { id: 1, fName: "Avi", lName: "Jais", email: "avi@email.com" },
        { id: 2, fName: "Savi", lName: "Jaiswal", email: "savi@gmail.com" },
    ])

    return(
        <UserContext.Provider value={[users]}>
            {props.children}
        </UserContext.Provider>
    )
}