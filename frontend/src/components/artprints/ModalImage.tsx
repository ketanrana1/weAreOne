import React, { useState } from 'react'
import Link from 'next/link'

export default function ModalImage(props) {

    const [modalState, setModalState] = useState('')

    function handleImageClick() {
        setModalState('none')
    }
   
    return ( 
        <>  
            <div className="modal fade" style={{display: modalState}} id="artPrintsModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body art-prints-modal">
                            <a href={props.imgLink}>
                                <img src={props.imgUrl} />
                            </a>
                            {/* <Link href={props.imgLink}>
                                <a><img src={props.imgUrl} /></a>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
