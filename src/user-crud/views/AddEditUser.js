import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UserContext } from "../provider/UserContext";

function AddEditUser() {
    const [
        userId, setUserId,
        users, setUsers,
        isShowPopup, setIsShowPopup,
        openPopup,
        closePopup,
        responseMsg, setResponseMsg,
        inputFields, setInputFields,
        formErrors, setFormErrors,
        isFormFldValid, setIsFormFldValid,
        isEdit, setIsEdit,
        validateField, validateForm,
        inputsHandler,
        editIndex, setEditIndex
    ] = useContext(UserContext);

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

            setIsShowPopup(false);
            setInputFields(prevState => {
                return { fName: '', lName: '', email: '', id: prevState.id };
            });
        }
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
            
            setIsShowPopup(false);
            setInputFields(prevState => {
                return { fName: '', lName: '', email: '', id: prevState.id };
            });
        }
    }

    return (
        <>
            {/* Form, used to add and edit user */}
            <Modal
                show={isShowPopup}
                onHide={closePopup}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                    User
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
                    <Button variant="secondary" onClick={closePopup}>
                        Cancel
                    </Button>
                    {
                        isEdit
                        ?<Button disabled={!isFormFldValid.formValid} variant="primary" type="submit" onClick={updateRecord}>Update</Button>
                        :<Button disabled={!isFormFldValid.formValid} variant="primary" type="submit" onClick={submitForm}>Save</Button>

                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddEditUser;