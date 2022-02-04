import React, { useState } from 'react'
import Card from './common/Card'

function SectionThreeCards(props) {

    const [imageChanger, setimageChanger] = useState("")
    const [imageLink, setimageLink] = useState("")

    return (
        <section className="secThreeCards">
            <div className="container">
                <div className="row px-1 py-5">
                    {
                        props.loopData.map(item => {
                            return(
                                <div className="col-6 col-md-3 px-3 px-md-4 py-2 py-md-4">
                                    <Card 
                                    key={item.id}
                                    cardImgURL={item.cardImgURL}
                                    btnLink={item.btnLink}
                                    clickhandler = {()=> {
                                        setimageChanger(item.cardImgURL)
                                        setimageLink(item.btnLink)
                                    }}
                                    modalId="#printablesModalThree"
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            { imageChanger && imageLink && 
                <div className="modal fade printables-modal" id="printablesModalThree" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

export default SectionThreeCards
