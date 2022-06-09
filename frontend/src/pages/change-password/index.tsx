import React, { useState } from 'react'
import ImageBanner from 'components/common/ImageBanner'
import Joi from "joi-browser";
import axios from 'axios';
import LayoutNew from 'components/common/LayoutNew';

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import { useRouter } from 'next/router'
import jwt_decode from "jwt-decode";



const initialState = { email: "", password: "", confirm_password: ""};


const initialResponseState: any = [];

const schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().required()

};
 

export default function Changepassword(props) {

  const router = useRouter()
  const { token }: any = router.query

  if(typeof token === "undefined") return <></>;

    var decoded: any = jwt_decode( token );
    if( ( decoded.secret !== publicRuntimeConfig.forgotPasswordSecretKey ) || ( ( new Date(decoded.exp*1000).getTime() + 86400 )  < new Date().getTime() ) ) {
      router.push('/')
    }

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);
    const [ successState, setSuccessState ] = useState(false);
    const [ falseEmailState, setFalseEmailState ] = useState(false);
    const [ passwordMatchesState, setPasswordMatchesState ] = useState(false);


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

        if( state.password !== state.confirm_password ) {
          alert("The two passwords entered do not match. Please confirm the password and try again.");
          return
        } 

        let form = new FormData();
        form.append('email', state.email);
        form.append('password', state.password);
        form.append('confirm_password', state.confirm_password);

        if(typeof validate() === 'undefined') {
            const baseUrl = process.env.BACKEND_BASE_URL; 

        try {
            const request : any = await axios({
            method: 'post',    
            url: `${publicRuntimeConfig.backendBaseUrl}api/confirmChangePassword`,
            data: form,
            headers: {
              'Content-Type': 'multipart/form-data'
            }            
            });
            setResponseState(request);
            if ( request.data.passwordUpdated === true) {
              setSuccessState(true)
              setFalseEmailState(false)
            } else {
              setFalseEmailState(true)
              setSuccessState(false)
            }

        } catch (error) {
            console.log(error)
        }

    }
      };

      const validateField = (name, value) => {
        const fieldObj = { [name]: value };
        const fieldSchema = { [name]: schema[name] };
        console.log("fieldSchema", fieldSchema, fieldObj )
        const { error } = Joi.validate(fieldObj, fieldSchema);
        const { message } = error?.details[0] || {};
        return error ? message : null;
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
        if(state.password == state.confirm_password) {
          setPasswordMatchesState(true);
        }
      };
 

    return (
        <div className="contact-page mb-5">
            <div className="container mt-5">
              <div className="row">
                <div className="col-12 col-md-4">
                  <h3 className="mb-3">Change your password</h3>
                  <input onChange={handleChange} type="email" placeholder="Enter Email" name="email" />
                  <input className="mt-3" onChange={handleChange} type="password" placeholder="Enter Password" name="password" />
                  <input className="mt-3" onChange={handleChange} type="password" placeholder="Confirm Password" name="confirm_password" />
                  <input onClick={handleSubmit} className="mt-3" type="submit" value="Submit" />
                  <div className="mt-3" style={{display: successState ? "block" : "none"}}><p>Your password has been changed.<a href="/login" style={{textDecoration: "underline"}}> Click here to login.</a></p></div>
                  <div className="mt-3" style={{display: falseEmailState ? "block" : "none" }}><p style={{color: "red"}}>The email you entered is not registered. Please enter the corrrect email and proceed. </p></div>
                </div>
              </div>
              </div>
        </div>
    )
}


Changepassword.getLayout = function getLayout(page) {
  return (
      <LayoutNew>
          {page}
      </LayoutNew>
  )
}  
