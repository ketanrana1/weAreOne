import React from 'react'

export default function VideoSec(props) {
    return (
        <div className="sec-video-new container">
            {/* <video id="audioplayer" width="100%" height="100%"  controls autoPlay loop muted>
                <source src={props.videoUrl} type="video/mp4" />
                <source src={props.videoUrl} type="video/ogg" />
            </video>              */}

<iframe width="100%" height="600" src="https://www.youtube.com/embed/8igOteyvW_4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}
