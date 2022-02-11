import react, {useState} from 'react'
import Router from 'next/router';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux' 
import axios from 'axios';
import LayoutNew from 'components/common/LayoutNew'
import { addToCart, incrementQuantity, removeFromCart } from 'redux/cart.slice'


const Product = ({ product, relatedProducts  }) => {

  if (product.length < 1) {
    Router.push('/books');
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

    

    const dispatch = useDispatch();

    const router = useRouter()

    const [quantityState, setQuantityState] = useState(1)
    

    sessionStorage.setItem("usdPrice", product[0]?.book_price);
    const currency = sessionStorage.getItem("Currency")
    const currencySymbol = sessionStorage.getItem("currencySymbol");
    const convertedPrice = +sessionStorage.getItem("convertedPrice");
    const priceInConvertedCurrency: any = Math.round( convertedPrice * product[0]?.book_price );
    
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

    let usdPrice
    if (typeof window !== "undefined") { 
      usdPrice = sessionStorage.getItem("usdPrice")
    }

    const item = { 
      product_name: product[0]?.book_name,
      product_image_name: product[0]?.book_image_name,
      product_price: priceInConvertedCurrency, 
      id: product[0]?.bookId,
      quantity: counter,
      currencySymbol: currencySymbol,
      currency: currency,
      usdPrice: usdPrice,
    }

    const handleAtc = () => {
        dispatch(addToCart(item));
        router.push('/cart')
    }
  

  return (
    <>
        <div className="single-product p-3 p-md-5" >
            <div id="content" className="container pt-3"> 
                <h1>{product[0]?.book_name}</h1>
                <div className="product-info row">
                    <div className="left col-12 col-md-6">
                        <div className="image">
                            <a href="/" title="We Are One book (Hardcover)" className="colorbox cboxElement">
                                <img src={product[0]?.book_image_name} title="We Are One book (Hardcover)" alt="We Are One book (Hardcover)" id="image" />
                            </a>
                        </div>
                    </div>
                    <div className="right col-12 col-md-6">
                        <div className="price">Price: {currencySymbol}{priceInConvertedCurrency}<br/>
                        <p style={styleCurrency}><i>Price in Australian dollars</i></p>
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
                                <input onClick={handleAtc} type="button" value="Add to Cart" id="button-cart" className="button" />
                            </div>
                        </div> 
                    </div>
                </div>
                <div id="tab-description" className="tab-content py-5">
                <div dangerouslySetInnerHTML={{__html: product[0]?.book_description}}></div>
                </div>
                <div className="back-to-sale-cont">
                  <a className="button-common-new" href="/books">Back to All Books Page</a>
                </div>     
            </div>
        </div>
    </>

  )
};  

export async function getServerSideProps({ query }) {

  const baseUrl = process.env.BACKEND_BASE_URL; 
  const res = await axios.get(`${baseUrl}api/books/singleBookDetails/?id=${query.slug}`)
  // console.log(res.data.singleBook)
  return { props: { product: res.data.singleBook } } 

}

export default Product;



Product.getLayout = function getLayout(page: any) {
  return (
    <LayoutNew>
      {page}
    </LayoutNew>
  )
}

