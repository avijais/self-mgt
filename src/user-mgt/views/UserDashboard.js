import { UserProvider } from "../provider/UserContext";
import List from "./List";

function UserDashboard() {
    return (
        <UserProvider>
            <div className='container mt-5'>
                <List/>
            </div>
        </UserProvider>
    )
}

export default UserDashboard;