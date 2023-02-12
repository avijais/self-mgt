import React, { useState } from "react";
import { Button, Form, Modal, Stack, Table } from "react-bootstrap";

function Crud() {
    // used to maintaine id state
    const [userId, setUserId] = useState( () => 0);

    // mode
    const [isEdit, setIsEdit] = useState(() => false);

    // users state
    const [users, setUsers] = useState( () => []);

    // all inout fields
    const [inputFields, setInputFields] = useState(() => {
        return { fName: '', lName: '', email: '', id: 1 };
    });

    // used to show field level error
    const [formErrors, setFormErrors] = useState(() => {
        return { fName: "", lName: "", email: "" };
    })

    // used to set form fields valid/invalid
    const [isFormFldValid, setIsFormFldValid] = useState(() => {
        return { fNameValid: false, lNameValid: false, emailValid: false, formValid: false };
    })

    // modal popup
    const [show, setShow] = useState(() => false);
    const handleClose = () => {
        setIsEdit(false);
        setShow(false);
    }

    // used to open add popup
    const handleShow = () => {
        setFormErrors({ fName: "", lName: "", email: "" });
        setIsFormFldValid({ fNameValid: false, lNameValid: false, emailValid: false, formValid: false });
        setResponseMsg('')
        setIsEdit(false);

        let newId = 1;
        if (userId) {
            newId = userId + 1;
        }

        setInputFields(prevState => {
            return { ...prevState, fName: '', lName: '', email: '', id: newId }
        });
        setShow(true);
    }

    // validate form
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'fName':
                isFormFldValid.fNameValid = value.length >= 1;
                formErrors.fName = isFormFldValid.fNameValid ? '' : 'First name is invalid';
                break;
            case 'lName':
                isFormFldValid.lNameValid = value.length >= 1;
                formErrors.lName = isFormFldValid.lNameValid ? '' : 'Last name is invalid';
                break;
            case 'email':
                isFormFldValid.emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                formErrors.email = isFormFldValid.emailValid ? '' : 'Email address is invalid';
                break;
            default:
                break;
        }

        setFormErrors(formErrors)
        setIsFormFldValid(isFormFldValid)
        validateForm();
    }

    // set form valid/invalid as another field valid/invalid
    const validateForm = () => {
        let isFormValid = (isFormFldValid.fNameValid && isFormFldValid.lNameValid && isFormFldValid.emailValid) ? true : false;
        setIsFormFldValid(pevState => {
            return { ...pevState, formValid: isFormValid }
        })
    }

    // set input field values
    const inputsHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputFields({ ...inputFields, [name]: value })
        validateField(name, value);
    }

    // used to show success message
    const [responseMsg, setResponseMsg] = useState( () => '');

    // add new user
    const submitForm = (e) => {
        e.preventDefault();
        validateForm();

        if (isFormFldValid.formValid) {
        // if (inputFields.fName && inputFields.lName && inputFields.email) {
            setInputFields(prevState => {
                return { ...prevState, id: prevState.id + 1 };
            });
            setUserId( prevId => prevId + 1);

            setUsers([...users, {...inputFields}]);

            setResponseMsg('Details added successfully');
            setTimeout(() => setResponseMsg('') , 4000);

            setShow(false);
            setInputFields(prevState => {
                return { fName: '', lName: '', email: '', id: prevState.id };
            });
        }
    }

    // set index which will use to update user data
    const [editIndex, setEditIndex] = useState( () => null);

    // set user details in the form for edit
    const setEditUser = (e) => {
        e.preventDefault();
        setFormErrors({ fName: "", lName: "", email: "" });
        setIsFormFldValid({ fNameValid: true, lNameValid: true, emailValid: true, formValid: true });
        setIsEdit(true);

        let index;
        users.forEach( (currentUser, i) => {
            if (currentUser.id === parseInt(e.target.dataset.remove)) {
                index = i;
            }
        })
        setEditIndex(index);
        setInputFields(users[index]);
        setShow(true);
    }

    // used to update user
    const updateRecord = (e) => {
        e.preventDefault();
        validateForm();
        if (inputFields.fName && inputFields.lName && inputFields.email) {
            users[editIndex].fName = inputFields.fName;
            users[editIndex].lName = inputFields.lName;
            users[editIndex].email = inputFields.email;
            setUsers([...users]);

            setResponseMsg('Details updated successfully');
            setTimeout(() => setResponseMsg('') , 4000);
            
            setShow(false);
            setInputFields(prevState => {
                return { fName: '', lName: '', email: '', id: prevState.id };
            });
        }
    }

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

    // used, to list the users in reverse order
    const reversedUser = [...users].reverse()

    return (
        <div className='container mt-5'>
            {/* heading and add button section */}
            <div className='mb-5'>
                <h1>
                    <span>Users</span>
                    <Button className="addBtn" variant="primary" onClick={handleShow}>Add</Button>
                </h1>
                
                {
                    (responseMsg.length > 0)
                    ? <div className="responsMsg green">{responseMsg}</div>
                    : ''
                }
                <hr />
            </div>

            {/* table used to list the users */}
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
                        reversedUser.map((user, index) => {
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
                                                <Button as="b" variant="primary" data-remove={user.id} onClick={setEditUser}>Edit</Button>
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

            {/* Form, used to add and edit user */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                    {
                        isEdit
                        ? 'Edit User'
                        : 'Add User'
                    }
                    </Modal.Title>
                    <br/>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="fName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fName"
                                value={inputFields.fName}
                                onChange={inputsHandler}
                                placeholder="Enter First Name"
                            />
                            {
                                (isFormFldValid.fNameValid)
                                ? ''
                                : <small className="error">{formErrors['fName']}</small>
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lName"
                                value={inputFields.lName}
                                onChange={inputsHandler}
                                placeholder="Enter Last Name"
                            />
                            {
                                (isFormFldValid.lNameValid)
                                ? ''
                                : <small className="error">{formErrors['lName']}</small>
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={inputFields.email}
                                onChange={inputsHandler}
                                placeholder="Enter Email address"
                            />
                            {
                                (isFormFldValid.emailValid)
                                ? ''
                                : <small className="error">{formErrors['email']}</small>
                            }
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {
                        isEdit
                        ?<Button disabled={!isFormFldValid.formValid} variant="primary" type="submit" onClick={updateRecord}>Update</Button>
                        :<Button disabled={!isFormFldValid.formValid} variant="primary" type="submit" onClick={submitForm}>Save</Button>

                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Crud