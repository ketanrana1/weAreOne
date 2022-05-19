import React, { useState, useEffect } from 'react'
import LayoutNew from 'components/common/LayoutNew'
import Router from 'next/router';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { addToCart, incrementQuantity, removeFromCart } from 'redux/cart.slice'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import Link from 'next/link' 
import LazyLoad from 'react-lazy-load';




const Product = ({ product, relatedProducts  }) => {

  const [response, setrespone] = useState([])
  const API = async () => {
    const { data } = await axios.get(`${publicRuntimeConfig.backendBaseUrl}api/artprints/allArtprintsRecommended`); 
    setrespone(data.response)
  }
    useEffect(() => {     
      API(); 
  },[]);


  if (product.length < 1) {
    Router.push('/artprints');
  }


  const [counter, setCounter] = useState(1) 
  const handleClickInc = () => {
    setCounter(counter + 1)
  }
  const handleClickDec = () => {
    if(counter > 1 ) {
        setCounter(counter - 1)
    }   
  }

  const sizes = {
    small: { 
      descp: product[0]?.size_small_description,
      price: product[0]?.size_small_price,
    },
    medium: { 
      descp: product[0]?.size_large_description,
      price: product[0]?.size_large_price,
    },
    large: {
      descp: product[0]?.size_xlarge_description,
      price: product[0]?.size_xlarge_price
    }      
  }

  // for(var i = 0; i < Object.keys(sizes).length; i++) {
  //   if (sizes.small.price === 0 ) {
  //     delete sizes.small;
  //   } else if (sizes.medium.price === 0 ) {
  //     delete sizes.medium;
  //   } else if (sizes.large.price === 0 ) {
  //     delete sizes.large;
  //   }
  // }

  if (sizes.small.price === 0 ) {
    delete sizes.small;
  } 
  if (sizes.medium.price === 0 ) {
    delete sizes.medium;
  } 
  
  if (sizes.large.price === 0 ) {
    delete sizes.large;
  }

  Object.entries(sizes).map(([key, value]) => console.log(key, value))

  const innerSizes = Object.entries(sizes).map(([key, value]) => value); 


    const dispatch = useDispatch();

    const router = useRouter()

    // const [quantityState, setQuantityState] = useState(1)

    

    const currency = sessionStorage.getItem("Currency")
    const currencySymbol = sessionStorage.getItem("currencySymbol");
    const convertedPrice = +sessionStorage.getItem("convertedPrice");

    // to change the price of other currency code
    let statrtingPriceWithoutConverstion = innerSizes[0].price
    let startingPrice: any = Math.round( innerSizes[0].price * +convertedPrice )

    const [sizePrice, setSizePrice] = useState(startingPrice);
    const [priceAud, setPriceUsd] = useState(statrtingPriceWithoutConverstion)
    // const [sizePriceTwo, setSizePriceTwo] = useState(statrtingPriceWithoutConverstion);
    sessionStorage.setItem("audPrice", statrtingPriceWithoutConverstion);

    let usdPrice
    let priceInConvertedCurrency = startingPrice

    // useEffect(() => {
    //   sessionStorage.setItem('usdPrice', sizePriceTwo);
    // }, [sizePriceTwo]);

    async function handleSizeChange(e) {
      let value = e.target.value
      const newPrice = convertedPrice * +value
      console.log("VALUE", value)
      priceInConvertedCurrency = Math.round( convertedPrice * value );
      setSizePrice(priceInConvertedCurrency)
      setPriceUsd(value)
      // setSizePriceTwo(value)     
    }

    useEffect(() => {
      if(priceAud) sessionStorage.setItem("audPrice", priceAud);
    }, [priceAud])
    

    let styleCurrency
    if (currency === "AUD") {
      styleCurrency = {
        fontSize: "10px"
      }
    } else {
      styleCurrency = {
        display: "none"
      }
    }

    if (typeof window !== "undefined") { 
      usdPrice = sessionStorage.getItem("usdPrice");
    }

    const item = {
      product_name:product[0]?.art_name,
      product_image_name: product[0]?.art_image_1_name,
      product_price: sizePrice,
      id: product[0]?.artId,
      quantity: counter,
      currencySymbol: currencySymbol,
      currency: currency,
      audPrice: priceAud,
      productVariant: priceAud,
      productType: "artPrint"
    }

    const handleAtc = () => {
        dispatch(addToCart(item));
        router.push('/cart')
    }


    const [imgUrl, setImgUrl] = useState('')
    function clickhandler(e) {
      setImgUrl(e.target.src)
    }
    //console.log("CURRENCY", currency);




    return (
      <div className="outer-artprints-cont">
        <div className="product-detail-cont artprint container">
            <div className="row gx-5">
                <div className="col-12 col-md-7">
                  <div className="each-image pr-md-3">
                  <LazyLoad>
                      <img className="each-product-image" src={product[0]?.art_image_1_name}  onClick={clickhandler} data-toggle="modal" data-target="#artPrintsModalSingle" />
                  </LazyLoad>
                  </div>
                  <div className="each-image pr-md-3">
                  <LazyLoad>
                      <img className="each-product-image" src={product[0]?.art_image_2_name}  onClick={clickhandler} data-toggle="modal" data-target="#artPrintsModalSingle" />
                  </LazyLoad>
                  </div>
                  <div className="each-image pr-md-3">
                  <LazyLoad>
                      <img className="each-product-image" src={product[0]?.art_image_3_name}  onClick={clickhandler} data-toggle="modal" data-target="#artPrintsModalSingle" />
                  </LazyLoad>
                  </div>
                  <div className="each-image pr-md-3">
                  <LazyLoad>
                      <img className="each-product-image" src={product[0]?.art_image_4_name}  onClick={clickhandler} data-toggle="modal" data-target="#artPrintsModalSingle" />
                  </LazyLoad>
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  <div className="product-info-cont">
                    <h2 className="prouct-name">{product[0]?.art_name}</h2>
                    <p className="product-by">Artist - Jennifer Black</p>
                    <p className="price">$ {sizePrice} {currency} </p>
                    {/* <p style={styleCurrency}><i>Price in Australian dollars</i></p> */}
                    <form>
                        <div className="size-selector">
                            <p>Size:</p>
                            <select onChange={handleSizeChange}>
                                {innerSizes.map(item=>(
                                  <option value={item.price}>{item.descp}</option>
                                ))}
                            </select>
                        </div>
                        <div className="cart">
                          <div className="cart-inner-cont">Qty:
                              <div className="counter-cont-main">
                                  <div className="counter-cont">
                                      {counter} 
                                  </div>
                                  <div className="counter-btn-div">
                                      <div className="each-col top-incr" onClick={handleClickInc}>+</div>
                                      <div className="each-col btm-dec" onClick={handleClickDec}>-</div>
                                  </div>
                              </div>
                              <input onClick={handleAtc} type="button" value="Add to Cart" id="button-cart" className="button btn-artprnts" />
                          </div>
                      </div>
                    </form>
                    <div className="product-details-content-cont">
                    { currency === "AUD" ? <div dangerouslySetInnerHTML={{__html: product[0]?.art_description}}></div> : <div dangerouslySetInnerHTML={{__html: product[0]?.art_description_usa}}></div> } 
                        {/* {<div dangerouslySetInnerHTML={{__html: product[0]?.art_description}}></div>} */}
                    </div>

                    <div className="back-to-sale-cont">
                      <a className="button-common-new" href="/artprints">Back to All Art Prints Page</a>
                    </div>
                  </div>
                </div>
            </div>
            <div className="modal fade" id="artPrintsModalSingle" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body art-prints-modal">
                          <img src={imgUrl} />
                        </div>
                    </div>
                </div>
            </div>      
        </div>      
        <div className="recommend-product-sec container">
          <h2>You may also like</h2>
          <div className="row">
            {  
            response?.slice(0, 4).map( (data:any, index) => {                       
                    return (
                      <div className="col-6 col-md-3 each-product">
                        <Link href={`/product/artprints/${data.slug}`}>
                          <a>
                          <LazyLoad>
                            <img src={data.art_image_1_name} alt="product-image" />
                          </LazyLoad>
                            <div className="text-cont">
                              <h3>{data.art_name}</h3>
                              <p></p>
                            </div>
                          </a>
                        </Link>
                    </div>
                    );
                })
            }
          </div>
        </div>
      </div>
        
    ) 
}




export async function getServerSideProps({ query }) {

  const baseUrl = process.env.BACKEND_BASE_URL; 
  const res = await axios.get(`${baseUrl}api/artprints/singleArtprintDetails/?id=${query.slug}`)
  // console.log(res.data.singleArtprint)
  return { props: { product: res.data.singleArtprint } }

}

export default Product;

Product.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 