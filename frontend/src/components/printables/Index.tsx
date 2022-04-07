import React, { useState } from 'react'
import Banner from './Banner'
import SectionTopCards from './SectionTopCards'
import SectionTwoCards from './SectionTwoCards'
import SectionThreeCards from './SectionThreeCards'
import SectionFourCards from './SectionFourCards'
import SectionFiveCards from './SectionFiveCards';

function Index(props) {

    const topCardsData = [
        {
            id: 1,
            cardImgURL: "/assets/images/Planet-mandala.jpg",
            btnLink: "/assets/images/Planet-mandala.jpg"
        },
        {
            id: 2,
            cardImgURL: "/assets/images/Heart-Mandala.jpg",
            btnLink: "/assets/images/Heart-Mandala.jpg"
        },
        {
            id: 3,
            cardImgURL: "/assets/images/Fluffy.jpg",
            btnLink: "/assets/images/Fluffy.jpg"
        },
        {
            id: 4,
            cardImgURL: "/assets/images/Insects.jpg",
            btnLink: "/assets/images/Insects.jpg"
        },
        {
            id: 5,
            cardImgURL: "/assets/images/Rainbow.jpg",
            btnLink: "/assets/images/Rainbow.jpg"
        }
    ]

    const secTwoCards = [
        {
            id: 10,
            cardImgURL: "/assets/images/Nature.jpg",
            btnLink: "/assets/images/Nature.jpg"
        },
        {
            id: 20,
            cardImgURL: "/assets/images/Sharing.jpg",
            btnLink: "/assets/images/Sharing.jpg"
        },
        {
            id: 30,
            cardImgURL: "/assets/images/Fun.jpg",
            btnLink: "/assets/images/Fun.jpg"
        },
        {
            id: 40,
            cardImgURL: "/assets/images/Giving.jpg",
            btnLink: "/assets/images/Giving.jpg"
        }
    ]

    const secThreeCards = [
        {
            id: 100,
            cardImgURL: "/assets/images/Kanti.jpg",
            btnLink: "/assets/images/Kanti.jpg"
        },
        {
            id: 200,
            cardImgURL: "/assets/images/China.jpg",
            btnLink: "/assets/images/China.jpg"
        },
        {
            id: 300,
            cardImgURL: "/assets/images/Ife.jpg",
            btnLink: "/assets/images/Ife.jpg"
        },
        {
            id: 400,
            cardImgURL: "/assets/images/Rodya.jpg",
            btnLink: "/assets/images/Rodya.jpg"
        },
        {
            id: 500,
            cardImgURL: "/assets/images/Hawaiin-girl.jpg",
            btnLink: "/assets/images/Hawaiin-girl.jpg"
        },
        {
            id: 600,
            cardImgURL: "/assets/images/Monk.jpg",
            btnLink: "/assets/images/Monk.jpg"
        },
        {
            id: 700,
            cardImgURL: "/assets/images/Indian.jpg",
            btnLink: "/assets/images/Indian.jpg"
        },
        {
            id: 800,
            cardImgURL: "/assets/images/Elephant.jpg",
            btnLink: "/assets/images/Elephant.jpg"
        },
        {
            id: 900,
            cardImgURL: "/assets/images/Cow.jpg",
            btnLink: "/assets/images/Cow.jpg"
        },
        {
            id: 100,
            cardImgURL: "/assets/images/Dog.jpg",
            btnLink: "/assets/images/Dog.jpg"
        },
        {
            id: 1100,
            cardImgURL: "/assets/images/Bunny.jpg",
            btnLink: "/assets/images/Bunny.jpg"
        },
        {
            id: 1200,
            cardImgURL: "/assets/images/Pig.jpg",
            btnLink: "/assets/images/Pig.jpg"
        }
    ]

    const secFourCards = [
        {
            id: 11,
            cardImgURL: "/assets/images/The bundle.jpg",
            btnLink: "/assets/images/The bundle.jpg",
            title: "Planet Project Bundle",
            descp: "A great activity for the class or family to do!",
        },
        {
            id: 22,
            cardImgURL: "/assets/images/Sun.jpg",
            btnLink: "/assets/images/Sun.jpg",
        }
    ]

    const secFiveCards = [
        {
            id: 111,
            cardImgURL: "/assets/images/printable-sec-5-img-2.png",
            btnLink: "/assets/images/printable-sec-5-img-2.png"
        },
        {
            id: 222,
            cardImgURL: "/assets/images/printable-sec-5-img-4.png",
            btnLink: "/assets/images/printable-sec-5-img-4.png"
        },
        {
            id: 333,
            cardImgURL: "/assets/images/printable-sec-5-img-3.png",
            btnLink: "/assets/images/printable-sec-5-img-3.png"
        },
        {
            id: 444,
            cardImgURL: "/assets/images/Screen-Saver-min.jpg",
            btnLink: "/assets/images/Screen-Saver-min.jpg"
        }
    ]

    const [modalState, setModalState] = useState('')

    function handleImageClick() {
        setModalState('none')
    }

    return (
        <div>
            <Banner 
            topImgURL="/assets/images/printables-banner-low.png"
            btmImgURL="assets/images/coloring-bg-min.png"
            />
            <SectionTopCards 
            loopData={topCardsData}
            />
            <SectionTwoCards 
            loopDataTwo={secTwoCards}
            />
            <SectionThreeCards 
            loopData={secThreeCards}
            />
            <SectionFourCards 
            loppData={secFourCards}
            />
            <SectionFiveCards
            loopData={secFiveCards}
            />
        </div>
    )
}

export default Index
