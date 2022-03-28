import React from 'react'
import Banner from 'components/common/Banner'
import TextWithVideo from './TextWithVideo'

export default function Index() {
    return (
        <>
           <Banner imgURL="/assets/images/app-banner-min.png" />
           <TextWithVideo 
           topImg="/assets/images/AppRainbow strip(1)-min.png" 
           head="A Dream Come True!"
           descp="Wow! What can I say? I am so excited about this App! It's based on the We Are One Exploration Cards. Each animated card has a
           valuable message which can be chosen singularly or in a group. There are also 240+ gorgeous puzzles with varying degrees of difficulty.
           And that's not all... 
           new features will be added continually as we grow!" 
           />
        </>
    )
}
