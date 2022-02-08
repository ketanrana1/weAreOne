import React from 'react'

export default function Slider(props) {
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner section-new-banner">
                <div className="carousel-item active" data-interval="5000">
                    <div className="banner-container">
                        <img src="/assets/images/JEN Rainbow Banner Light-min.png" className="d-block w-100" alt="banner" />
                        <h2>Timeless messages to inspire young ones.</h2>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="banner-container">
                        <img src="/assets/images/JEN Web Banner Light-min.webp" className="d-block w-100" alt="banner" />
                        <h2>Beautiful books for everyone on earth!</h2>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="banner-container">
                        <img src="/assets/images/JEN Heart Banner Light-min.webp" className="d-block w-100" alt="banner" />
                        <h2>Content reflecting the light of our hearts.</h2>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}
