import React, { useState } from 'react'
import Card from './common/Card'

function SectionFourCards(props) {

    const [imageChanger, setimageChanger] = useState("")
    const [imageLink, setimageLink] = useState("")

    let num = 1;

    return (
        <section className="secFourCards">
            <div className="container">
                <div className="row px-1 py-md-5">
                    {
                        props.loppData.map(item => {
                            return (
                                <div className={item.id === 11 ? "col-12 col-md-9 py-2 py-md-0" : "col-12 col-md-3 py-2 py-md-0"}>
                                    <Card 
                                    key={item.id}
                                    cardImgURL={item.cardImgURL}
                                    btnLink={item.btnLink}
                                    clickhandler = {()=> {
                                        setimageChanger(item.cardImgURL)
                                        setimageLink('planet-Project-bundle.zip')
                                    }}
                                    modalId="#printablesModalFour"
                                    />
                                    <h2 className="project-bundle-text">{item.title}</h2>
                                    <p className="project-bundle-text">{item.descp}</p> 
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            { imageChanger && imageLink && 
                <div className="modal fade printables-modal" id="printablesModalFour" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

export default SectionFourCards
