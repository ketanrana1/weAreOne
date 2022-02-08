import { JsonController, UploadedFile, Body, Get, Post, UseBefore } from 'routing-controllers';
import Content from '../models/content';
import Joi from 'joi';
import AdminAuthMiddleware from 'middlewares/AdminAuthMiddleware';
import convertCurrency from 'services/currencyconverter';
let CurrencyConverter = require('@y2nk4/currency-converter')
let converter = new CurrencyConverter('7be7ff38a13ccc19088c')

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

  async getContent(@Body() body: any) {
 

    converter.convert('USD', 'CNY', 100)
    .then(console.log, console.error)

    // convertCurrency(10, 'USD', 'PHP', function(err: any, amount: any) {
    //   const response = amount ;
    //   return {
    //     response,
    //     message: 'This action returns site content details'
    //   };

    // });

    // return {
    //   "message" : "Test"
    // }
    
  }
}

