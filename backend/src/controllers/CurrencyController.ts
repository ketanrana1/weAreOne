import { JsonController, UploadedFile, Body, Get, Post, UseBefore, QueryParam } from 'routing-controllers';
import Content from '../models/content';
import Joi from 'joi';
import AdminAuthMiddleware from 'middlewares/AdminAuthMiddleware';
import convertCurrency from 'services/currencyconverter';
let CurrencyConverter = require('@y2nk4/currency-converter')
let converter = new CurrencyConverter('7be7ff38a13ccc19088c')

const CC = require('currency-converter-lt')


@JsonController('/api') 
export class CurrencyController {
  @Post('/convertCurrency')
  @UseBefore(AdminAuthMiddleware)
  async postContent( @Body() body: any, @UploadedFile("", { }) file: any ) {

    const contentSchema = Joi.object({
      about_us: Joi.string().required().label('About us'),
      contact_us: Joi.string().required().label('Contact us'),
      privacy_policy: Joi.string().required().label('Privacy Policy') 
    });
  
    const validate = contentSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }

    const _id = "619359de022ce5e4dd5974a8";


    const response = await Content.findByIdAndUpdate(_id, { 
      about_us: body.about_us,
      contact_us: body.contact_us,
      privacy_policy: body.privacy_policy
     });

     if(response){
      return {message: "Content Added"};
     }
  }


  
  @Get('/convertCurrency')

  async getContent(@Body() body: any, @QueryParam('currencyCode') currencyCode: string,) {
 
    let currencyConverter = new CC({from:"USD", to:currencyCode, amount:1})

    return currencyConverter.convert().then((response: any) => {
      console.log(response);
      return response
    })
   
  }
}

