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
  
  @Get('/convertCurrency')

  async getContent(@Body() body: any, @QueryParam('currencyCode') currencyCode: string,) {
 
    // let currencyConverter = new CC({from:"USD", to:currencyCode, amount:1})

    // return currencyConverter.convert().then((response: any) => {
    //   console.log(response);
    //   return response
    // })

    
    if (currencyCode === "USD") {
      return 1;
    } else if (currencyCode === "AUD")  {
      return 1.4;
    }
   
  }

}

