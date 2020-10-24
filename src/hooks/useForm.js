import {useState, useEffect } from 'react';

export default function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        if(initialValues){
            setValues(initialValues);
        }
    },[initialValues])

    function handleInputChange(e){
        setValues({...values, [e.target.name]: e.target.value})
    }

    function bindInput(name){
        return {
            name,
            onChange: handleInputChange,
            value: values?.[name] ?? ''
        }
    }

    function handleOptionChange(e){
        setValues({...values, [e.target.value]: e.target.value})
    }

    function bindOption(name){
        return {
            name,
            onChange: handleOptionChange,
            value: values?.[name] ?? ''
        }
    }   

    return {
        values, 
        handleInputChange,
        bindInput,
        bindOption
    };
}

