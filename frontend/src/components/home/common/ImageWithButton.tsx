import React from 'react'
import Link from 'next/link'
import LazyLoad from 'react-lazy-load';

export default function ImageWithButton(props) {
    return (
        <div className="image-with-button">
            <img className="book-img" src={props.imgUrl} />
            <div className="btn-cont">
            <LazyLoad>
                <img src="/assets/images/heart.png" />
            </LazyLoad>
                <Link href={props.btnLnkUrl} scroll={true} >
                    <a className="button-common-new">BUY NOW</a>
                </Link>
            </div>    
        </div>
    )
}
