import React from 'react'
import LazyLoad from 'react-lazy-load';

export default function Banner(props) {
    return (
        <div className="art-prints-banner">
            <LazyLoad>
                <img src={props.imgUrl} />
            </LazyLoad>          
            <h2>{props.head}</h2>           
        </div>
    )
}
