import { UserProvider } from "../provider/UserContext";
import AddEditUser from "./AddEditUser";
import Header from "./Header";
import List from "./List";

function UserDashboard() {
    return (
        <UserProvider>
            <div className='container mt-5'>
                <Header/>
                <List/>
                <AddEditUser/>
            </div>
        </UserProvider>
    )
}

export default UserDashboard;