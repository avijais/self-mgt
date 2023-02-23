import React, { useContext } from "react";
import { Button, Stack, Table } from "react-bootstrap";
import { SelfMgtContext } from "../../providers/SelfMgtContext";

function ListPlanning({
    setIsShowPopup,
    plannings: plans,
    setPlannings,
    setInputFields,
    responseMsg,
    setResponseMsg,
    setIsEdit,
    setFormErrors,
    setIsFormFldValid
}) {

    // index which will use to set plan for edit
    const [editIndex, setEditIndex, planId] = useContext(SelfMgtContext)
    
    // delete plan
    const deletePlan = (e) => {
        e.preventDefault();
        const removeId = parseInt(e.target.dataset.remove);
        let index;
        plans.forEach((currentUser, i) => {
            if (currentUser.id === removeId) {
                index = i;
            }
        })
        plans.splice(index, 1);

        setPlannings([...plans]);

        setResponseMsg('Record deleted successfully');
        setTimeout(() => setResponseMsg(''), 4000);
    }

    // set plan details in the form for edit
    const setEditPlan = (e) => {
        e.preventDefault();
        setFormErrors({ planType: "", planFor: "", amt: "" });
        setIsFormFldValid({ planTypeValid: true, planForValid: true, amtValid: true, formValid: true });
        setIsEdit(true);

        let index;
        plans.forEach((currentPlan, i) => {
            if (currentPlan.id === parseInt(e.target.dataset.remove)) {
                index = i;
            }
            console.log("index : ", index)
        })
        setInputFields(plans[index]);
        setIsShowPopup(true);
        console.log("index : ", index)
        setEditIndex(index);
    }

    // handling the opening of popup
    const openPopup = () => {
        // setFormErrors({ planType: "", planFor: "", amt: "" });
        // setIsFormFldValid({ planTypeValid: false, planForValid: false, amtValid: false, formValid: false });
        setResponseMsg('')
        setIsEdit(false);

        let newId = 1;
        if (planId) {
            newId = planId + 1;
        }
        setInputFields(prevState => {
            return { ...prevState, planType: '', planFor: '', amt: '', id: newId }
        });
        
        setIsShowPopup(true);
    }

    return (
        <>
            {/* heading and add button section */}
            <div className='mb-5'>
                <h1>
                    <span>Planning</span>
                    <Button className="addBtn" variant="primary" onClick={openPopup}>Add</Button>
                </h1>
                { responseMsg
                    ?  <div className="responsMsg green">{responseMsg}</div>
                    : ""
                }
                <hr />
            </div>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Plan Type</th>
                    <th>Plan For</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    [...plans].reverse().map((plan, index) => {
                        const { planType, planFor, amt } = plan;
                        return (
                            <React.Fragment key={index}>
                                {
                                    (Object.keys(plan).length > 0)
                                        ? <tr>
                                            <td>{(plan.id)}</td>
                                            <td>{planType}</td>
                                            <td>{planFor}</td>
                                            <td>{amt}</td>
                                            <td>
                                                <Stack direction="horizontal" gap={2}>
                                                    <Button type="button" as="a" variant="danger" data-remove={plan.id} onClick={deletePlan}>Delete</Button>

                                                    <Button as="b" variant="primary" data-remove={plan.id} onClick={setEditPlan}>Edit</Button>
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
                    (plans.length < 1)
                        ? <tr>
                            <td className="txt-center" colSpan={5}>No Record Found</td>
                        </tr>
                        : ''
                }
            </tbody>
        </Table>
        </>
    )
}

export default ListPlanning;