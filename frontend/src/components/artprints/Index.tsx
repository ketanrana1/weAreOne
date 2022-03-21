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
                head={["Art to delite, nourish ", <br/>,  "and inspire us all!"]}
            />
            <div className="textbox-cont container">
                <h3>“Surround every child in an environment reflecting peace & harmony.”</h3>
                <p className="para">I love creating images that cultivate loving kindness towards ourselves, each other, all beings and planet Earth. Welcome to the gallery. <br/>Blessings, Jennifer </p>
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
