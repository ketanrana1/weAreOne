import React, { useState } from 'react'
import Card from './common/Card'

function SectionTwoCards(props) {

    const [imageChanger, setimageChanger] = useState("")
    const [imageLink, setimageLink] = useState("")

    return (
        <section className="secTwoCards">
            <div className="container">
                <div className="row px-1 py-md-5">
                    {
                        props.loopDataTwo && props.loopDataTwo.map(item => {
                            return (
                                <div className="col-6 col-md-3 px-md-4 py-2 py-md-4 justify-content-center">
                                    <Card 
                                    key={item.id}
                                    cardImgURL={item.cardImgURL}
                                    btnLink={item.btnLink}
                                    clickhandler = {()=> {
                                        setimageChanger(item.cardImgURL)
                                        setimageLink(item.btnLink)
                                    }}
                                    modalId="#printablesModalTwo"
                                    />
                                </div>
                            );
                        })
                    }
                    <div className="col-12 pt-5">
                        <Card 
                            cardImgURL="/assets/images/Long-colouring-in.jpg" 
                            btnLink="/assets/images/Long-colouring-in.jpg" 
                            clickhandler = {()=> {
                                setimageChanger('/assets/images/Long-colouring-in.jpg')
                                setimageLink('/assets/images/Long-colouring-in.jpg')
                            }}
                            modalId="#printablesModalTwo"
                        />
                    </div>                
                </div>
                { imageChanger && imageLink && 
                <div className="modal fade printables-modal" id="printablesModalTwo" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <a href ={imageLink} download={imageLink}>Download</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }  
            </div>
        </section>
    )
}

export default SectionTwoCards
