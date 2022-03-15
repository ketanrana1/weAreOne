import React from 'react'
import Link from 'next/link'

export default function ArtPrints(props) {
    return (
        <div className="section-art-prints txt-on-img-cont container">
            <img src={props.imgUrl} />
                <div className="text-cont">
                    <h2>{props.heading}</h2>
                    <Link href={props.btnUrl} >
                        <a className="button-common">{props.btnText}</a>
                    </Link>                   
                </div>         
        </div>
    )
}
