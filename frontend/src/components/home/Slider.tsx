import React from 'react'

export default function Slider(props) {
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner section-new-banner">           
                <div className="carousel-item active">
                    <div className="banner-container">
                        <img src="/assets/images/JEN Web Banner Light-min.webp" className="d-block w-100" alt="banner" />
                        <div className="head-cont">
                            <h2>Beautiful books for children <span> aged 1-100!</span></h2>
                        </div>
                        
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="banner-container">
                        <img src="/assets/images/JEN Heart Banner Light-min.webp" className="d-block w-100" alt="banner" />
                        <div className="head-cont">
                            <h2>Content reflecting the Light of our Hearts!</h2>
                        </div>
                    </div>
                </div>
                <div className="carousel-item" data-interval="2000">
                    <div className="banner-container">
                        <img src="/assets/images/JEN Rainbow Banner Light-min.png" className="d-block w-100" alt="banner" />
                        <div className="head-cont">
                            <h2>Timeless messages to inspire us all!</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a> */}
        </div>
    )
}
