import React from 'react'
import Link from 'next/link'

export default function AppImage(props) {
    return (
        <div className="sec-app-image container">
            <Link href={props.imgLink} >
                <a>
                    <div className="app-image-hover">
                        <figure>
                            <img src={props.imgUrl} />  
                        </figure>
                    </div>                
                </a> 
            </Link>                      
        </div>
    )
}
