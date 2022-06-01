import { JsonController, UploadedFile, Body, Req, Post, Res, UseBefore, QueryParam } from 'routing-controllers';
import Joi from 'joi'
import Order from '../models/order';
import PayPal from 'services/paypal';
import Transaction from 'models/transaction';
import AuthMiddleware from 'middlewares/AuthMiddleware';
import users from 'models/users';
import { join } from 'path';
const {v4 : uuidv4} = require('uuid')




@JsonController('/api') 

export class CheckoutController {  
 
@Post('/checkout')
@UseBefore(AuthMiddleware)
  async doCheckout(@QueryParam('currencyCode') currencyCodee: string, @QueryParam('convertedPrice') convertedPrice: string, @Body() body: any, @Req() request: any, @Res() response: any,  @UploadedFile("", { }) file: any) {
    const orderSchema = Joi.object({ 
      userID: Joi.any(),
      shipping_firstname: Joi.string().required().label('First Name'),
      shipping_lastname: Joi.string().required().label('Last Name'),
      shipping_address_1: Joi.string().required().label('Shipping Adress 1'),
      shipping_address_2: Joi.string().label('Shipping Adress 2'),
      shipping_city: Joi.string().required().label('City'),
      shipping_state: Joi.string().required().label('State'),
      shipping_zip: Joi.string().required().label('Zip Code'),
      shipping_country: Joi.string().required().label('Country'),
      shipping_telephone: Joi.number().required().label('Phone Number'),
      shipping_email: Joi.string().required().label('Email'),

      billing_firstname: Joi.string().required().label('First Name'),
      billing_lastname: Joi.string().required().label('Last Name'),
      billing_address_1: Joi.string().required().label('Shipping Adress 1'),
      billing_address_2: Joi.string().label('Shipping Adress 2'),
      billing_city: Joi.string().required().label('City'),
      billing_state: Joi.string().required().label('State'),
      billing_zip: Joi.string().required().label('Zip Code'),
      billing_country: Joi.string().required().label('Country'),
      billing_telephone: Joi.number().required().label('Phone Number'),
      billing_email: Joi.string().required().label('Email'),
      items: Joi.array().items(Joi.object({
        id: Joi.string().label('Id'),
        quantity: Joi.number().label('Item Quantity'),
        product_name: Joi.string().min(0).allow(null).allow('').label('Variant'),
        product_price: Joi.number().min(0).allow(null).allow('').label('Order Repeat'),
        product_image_name: Joi.string().min(0).allow(null).allow('').label('Order Repeat Value'),
        usdPrice: Joi.any(),
        audPrice: Joi.any()
      
      })),
      currencyCode: Joi.any(),
      convertedPrice: Joi.any()

    });
  
    const validate = orderSchema.validate(body);

    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),  
      };
    }
   await users.findOneAndUpdate({ "userId": body.userID }, { 
      telephone: body.shipping_telephone,
      address_1: body.shipping_address_1,
      address_2: body.shipping_address_2,
      city: body.shipping_city,      
      state: body.shipping_state,  
      zip: body.shipping_zip,
      country: body.shipping_country, 
      });
    
    const newOrder = new Order(body);
    const transaction = new Transaction();
    newOrder.ordered_items = body.items;
    newOrder.userId = body.userID;
    let shippingCost: any = (+convertedPrice * 25).toFixed(2);
    // console.log("SHIPPING", shippingCost)
    let totalAmount: any = 0; 
    for (let i =0 ; i < newOrder.ordered_items.length ; i ++) {

      
      totalAmount = (totalAmount + (( newOrder.ordered_items[i].audPrice * +convertedPrice ) * newOrder.ordered_items[i].quantity));
      totalAmount = totalAmount
      // console.log("UPPER TOTAL AMOUNT", totalAmount)
      if(newOrder.ordered_items[i].id == "ad2f14df-5c92-4c66-8fd2-1fad1ca6c28f") {
        shippingCost = 0;
      }
    }
      
    newOrder.status = 'Created';
    newOrder.total_amount = +totalAmount + +shippingCost;
    newOrder.total_amount = (Math.round(newOrder.total_amount * 100) / 100).toFixed(2);

    newOrder.shipping_cost = shippingCost;
    // console.log("SHiiping cost", shippingCost)
    // console.log("total amount", newOrder.total_amount)
    newOrder.sub_amount = (totalAmount).toFixed(2);
    transaction.status = "Redirecting to Gateway";
    await transaction.save();
    newOrder.transactionId =  transaction.transactionId;
    const result = await newOrder.save();
    const url = `${request.protocol}://${request.get('host')}`;
    let approvalUrl = "";
    const returnUrl = `${url}/payment/paypal/success?orderId=${result.orderId}&transactionId=${transaction.transactionId}`;
    const cancelUrl = `${url}/payment/paypal/cancel?orderId=${result.orderId}&transactionId=${transaction.transactionId}`;
    const currencyCode: any = currencyCodee;

    const payment = await PayPal.createPayment( newOrder, returnUrl, cancelUrl, currencyCode);
    if (payment.statusCode === 201) {
      payment.result.links.forEach((link: any) => {
        if (link.rel === 'approve') {
          approvalUrl = link.href;
        }
      });
      return {
        message: 'We have received your order it will be shipped soon. Thank you for shopping with us.',
        data: {
          orderId: newOrder.orderId,
          approvalUrl,
        },
      };
    }
  }







  @Post('/checkout/userPaid')
  async doMobileCheckout(@Body() body: any, @Req() request: any, @Res() response: any,  @UploadedFile("", { }) file: any) {


    const url = `${request.protocol}://${request.get('host')}`;
    let approvalUrl = "";

    const returnUrl = `${url}/payment/paypal/success/mobile?userId=${body.userId}&orderId=${uuidv4()}&transactionId=${uuidv4()}`;
    const cancelUrl = `${url}/payment/paypal/cancel/mobile?userId=${body.userId}&orderId=${uuidv4()}&transactionId=${uuidv4()}`;

    const newOrder = {total_amount : 20, sub_amount: 20, shipping_cost: 0 };
    const currencyCode = 'USD'


    const payment = await PayPal.createPayment( newOrder, returnUrl, cancelUrl, currencyCode);

    if (payment.statusCode === 201 ) {

      const ktr = await users.findOneAndUpdate({ "userId": body.userId }, { 
        is_paid: "Payment Pending"

        });


      payment.result.links.forEach((link: any) => {
        if (link.rel === 'approve') {
          approvalUrl = link.href;
        }
      });
      return {
        message: 'Payment URL',
        data: {
          approvalUrl,
          success: true
        },
      };
    }

    return {
      message: "ERROR"
    }
  }
}
