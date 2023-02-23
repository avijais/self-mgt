import { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SelfMgtContext } from "../../providers/SelfMgtContext";

function AddEditPlan({
    isShowPopup,
    closePopup,
    setIsShowPopup,
    plannings: plans,
    setPlannings,
    inputFields,
    setInputFields,
    setResponseMsg,
    isEdit,
    setFormErrors,
    setIsFormFldValid,
    isFormFldValid,
    formErrors}) {
    
    const [editIndex, setEditIndex, planId, setPlanId] = useContext(SelfMgtContext);

    // validate form
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'planType':
                isFormFldValid.planTypeValid = value.length >= 1;
                formErrors.planType = isFormFldValid.planTypeValid ? '' : 'Plan Type is invalid';
                break;
            case 'planFor':
                isFormFldValid.planForValid = value.length >= 1;
                formErrors.planFor = isFormFldValid.planForValid ? '' : 'Plan For is invalid';
                break;
            case 'amt':
                isFormFldValid.amtValid = value.length >= 1;
                // value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                formErrors.amt = isFormFldValid.amtValid ? '' : 'amt address is invalid';
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
        let isFormValid = (isFormFldValid.planTypeValid && isFormFldValid.planForValid && isFormFldValid.amtValid) ? true : false;
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
            // if (inputFields.planType && inputFields.planFor && inputFields.amt) {
            setInputFields(prevState => {
                return { ...prevState, id: prevState.id + 1 };
            });
            setPlanId( prevId => prevId + 1);

            setPlannings([...plans, {...inputFields}]);

            setResponseMsg('Details added successfully');
            setTimeout(() => setResponseMsg('') , 4000);

            setIsShowPopup(false);
            setInputFields(prevState => {
                return { planType: '', planFor: '', amt: '', id: prevState.id };
            });
        }
    }

    // used to update user
    const updateRecord = (e) => {
        e.preventDefault();
        validateForm();
        // console.log("plannings : ", plannings);
        // console.log("editIndex : ", editIndex);
        // console.log("plannings editIndex : ", plannings[editIndex]);
        if (inputFields.planType && inputFields.planFor && inputFields.amt) {
            plans[editIndex].planType = inputFields.planType;
            plans[editIndex].planFor = inputFields.planFor;
            plans[editIndex].amt = inputFields.amt;
            setPlannings([...plans]);

            setResponseMsg('Details updated successfully');
            setTimeout(() => setResponseMsg('') , 4000);
            
            setIsShowPopup(false);
            setInputFields(prevState => {
                return { planType: '', planFor: '', amt: '', id: prevState.id };
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
                        <Form.Group className="mb-3" controlId="planType">
                            <Form.Label>Plan Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="planType"
                                value={inputFields.planType}
                                onChange={inputsHandler}
                                placeholder="Enter Plan Type"
                            />
                            {
                                (isFormFldValid.planTypeValid)
                                ? ''
                                : <small className="error">{formErrors['planType']}</small>
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="planFor">
                            <Form.Label>Plan For</Form.Label>
                            <Form.Control
                                type="text"
                                name="planFor"
                                value={inputFields.planFor}
                                onChange={inputsHandler}
                                placeholder="Enter Plan For"
                            />
                            {
                                (isFormFldValid.planForValid)
                                ? ''
                                : <small className="error">{formErrors['planFor']}</small>
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="amt">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="text"
                                name="amt"
                                value={inputFields.amt}
                                onChange={inputsHandler}
                                placeholder="Enter Amount"
                            />
                            {
                                (isFormFldValid.amtValid)
                                ? ''
                                : <small className="error">{formErrors['amt']}</small>
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

export default AddEditPlan;