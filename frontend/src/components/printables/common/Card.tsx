import React from 'react'

function Card(props) {

    const {imgUrl, head, clickhandler } = props

    return (
        <div className="cardCont">
            <img className="cardImg" onClick={clickhandler} src={props.cardImgURL} data-toggle="modal" data-target={props.modalId} />
            {/* <div className="btmCont">
                <button type="button" className="btmButton">
                    <a href ={props.btnLink} target="_blank">Download </a>
                </button>
            </div>    */}
        </div>
    )
}

export default Card 
