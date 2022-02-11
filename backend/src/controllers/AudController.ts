import Currency from '../models/currency';
import { Controller, Body, Get, Post,  Req,  UploadedFile, Param, QueryParam, UseBefore, JsonController} from 'routing-controllers';
import Joi from 'joi';
var path = require('path');
const {v4 : uuidv4} = require('uuid')
import AdminAuthMiddleware from 'middlewares/AdminAuthMiddleware';



@JsonController('/api') 
export class AudController {

  @Post('/addAudPrice') 
  @UseBefore(AdminAuthMiddleware)
  async postAud( @Body() body: any, ) {

    const audSchema = Joi.object({
      aud_price: Joi.any(),
      currency_id: Joi.any()
    });  
  
    const validate = audSchema.validate(body);

    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),  
      };
    }
  
    const newCurrency = new Currency(body);
    const result = await newCurrency.save();
    
    if(result) {
      return {
        success: true,
        message: "AUD Price is added."
      };
    }

  }

  @Get('/getAudPrice') 
  async getAud( @Body() body: any, ) {


    const response = await Currency.aggregate([
        {
          '$project': { 
            _id: 0,
          }
        }
      ]);
       return {
           response, 
           message: 'This action returns Currency Prices'
       };

  }


}

