import React from 'react'
import Banner from 'components/common/Banner'
import AllBooks from 'components/books/AllBooks'

export default function Index() { 
    return (
        <>
            <Banner imgURL="/assets/images/books-banner-min.png" />        
            <AllBooks
            topImg="/assets/images/NewRainbow strip-min.png"
            topHead="Books are more essential than ever!"
            descp="Tactile, vibrant, and personal, they weave wonder, mystery, and imagination. We Are One & We Are Love eloquently share messages of Unity & Love and are favorites for many children (known from reviews, of which I'm grateful)! These books celebrate life in all its diversity and Love in all its grace!"
            btmHead="BUY YOURS HERE"
            />
        </>
    )
}
