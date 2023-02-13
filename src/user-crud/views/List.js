import React, { useContext } from "react";
import { Button, Stack, Table } from "react-bootstrap"
import { UserContext } from "../provider/UserContext";

function List () {
    const [
        userId, setUserId,
        users, setUsers,
        isShowPopup, setIsShowPopup,
        openPopup,
        closePopup,
        responseMsg, setResponseMsg
    ] = useContext(UserContext);

    // delete user
    const deleteUser = (e) => {
        e.preventDefault();
        const removeId = parseInt(e.target.dataset.remove);
        let index;
        users.forEach( (currentUser, i) => {
            if (currentUser.id === removeId) {
                index = i;
            }
        })
        users.splice(index, 1);
        
        setUsers([...users]);
        
        setResponseMsg('Record deleted successfully');
        setTimeout(() => setResponseMsg('') , 4000);
    }

    return (
        <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [...users].reverse().map((user, index) => {
                        const { fName, lName, email } = user;
                        return (
                            <React.Fragment key={index}>
                                {
                                    (Object.keys(user).length > 0)
                                    ? <tr>
                                        <td>{(user.id)}</td>
                                        <td>{fName}</td>
                                        <td>{lName}</td>
                                        <td>{email}</td>
                                        <td>
                                            <Stack direction="horizontal" gap={2}>
                                                <Button type="button" as="a" variant="danger" data-remove={user.id} onClick={deleteUser}>Delete</Button>

                                                <Button as="b" variant="primary" data-remove={user.id} >Edit</Button>
                                            </Stack>
                                        </td>
                                    </tr>
                                    : <tr>
                                        <td className="txt-center" colSpan={5}>No Record Found</td>
                                    </tr>
                                }
                            </React.Fragment>
                        );
                    })}
                    {
                        (users.length < 1)
                        ? <tr>
                            <td className="txt-center" colSpan={5}>No Record Found</td>
                        </tr>
                        : ''
                    }
                </tbody>
            </Table>
    )
}

export default List;