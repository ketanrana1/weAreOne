import React, {useState, useEffect} from 'react'
import Banner from 'components/artprints/Banner'
import ImageText from './ImageText'
import ModalImage from './ModalImage'
import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export default function Index() {

    const [imageChanger, setimageChanger] = useState("")
    const [imageLink, setimageLink] = useState("")

    const [response, setresponse] = useState([])

    const API = async () => {
        const { data } = await axios.get(`${publicRuntimeConfig.backendBaseUrl}api/artprints/allArtprints`);
        const newData = data.response.sort((a, b) => a.priority - b.priority);
        setresponse(newData)
    }

    useEffect(() => {    
        API(); 
    },[]);
     
    return (
        <div className="art-prints-cont">
            <Banner 
                imgUrl="/assets/images/artprints-banner-min.png" 
                head={["Art to delight, nourish ", <br/>,  "and inspire us all!"]}
            />
            <div className="textbox-cont container">
                <h3 className="art-print-hd-top"><strong>"May every child’s environment reflect peace & harmony."</strong></h3>
                <p className="para text-font-color-blue art-print-hd-top">I love creating images that cultivate loving kindness.<br/> Welcome to the gallery.</p>
            </div>
            <div className="images-text-cont container">
                <div className="row justify-content-evenly">
                { 
                    response?.map( (data:any, index) => { 
                        
                    const artprintLink = `/product/artprints/${data.slug}`;
                        return (
                            <ImageText 
                                key={data.artId}
                                imgUrl={data.art_image_1_name}
                                head={data.art_name}
                                artprintLink={artprintLink}
                            />
                        );
                    })
                }
                </div>
            </div>
        </div>
    )
}
