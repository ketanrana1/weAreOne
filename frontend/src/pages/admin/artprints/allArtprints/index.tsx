import React, { useState, useEffect} from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import { useRouter } from 'next/router';
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()   

const initialResponseState: any = [];       

export default function AllArtprints(props) {

    const router = useRouter();
    const { AllArtprints } = props 

    const [responseState, setResponseState] = useState(initialResponseState);

    async function handleDeleteClick(id: any) {
        try { 

            const response : any = await axios({
                method: 'post',    
                url: `${publicRuntimeConfig.backendBaseUrl}api/artprint/delete/${id}`,
                headers: {
                    'Authorization': `${sessionStorage.getItem('token')}`
                }            
                });
                setResponseState(response);
                return router.push(router.asPath) 
        } catch (error) {
            console.log(error);
        }
    }


    return (      
        <div className="all-books-cont">
            <h3 className="mb-3">All Artprints</h3>
            <div className="response-cont">
                <h6>{responseState?.data?.message}</h6>  
            </div>
            <div className="row py-3">
                {AllArtprints.map( (data:any, index) => {                       
                    return (
                        <div className="col-12 each-book mb-3" key={index}>
                            <h6>{data.art_name}</h6>
                            <p className="mb-2">Priority: {data.priority}</p>
                            <div className="d-flex">
                                <p className="link-items">
                                <span><a href={"/admin/artprints/editArtprint/?id=" + data.artId}>Edit</a></span>

                                <span><a target="_blank" href={`/product/artprints/${data.slug}`}>View</a></span>

                                <span className="link-item-red"><a onClick={() => handleDeleteClick(data.artId)}>Delete</a></span>
                                </p>
                            </div>
                        </div>
                    );
                })} 
            </div> 
            <div className="response-cont">
                <h6>{responseState?.data?.message}</h6> 
            </div>           
        </div>
    )
}   


export async function getServerSideProps(context) {

    const baseUrl = process.env.BACKEND_BASE_URL; 

    let res: any;

    try { 
     res = await axios.get(`${baseUrl}api/artprints/allArtprints`);       
    } catch (error) {
        console.log(error);
    }   
    return {
      props: {
          //@ts-ignore
          AllArtprints : res.data.response
      }, 
    }
  }
  

AllArtprints.getLayout = function getLayout(page: any) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
