import React, { useState } from 'react'
import ImageBanner from 'components/common/ImageBanner'
import Joi from "joi-browser";
import axios from 'axios';

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const initialState = { first_name: "", last_name: "", email: "", enquiry: "" };


const initialResponseState: any = [];

const schema = {

    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    enquiry: Joi.string().required()

};
 

const Forgot = () => {

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(state, schema, options);
        const errorsObj = {};
        if (!error) return;
        for (let detail of error.details) {
          const { path, message } = detail;
          errorsObj[path[0]] = message;
        }
        return errorsObj;
      };




      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate());

           

        let form = new FormData();

        form.append('first_name', state.first_name);
        form.append('last_name', state.last_name);
        form.append('email', state.email);
        form.append('enquiry', state.enquiry);

        if(typeof validate() === 'undefined') {
            const baseUrl = process.env.BACKEND_BASE_URL; 

        try {
            const request : any = await axios({
            method: 'post',    
            url: `${publicRuntimeConfig.backendBaseUrl}api/contact`,
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data'
            }            
            });
            setResponseState(request);
        } catch (error) {
            console.log(error)
        }

    }
      };


      const validateField = (name, value) => {
        const fieldObj = { [name]: value };
        const fieldSchema = { [name]: schema[name] };
        const { error } = Joi.validate(fieldObj, fieldSchema);
        const { message } = error?.details[0] || {};
        return error ? message : null;
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
      };







    return (
        <div className="contact-page">
            <h1>Test</h1>
        </div>
    )
}

export default Forgot
