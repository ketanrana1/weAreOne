import React, { useState, useEffect } from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import Joi from "joi-browser";
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig() 

export async function getServerSideProps(context) {

    let res: any;
    const { id } = context.query;

    try { 
     res = await axios.get(`${publicRuntimeConfig.backendBaseUrl}api/artprints/singleArtprint/?id=${id}`);       
    } catch (error) {
        console.log(error);
    }   
    return {
      props: {
          //@ts-ignore
          singleArtprint: res.data.singleArtprint,
          ID : id
      }, 
    }
  }
 
const initialResponseState: any = [];

const schema = {

    art_name: Joi.string().required(),
    slug: Joi.string().required(),
    art_description: Joi.string().required(),
    art_description_usa: Joi.string().required(),
    size_small_price: Joi.any(),
    size_small_description: Joi.any(),
    size_large_price: Joi.any(),
    size_large_description: Joi.any(),
    size_xlarge_price: Joi.any(),
    size_xlarge_description: Joi.any(),
    priority: Joi.any()

};

export default function AddArtprint(props) { 

    const { singleArtprint, ID } = props

    const initialState = { art_name: singleArtprint[0].art_name, slug: singleArtprint[0].slug, art_description: singleArtprint[0].art_description, art_description_usa: singleArtprint[0].art_description_usa, size_small_price: singleArtprint[0].size_small_price, size_small_description: singleArtprint[0].size_small_description, size_large_price: singleArtprint[0].size_large_price, size_large_description: singleArtprint[0].size_large_description, size_xlarge_price: singleArtprint[0].size_xlarge_price, size_xlarge_description: singleArtprint[0].size_xlarge_description, priority: singleArtprint[0].priority, art_image_1_name: singleArtprint[0].art_image_1_name, art_image_2_name: singleArtprint[0].art_image_2_name, art_image_3_name: singleArtprint[0].art_image_3_name, art_image_4_name: singleArtprint[0].art_image_4_name};


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

        form.append('art_name', state.art_name);
        form.append('slug', state.slug);
        form.append('art_description', state.art_description);
        form.append('art_description_usa', state.art_description_usa);
        form.append('size_small_price', state.size_small_price);
        form.append('size_small_description', state.size_small_description);
        form.append('size_large_price', state.size_large_price);
        form.append('size_large_description', state.size_large_description);
        form.append('size_xlarge_price', state.size_xlarge_price);
        form.append('size_xlarge_description', state.size_xlarge_description);
        form.append('priority', state.priority);

        try {
            const request : any = await axios({
            method: 'post',    
            url: `${publicRuntimeConfig.backendBaseUrl}api/artprints/editArtprint/?id=${ID}`,
            data: form,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${sessionStorage.getItem('token')}`
            }            
            });
            setResponseState(request);
        } catch (error) {
            console.log(error)
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
                <h3 className="mb-3">Edit ArtPrint</h3>
                <div className="response-cont">
                    <h6>{responseState?.data?.message}</h6> 
                </div>
                <form className="mt-3" onSubmit={handleSubmit} encType="multipart/form-data">

                    <div className="form-group">
                        <label >Art Name</label>
                        <input name="art_name" type="text" className="form-control" onChange={handleChange} value={state.art_name} />
                        {errors && <small>{errors.art_name}</small>}
                    </div>

                    <div className="form-group">
                        <label >Slug</label>
                        <input name="slug" type="text" className="form-control" onChange={handleChange} value={state.slug} />
                        {errors && <small>{errors.slug}</small>}
                    </div>

                    <div className="form-group">
                        Current Image One<br/>
                        <img src={ state.art_image_1_name } style={{ maxWidth: "200px"}} />
                    </div>

                    <div className="form-group">
                        Current Image Two<br/>
                        <img src={ state.art_image_2_name } style={{ maxWidth: "200px"}} />
                    </div>

                    <div className="form-group">
                        Current Image Three<br/>
                        <img src={ state.art_image_3_name } style={{ maxWidth: "200px"}} />
                    </div>

                    <div className="form-group">
                        Current Image Four<br/>
                        <img src={ state.art_image_4_name } style={{ maxWidth: "200px"}} />
                    </div>

                    <div className="form-group">
                        <label >Price for size Small</label> 
                        <input name="size_small_price" type="number" className="form-control" onChange={handleChange} value={state.size_small_price}/>
                        {errors && <small>{errors.size_small_price}</small>}
                    </div>
                    <div className="form-group">
                        <label >Description for size Small</label> 
                        <input name="size_small_description" type="text" className="form-control" onChange={handleChange} value={state.size_small_description}/>
                        {errors && <small>{errors.size_small_description}</small>}
                    </div>
                    <div className="form-group">
                        <label >Price for size Large</label> 
                        <input name="size_large_price" type="number" className="form-control" onChange={handleChange} value={state.size_large_price}/>
                        {errors && <small>{errors.size_large_price}</small>}
                    </div>
                    <div className="form-group">
                        <label >Description for size Large</label> 
                        <input name="size_large_description" type="text" className="form-control" onChange={handleChange} value={state.size_large_description}/>
                        {errors && <small>{errors.size_large_description}</small>}
                    </div>
                    <div className="form-group">
                        <label >Price for size Xlarge</label> 
                        <input name="size_xlarge_price" type="number" className="form-control" onChange={handleChange} value={state.size_xlarge_price}/>
                        {errors && <small>{errors.size_xlarge_price}</small>}
                    </div>
                    <div className="form-group">
                        <label >Description for size Xlarge</label> 
                        <input name="size_xlarge_description" type="text" className="form-control" onChange={handleChange} value={state.size_xlarge_description}/>
                        {errors && <small>{errors.size_xlarge_description}</small>}
                    </div>

                    <div className="form-group">
                        <label >Content</label><br/>
                        <textarea className="form-control" rows={10} id="story" name="art_description" style={{width: "100%"}} onChange={handleChange} value={state.art_description}> </textarea>
                        {errors && <small>{errors.art_description}</small>}
                    </div>

                    <div className="form-group">
                        <label >Content USA</label><br/>
                        <textarea className="form-control" rows={10} id="story" name="art_description_usa" style={{width: "100%"}} onChange={handleChange} value={state.art_description_usa}> </textarea>
                        {errors && <small>{errors.art_description_usa}</small>}
                    </div>

                    <div className="form-group">
                        <label >Priority</label> 
                        <input name="priority" type="number" className="form-control" onChange={handleChange} value={state.priority}/>
                        {errors && <small>{errors.priority}</small>}
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

AddArtprint.getLayout = function getLayout(page) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
