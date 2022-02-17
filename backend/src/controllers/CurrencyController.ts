import { JsonController, UploadedFile, Body, Get, Post, UseBefore, QueryParam } from 'routing-controllers';
import Joi from 'joi';
import AdminAuthMiddleware from 'middlewares/AdminAuthMiddleware';
import convertCurrency from 'services/currencyconverter';
let CurrencyConverter = require('@y2nk4/currency-converter')
let converter = new CurrencyConverter('7be7ff38a13ccc19088c')
import Currency from 'models/currency';

const CC = require('currency-converter-lt')
 

@JsonController('/api') 
export class CurrencyController {
  
  @Get('/convertCurrency')

  async getContent(@Body() body: any, @QueryParam('currencyCode') currencyCode: string,) {
 
    // let currencyConverter = new CC({from:"USD", to:currencyCode, amount:1})

    // return currencyConverter.convert().then((response: any) => {
    //   console.log(response);
    //   return response
    // })

    const id = "84d69dd4-4a0f-45bf-89e2-7ae0d1382005"

    const response = await Currency.aggregate([
      {
        '$match': {
          'puzzle_uuid': id
        }
      }, {
        '$project': {
          'aud_price': 1, 
          '_id': 0
        }
      }
    ]);

    const price = response[0].aud_price;

     return {
         price
     };

    
    // if (currencyCode === "USD") {
    //   return 1;
    // } else if (currencyCode === "AUD")  {
    //   return 1.4;
    // }
   
  }

}

