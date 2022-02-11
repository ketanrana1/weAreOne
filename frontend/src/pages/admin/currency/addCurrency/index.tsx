import React, { useState, useEffect } from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import Joi from "joi-browser";
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig() 
 

const initialState = {aud_price: ""};


const initialResponseState: any = [];

const schema = {

    aud_price: Joi.any(),
};

export default function AddCurrency() { 

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(null);
    const [responseState, setResponseState] = useState(initialResponseState);




    //RESPONSE

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

           
        if(typeof validate() === 'undefined') {
          
        try {
          
            const request : any = await axios({
            method: 'POST',  
            url: `${publicRuntimeConfig.backendBaseUrl}api/addAudPrice`,
            data: state,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${sessionStorage.getItem('token')}`
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
            <div className="admin-cmmn-frm addBook-form">
                <h3 className="mb-3">Add AUD PRICE</h3>
                <div className="response-cont">
                    <h6>{responseState?.data?.message}</h6> 
                </div>
                <form className="mt-3" onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label >AUD Price</label>
                        <input name="aud_price" type="number" className="form-control" onChange={handleChange} value={state.aud_price} />
                        {errors && <small>{errors.aud_price}</small>}
                    </div>                  
                
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div> 
                                       
                </form>
                <div className="response-cont">
                    <h6>{responseState?.data?.message}</h6>
                </div>               
            </div>
    )
}

AddCurrency.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
