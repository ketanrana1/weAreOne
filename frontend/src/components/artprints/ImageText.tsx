import React, { useState } from 'react'
import Link from 'next/link'
import LazyLoad from 'react-lazy-load';



export default function ImageText(props) {

    const {imgUrl, head, artprintLink } = props

    return (
        <div className="col-12 col-md-5 mb-5 p-md-0 each-image-cont">
            <a href={artprintLink}> 
                <LazyLoad>
                    <img src={imgUrl} />
                </LazyLoad>               
                <h3>{head}</h3>
            </a>           
        </div>
    )
}
    