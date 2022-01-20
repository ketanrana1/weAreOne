import Link from 'next/link'

function FreeColor(props) {
    return (
        <section className="sectionColor container">
            <img className="topImg" src={props.imgURL} alt="" />
            <div className="sectionBtmCont">

            <Link href={props.btnURL} >
            <a className="btnImg" ><img src={props.btnImgURL} alt="" /></a>
            </Link>
               
            </div>                      
        </section>
    )
}

export default FreeColor
