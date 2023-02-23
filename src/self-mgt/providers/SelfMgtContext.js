import { createContext, useState } from "react";

export const SelfMgtContext = createContext();

export const SelfMgtProvider = props => {
    // it will use to set plan for edit
    const [editIndex, setEditIndex] = useState( () => null);

    // it will use to manage the plan id
    const [planId, setPlanId] = useState( () => 0);

    return (
        <SelfMgtContext.Provider value={[
            editIndex, setEditIndex,
            planId, setPlanId
        ]}>
            {props.children}
        </SelfMgtContext.Provider>
    )
}