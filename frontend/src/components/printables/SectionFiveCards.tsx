import React, { useState } from 'react'
import Card from './common/Card'

function SectionFiveCards(props) {

    const [imageChanger, setimageChanger] = useState("")
    const [imageLink, setimageLink] = useState("")

    return (
        <section className="secFiveCards">
            <div className="container">
                <div className="row d-flex px-1 py-5 py-md-5">
                    <div className="col-12 col-sm-8 mb-4 mb-sm-0 py-md-4 py-md-0 top-cont">
                        <Card 
                            cardImgURL="/assets/images/printable-sec-5-img-1.png" 
                            btnLink="/assets/images/printable-sec-5-img-1.png" 
                            clickhandler = {()=> {
                                setimageChanger('/assets/images/printable-sec-5-img-1.png')
                                setimageLink('/assets/images/printable-sec-5-img-1.png')
                            }}
                            modalId="#printablesModalFive"
                        />
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="row d-flex new-bottm-cont">
                            <div className="col-12 mb-4 mb-sm-0 px-md-5 py-md-4 py-md-0">
                                <Card 
                                key={props.loopData[0].id}
                                cardImgURL={props.loopData[0].cardImgURL}
                                btnLink={props.loopData[0].btnLink}
                                clickhandler = {()=> {
                                    setimageChanger(props.loopData[0].cardImgURL)
                                    setimageLink(props.loopData[0].btnLink)
                                }}
                                modalId="#printablesModalFive"
                                />
                            </div>
                            <div className="col-12 mb-4 mb-sm-0 px-md-5 py-md-4 py-md-0">
                                <Card 
                                key={props.loopData[1].id}
                                cardImgURL={props.loopData[1].cardImgURL}
                                btnLink={props.loopData[1].btnLink}
                                clickhandler = {()=> {
                                    setimageChanger(props.loopData[1].cardImgURL)
                                    setimageLink(props.loopData[1].btnLink)
                                }}
                                modalId="#printablesModalFive"
                                />
                            </div>
                            <div className="col-12 mb-4 mb-sm-0 px-md-5 py-md-4 py-md-0">
                                <Card 
                                    key={props.loopData[2].id}
                                    cardImgURL={props.loopData[2].cardImgURL}
                                    btnLink={props.loopData[2].btnLink}
                                    clickhandler = {()=> {
                                        setimageChanger(props.loopData[2].cardImgURL)
                                        setimageLink(props.loopData[2].btnLink)
                                    }}
                                    modalId="#printablesModalFive"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 ">
                        <div className="row d-flex new-bottm-cont">
                            {/* <div className="col-12 px-md-5 py-md-4 py-md-0">
                                <Card 
                                    key={props.loopData[2].id}
                                    cardImgURL={props.loopData[2].cardImgURL}
                                    btnLink={props.loopData[2].btnLink}
                                    clickhandler = {()=> {
                                        setimageChanger(props.loopData[2].cardImgURL)
                                        setimageLink(props.loopData[2].btnLink)
                                    }}
                                    modalId="#printablesModalFive"
                                />
                            </div> */}
                            {/* <div className="col-12 px-md-5 py-md-4 py-md-0 last-img-cont">
                                <Card 
                                key={props.loopData[3].id}
                                cardImgURL={props.loopData[3].cardImgURL}
                                btnLink={props.loopData[3].btnLink}
                                clickhandler = {()=> {
                                    setimageChanger(props.loopData[3].cardImgURL)
                                    setimageLink(props.loopData[3].btnLink)
                                }}
                                modalId="#printablesModalFive"
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            { imageChanger && imageLink && 
                <div className="modal fade printables-modal" id="printablesModalFive" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body art-prints-modal">
                                <img src={imageChanger} />
                                <div className="btmCont">
                                    <button type="button" className="btmButton">
                                        <a href ={imageLink} download={imageLink}>Download </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }      
        </section>
    )
}

export default SectionFiveCards
