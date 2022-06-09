import React, { useState } from 'react'
import ImageBanner from 'components/common/ImageBanner'
import Joi from "joi-browser";
import axios from 'axios';
import LayoutNew from 'components/common/LayoutNew';

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const initialState = { email: ""};


const initialResponseState: any = [];

const schema = {
    email: Joi.string().required(),

};
 

const Forgot = () => {

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);
    const [userdoesNotExistState, setUserdoesNotExistState] = useState('');
    const [userExistState, setUserExistState] = useState('');



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
        form.append('email', state.email);

        console.log("EMAIL", state.email )

        if(typeof validate() === 'undefined') {
            const baseUrl = process.env.BACKEND_BASE_URL; 

        try {
            const request : any = await axios({
            method: 'post',    
            url: `${publicRuntimeConfig.backendBaseUrl}api/userExists`,
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data'
            }            
            });
            setResponseState(request);
            if (request.data.userExists === true ) {
              setUserdoesNotExistState('')
              setUserExistState('A reset email has been sent. Please follow the link to change the password. ')
              
              const requestChangePassword : any = await axios({
                method: 'post',    
                url: `${publicRuntimeConfig.backendBaseUrl}api/changePassword`,
                data: form,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }            
                });

            } else {
              setUserdoesNotExistState('The user with the above email do not exists. Please enter a different email and proceed.')
              setUserExistState('')
            }

        } catch (error) {
            console.log(error)
        }

    }
      };

      const validateField = (name, value) => {
        const fieldObj = { [name]: value };
        const fieldSchema = { [name]: schema[name] };
        // console.log("fieldSchema", fieldSchema, fieldObj )
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
        <div className="contact-page mb-5">
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-4">
                  <h3 className="mb-3">Enter your Email</h3>
                  <input onChange={handleChange} type="email" placeholder="Email" name="email" />
                  <input onClick={handleSubmit} className="mt-3" type="submit" value="Send Password Reset Link" />
                  <p className="error mt-2" style={{color: "red"}}>{ userdoesNotExistState }</p>
                  <p className="error mt-2" style={{color: "green"}}>{ userExistState }</p>
                </div>
              </div>
              </div>
        </div>
    )
}


export default Forgot