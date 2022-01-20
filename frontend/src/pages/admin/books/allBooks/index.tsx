import React, { useState, useEffect} from 'react'
import AdminLayout from 'components/admin/common/AdminLayout'
import { useRouter } from 'next/router';
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const initialResponseState: any = [];

export default function AllBooks(props) {
  
    const router = useRouter();
    const { AllBooks } = props;
    const [responseState, setResponseState] = useState(initialResponseState);

    async function handleDeleteClick(id: any) {

        try { 


            // const response = await axios.post(`${publicRuntimeConfig.backendBaseUrl}api/books/delete/${id}`);
            // setResponseState(response); 
            // return router.push(router.asPath) 

            const response : any = await axios({
                method: 'post',    
                url: `${publicRuntimeConfig.backendBaseUrl}api/books/delete/${id}`,
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
            <h3 className="mb-3">All Books</h3>
            <div className="response-cont">
                <h6>{responseState?.data?.message}</h6>  
            </div>
            <div className="row py-3">
                {AllBooks.map( (data:any, index) => {                       
                    return (
                        <div className="col-12 each-book" key={index}>
                            <h6>{data.book_name}</h6>
                            <div className="d-flex">
                                <p className="link-items">
                                    <span><a href={"/admin/books/editBook/?id=" + data.bookId}>Edit</a></span>                                  
                                    <span><a target="_blank" href={`/product/${data.slug}`}>View</a></span>
                                    <span className="link-item-red"><a onClick={() => handleDeleteClick(data.bookId)}>Delete</a></span>
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
     res = await axios.get(`${baseUrl}api/allBooks`);       
    } catch (error) {
        console.log(error);
    }   
    return {
      props: {
          //@ts-ignore
          AllBooks : res.data.response
      }, 
    }
  }
  

AllBooks.getLayout = function getLayout(page: any) {
    return (
      <AdminLayout>
            {page}
      </AdminLayout>
    )
  }
