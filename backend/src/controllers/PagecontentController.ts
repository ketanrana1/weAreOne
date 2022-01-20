import { JsonController, UploadedFile, Body, Get, Post, UseBefore } from 'routing-controllers';
import Joi from 'joi';
import Pagecontent from '../models/pagecontent'; 
import mongoose from 'mongoose';
import AdminAuthMiddleware from 'middlewares/AdminAuthMiddleware';

@JsonController('/api') 
export class PagecontentController {
  @Post('/addContent/wholesale')
  @UseBefore(AdminAuthMiddleware)
  async addWholesaleContent( @Body() body: any, @UploadedFile("", { }) file: any ) {

    const contentSchema = Joi.object({
      page_name: Joi.string().required(),
      content: Joi.string().required().label('Content'),
    });
  
    const validate = contentSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }
    
    const _id = "61b8871a141babc372000419";

    const response = await Pagecontent.findByIdAndUpdate(_id, { 
      content: body.content,
     });

     if(response){
      return {message: "Wholesale Content Added"};
     }
  }

  @Get('/pagecontent/wholesale/')
  async getContent(@Body() body: any) {
    const response = await Pagecontent.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId('61b8871a141babc372000419')
        }
      },
        {
          '$project': {  
            _id: 0,
            page_name: 0
          }
        }
      ]);

    return {
      response,
      message: 'This action returns content for Wholesale page'
    };

  }


  @Post('/addContent/privacyPolicy')
  @UseBefore(AdminAuthMiddleware)
  async addPrivacyPolicyContent( @Body() body: any, @UploadedFile("", { }) file: any ) {

    const contentSchema = Joi.object({
      page_name: Joi.string().required(),
      content: Joi.string().required().label('Content'),
    });
  
    const validate = contentSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }

    const _id = "61b8939de661968e17a0c142";

    const response = await Pagecontent.findByIdAndUpdate(_id, { 
      content: body.content,
     });

     if(response){
      return {message: "Privacy Policy Content Added"};
     }
}

@Get('/pagecontent/privacyPolicy/')
async getPrivacyPolicyContent(@Body() body: any) {
  const response = await Pagecontent.aggregate([
    {
      '$match': {
        '_id': new mongoose.Types.ObjectId('61b8939de661968e17a0c142')
      }
    },
      {
        '$project': {  
          _id: 0,
          page_name: 0,
          id: 0,
        }
      }
    ]);

  return {
    response,
    message: 'This action returns content for Wholesale page'
  };

}


@Post('/addContent/termsAndConditions')
@UseBefore(AdminAuthMiddleware)
async addHelpContent( @Body() body: any, @UploadedFile("", { }) file: any ) {

  const contentSchema = Joi.object({

    page_name: Joi.string().required(),
    content: Joi.string().required().label('Content'),

  });

  const validate = contentSchema.validate(body);
  if (validate.error) {
    return {
      success: false,
      message: 'Request data is invalid',
      error: validate.error.details.map((d) => d.message),
    };
  }

  const _id = "61b893aee661968e17a0c144";

  const response = await Pagecontent.findByIdAndUpdate(_id, { 
    content: body.content,
   });

   if(response){
    return {message: "Terms and Conditions Content Added"};
   }

}

@Get('/pagecontent/termsAndConditions/')
async getTermsAndConditionsContent(@Body() body: any) {
  const response = await Pagecontent.aggregate([
    {
      '$match': {
        '_id': new mongoose.Types.ObjectId('61b893aee661968e17a0c144')
      }
    },
      {
        '$project': {  
          _id: 0,
          page_name: 0,
          id: 0,
        }
      }
    ]);

  return {
    response,
    message: 'This action returns content for Wholesale page'
  };
}

@Post('/addContent/shipping')
@UseBefore(AdminAuthMiddleware)
async addShippingContent( @Body() body: any, @UploadedFile("", { }) file: any ) {

  const contentSchema = Joi.object({

    page_name: Joi.string().required(),
    content: Joi.string().required().label('Content'),

  });

  const validate = contentSchema.validate(body);
  if (validate.error) {
    return {
      success: false,
      message: 'Request data is invalid',
      error: validate.error.details.map((d) => d.message),
    };
  }

  const _id = "61b893c1e661968e17a0c146";

  const response = await Pagecontent.findByIdAndUpdate(_id, { 
    content: body.content,
   });

   if(response){
    return {message: "Shiiping Content Added"};
   }
}

@Get('/pagecontent/shipping/')
async getShippingContent(@Body() body: any) {
  const response = await Pagecontent.aggregate([
    {
      '$match': {
        '_id': new mongoose.Types.ObjectId('61b893c1e661968e17a0c146')
      }
    },
      {
        '$project': {  
          _id: 0,
          page_name: 0,
          id: 0,
        }
      }
    ]);

  return {
    response,
    message: 'This action returns content for Wholesale page'
  };
}

@Post('/addContent/HelpAndSupport')
@UseBefore(AdminAuthMiddleware)
async addTermsAndConditionsContent( @Body() body: any, @UploadedFile("", { }) file: any ) {

  const contentSchema = Joi.object({

    page_name: Joi.string().required(),
    content: Joi.string().required().label('Content'),

  });

  const validate = contentSchema.validate(body);
  if (validate.error) {
    return {
      success: false,
      message: 'Request data is invalid',
      error: validate.error.details.map((d) => d.message),
    };
  }

  const _id = "61b8938ae661968e17a0c140";

  const response = await Pagecontent.findByIdAndUpdate(_id, { 
    content: body.content,
   });

   if(response){
    return {message: "Help and Support Content Added"};
   }
}

@Get('/pagecontent/helpAndSupport/')
async getHelpAndSupportContent(@Body() body: any) {
  const response = await Pagecontent.aggregate([
    {
      '$match': {
        '_id': new mongoose.Types.ObjectId('61b8938ae661968e17a0c140')
      }
    },
      {
        '$project': {  
          _id: 0,
          page_name: 0,
          id: 0,
        }
      }
    ]);

  return {
    response,
    message: 'This action returns content for Wholesale page'
  };
}


}

