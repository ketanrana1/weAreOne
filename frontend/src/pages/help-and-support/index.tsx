import React, { useState, useEffect } from 'react'
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

import LayoutNew from 'components/common/LayoutNew'

export default function HelpAndSupport() {

  const [response, setrespone] = useState([])

  const API = async () => {
      const { data } = await axios.get(`${publicRuntimeConfig.backendBaseUrl}api/pagecontent/helpAndSupport/`); 
      setrespone(data.response);
  }

  useEffect(() => {   
      API(); 
  },[]);


    return (
        <div className="container pt-4 p-md-5">
        <h1>Help and Support</h1>
        <div className="">
        {
            response?.map( (data:any, index) => {                       
                    return (
                        <div className="">
                            <div dangerouslySetInnerHTML={{__html: data.content}}></div>
                        </div>
                    );
                })
        }
        </div>
        </div>
        
    )
}

HelpAndSupport.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  }   
