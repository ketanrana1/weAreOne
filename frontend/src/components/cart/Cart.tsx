import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { cartReducer, removeFromCart } from 'redux/cart.slice';
import userLogin from 'services/userLogin';
import { useRouter } from 'next/router';
import Link from 'next/link'

let amount = 0

const Cart = () => {

    const router = useRouter()
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false);

    function handleRadioChange() {
        setCheck(true);
    }

    const cart = useSelector((state: any) => state.cart);

    let products = "block"
    let noProducts = "none"


    if  ( cart.length === 0 ) {
        products = "none" 
        noProducts = "block"    
    }

 
    if(!userLogin() && typeof window !== "undefined") router.push('/login')

    if ( router.pathname === "/cart") amount = 0

return (
    <div className="cart-page">
        <div id="content" className="container remove-gradient-bg cart-page-wrapper py-4 px-md-5">
            <h1 className="cart-head" >Shopping Cart</h1>
            <div className="cart-details" style={{display: products}}>
            <form className="mb-4" action="" method="post" encType="multipart/form-data">
                <div className="cart-info common-table-wrapper table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <td className="image">Image</td>
                                <td className="name">Product Name</td>
                                <td className="quantity">Quantity</td>
                                <td className="price">Unit Price</td>
                            </tr>
                        </thead>
                        <tbody>                
                            {cart.map((item, index) => {
                                amount += item.product_price * item.quantity;
                                return (
                                <tr>
                                <td className="image-product-cart">
                                <img src={item.product_image_name} />
                                </td>
                                <td className="name">
                                    <p>{item.product_name}</p>
                                </td>
                                <td className="quantity">
                                    <input  type="text" name="quantity[50::]" value={item.quantity} size={1} />
                                    &nbsp;
                                    &nbsp;
                                    <Link href="">
                                    <a >
                                        <img onClick={() =>  {dispatch(removeFromCart(item.id))}} src="/assets/images/remove.png" alt="Remove" title="Remove" />
                                    </a>
                                    </Link>

                                    
                                </td>
                                <td className="price">${item.product_price}</td>
                                </tr>                          
                                );
                            })}                           
                        </tbody>
                    </table>
                </div>
            </form>

            <div className="cart-total">
                <table id="total">
                    <tbody>
                        <tr>
                            <td className="right" style={{fontSize: "20px"}} ><b>Total:</b></td>
                            <td className="right" style={{fontSize: "20px"}}>${amount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="buttons">
                <div className="right">
                    <Link href="/checkout">
                        <a className="button">Checkout</a>
                    </Link>
                                 
                    </div>
                <div className="center">
                    <Link href="/books">
                        <a className="button">Continue Shopping</a>
                    </Link>
                    
                   
                    
                    </div>
            </div>
            </div>

            <div className="no-cart-value" style={{display: noProducts}}>
                <h2 className="mb-4" style={{textAlign:"center"}}>There are no items in your cart.</h2>
                <div className="buttons">
                    <div className="center">
                        <Link href="/books" >
                        <a className="button">Go to Shop Page</a>                       
                      </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default Cart;

