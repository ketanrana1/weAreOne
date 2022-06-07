import TextCard from './common/TextCard';
import ImageCard from './common/ImageCard';

function WeAreLove(props) {

    return (
        <section className="sectionTwoMain">
            <div className="container">
                <div className="sectionBtmCont">
                    <div className="row">
                        <TextCard 
                            imgURL="/assets/images/award-winning-book-bg-3.png"
                            btnURL="https://www.worldofweareone.com/Books"
                            btnImgURL="/assets/images/shop-now-btn.png" 
                            paraLoop={props.loopData}
                        />
                        <ImageCard
                            topImgURL="/assets/images/award-winning-book-bg-4.png"
                            topLink="https://www.worldofweareone.com/Books?product_id=50"
                            topLnkImgURL="/assets/images/heart.png"
                            head="We Are Love"
                            spanHd="(Hardcover)"
                            btnLnkURL="https://www.worldofweareone.com/Books?product_id=50"
                            btnImgURL="/assets/images/buy-now-btn.png"                      
                        />                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WeAreLove
