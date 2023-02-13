import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
    // used to maintaine id state
    const [userId, setUserId] = useState( () => 0);

    // all inout fields
    const [inputFields, setInputFields] = useState(() => {
        return { fName: '', lName: '', email: '', id: 1 };
    });

    // array users having each user object
    const [users, setUsers] = useState([]);

    // boolean state to show/hide popup
    const [isShowPopup, setIsShowPopup] = useState(false);

    // handling the opening of popup
    const openPopup = () => {
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
        
        setIsShowPopup(true);
    }

    // handling the closing of popup
    const closePopup = () => {
        setIsShowPopup(false);
    }

    // used to show success message
    const [responseMsg, setResponseMsg] = useState( () => '');

    // used to show field level error
    const [formErrors, setFormErrors] = useState(() => {
        return { fName: "", lName: "", email: "" };
    })

    // used to set form fields valid/invalid
    const [isFormFldValid, setIsFormFldValid] = useState(() => {
        return { fNameValid: false, lNameValid: false, emailValid: false, formValid: false };
    })

    // set isEdit mode
    const [isEdit, setIsEdit] = useState(() => false);

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

    // set index which will use to update user data
    const [editIndex, setEditIndex] = useState( () => null);

    return(
        <UserContext.Provider value={[
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
        ]}>
            {props.children}
        </UserContext.Provider>
    )
}