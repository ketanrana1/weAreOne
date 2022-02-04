
import React, { useState } from 'react'
import Card from './common/Card'

function SectionTopCards(props) {

    const [imageChanger, setimageChanger] = useState("")
    const [imageLink, setimageLink] = useState("")

    return (
        <section className="topCardsCont">
            <div className="container px-3 px-md-0 py-2">
                <div className="row justify-content-center">
                    {
                        props.loopData && props.loopData.map(item => {
                            return (
                                <div className="col-6 col-md-6 px-md-5 py-2 py-md-4">
                                    <Card 
                                    key={item.id}
                                    cardImgURL={item.cardImgURL}
                                    btnLink={item.btnLink}
                                    clickhandler = {()=> {
                                        setimageChanger(item.cardImgURL)
                                        setimageLink(item.btnLink)
                                    }}
                                    modalId="#printablesModalTop"
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            { imageChanger && imageLink && 
                <div className="modal fade printables-modal" id="printablesModalTop" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <a href ={imageLink} target="_blank">Download </a>
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

export default SectionTopCards
