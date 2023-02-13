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
        responseMsg, setResponseMsg
    ] = useContext(UserContext);

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

    // add new user
    const submitForm = (e) => {
        e.preventDefault();
        validateForm();

        if (isFormFldValid.formValid) {
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
                    <Button disabled={!isFormFldValid.formValid} variant="primary" type="submit" onClick={submitForm}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddEditUser;