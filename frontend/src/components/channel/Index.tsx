import React from 'react'
import ImageBanner from 'components/common/ImageBanner'
import YouTubeEmbed from './YouTubeEmbed'

const Index = () => { 
    return (
        <div className="channelPage">
            <ImageBanner imgURL="/assets/images/Channel Banner-min.jpg" />
            <div className="container">
                <p className="channelPara">
                <b>Knowing oneself is the path to genius...everyone has genius, either present or potential.<br/>This series is dedicated to nurturing that process...</b><br/>Make sure you subscribe to our Youtube Channel!</p>
                <YouTubeEmbed ytURL="https://www.youtube.com/embed/8igOteyvW_4" />
                <YouTubeEmbed ytURL="https://www.youtube.com/embed/JRrcY8h7EYw" />
            </div>
        </div>
        
    )
}

export default Index
