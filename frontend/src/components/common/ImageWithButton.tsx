import React from 'react'
import Link from 'next/link'

export default function ImageWithButton(props) {
    return (
        <div className="image-with-button">
            <img className="book-img" src={props.imgUrl} />
            <div className="btn-cont">
                <img src="/assets/images/heart.png" />
                <Link href={props.btnLnkUrl} >
                    <a className="button-common-new">BUY NOW</a>
                </Link>
            </div> 
        </div>


    )
}
