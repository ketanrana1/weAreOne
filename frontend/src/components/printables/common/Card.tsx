import React from 'react'
import LazyLoad from 'react-lazy-load';

function Card(props) {

    const {imgUrl, head, clickhandler } = props

    return (
        <div className="cardCont">
            <LazyLoad>
                <img className="cardImg" onClick={clickhandler} src={props.cardImgURL} data-toggle="modal" data-target={props.modalId} />
            </LazyLoad>           
            {/* <div className="btmCont">
                <button type="button" className="btmButton">
                    <a href ={props.btnLink} target="_blank">Download </a>
                </button>
            </div>    */}
        </div>
    )
}

export default Card 
