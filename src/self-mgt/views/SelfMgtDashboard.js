import { useState } from "react";
import { SelfMgtProvider } from "../providers/SelfMgtContext";
import AddEditPlan from "./planner/AddEditPlan";
import ListPlanning from "./planner/ListPlanning";

function SelfMgtDashboard() {
    const [plannings, setPlannings] = useState([
        // { planType: "plan type", planFor: "plan for health insurance", amt: 20000, id: 1}
    ]);

    // all inout fields
    const [inputFields, setInputFields] = useState(() => {
        return { planType: '', planFor: '', amt: '', id: 1 };
    });

    // boolean state to show/hide popup
    const [isShowPopup, setIsShowPopup] = useState(false);

    // used to show success message
    const [responseMsg, setResponseMsg] = useState( () => '');

    // handling the closing of popup
    const closePopup = () => {
        setIsShowPopup(false);
    }

    // set isEdit mode
    const [isEdit, setIsEdit] = useState(() => false);

    // used to show field level error
    const [formErrors, setFormErrors] = useState(() => {
        return { planType: "", planFor: "", amt: "" };
    })

    // used to set form fields valid/invalid
    const [isFormFldValid, setIsFormFldValid] = useState(() => {
        return { planTypeValid: false, planForValid: false, amtValid: false, formValid: false };
    })

    return (
        <SelfMgtProvider>
            <div className='container mt-5'>
                <ListPlanning
                    setIsShowPopup={setIsShowPopup}
                    plannings={plannings}
                    setPlannings={setPlannings}
                    setInputFields={setInputFields}
                    responseMsg={responseMsg}
                    setResponseMsg={setResponseMsg}
                    setIsEdit={setIsEdit}
                    setFormErrors={setFormErrors}
                    setIsFormFldValid={setIsFormFldValid}
                />
                <AddEditPlan
                    isShowPopup={isShowPopup}
                    closePopup={closePopup}
                    setIsShowPopup={setIsShowPopup}
                    plannings={plannings}
                    setPlannings={setPlannings}
                    inputFields={inputFields}
                    setInputFields={setInputFields}
                    setResponseMsg={setResponseMsg}
                    isEdit={isEdit}
                    setFormErrors={setFormErrors}
                    setIsFormFldValid={setIsFormFldValid}
                    isFormFldValid={isFormFldValid}
                    formErrors={formErrors}
                />
            </div>
        </SelfMgtProvider>
    )
}

export default SelfMgtDashboard;