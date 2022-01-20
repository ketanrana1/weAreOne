import Artprint from '../models/artprints';
import { Controller, UseBefore, Body, Get, Post,  Req, Res, UploadedFile, Param, QueryParam} from 'routing-controllers';
import Joi from 'joi';
import multer from 'multer';
var path = require('path');
const {v4 : uuidv4} = require('uuid')
import AdminAuthMiddleware from 'middlewares/AdminAuthMiddleware';



const fileUploadOptions = ( ) => ({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname,  "../../src/public/uploads/images"))
      },
      
      filename: function (req: any, file: any, cb: any) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
      }
    }),
    fileFilter: (req: any,file: any,cb: any) => {
      if(file.mimetype === "image/jpg"  || 
         file.mimetype ==="image/jpeg"  || 
         file.mimetype ===  "image/png" ){
       
      cb(null, true);
     } else {
          cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
        }
      }
  });


  @Controller('/api')
  export class ArtprintsController {

  @Post('/artprints/addArtprint') 
  @UseBefore(
    multer( fileUploadOptions() ).fields([
        { maxCount: 1, name: 'art_image_1' },
        { maxCount: 1, name: 'art_image_2' },
        { maxCount: 1, name: 'art_image_3' },
        { maxCount: 1, name: 'art_image_4' }
    ]), AdminAuthMiddleware
 )
  async addArtprint(@Body() body: any, @Req() req: any, @Res() res: any ){

    const fileOne = req.files.art_image_1[0];
    const fileTwo = req.files.art_image_2[0];
    const fileThree = req.files.art_image_3[0];
    const fileFour = req.files.art_image_4[0];

  
   const artprintSchema = Joi.object({

    art_image_1: Joi.any().label('Art Image One'),
    art_image_2: Joi.any().label('Art Image Two'),
    art_image_3: Joi.any().label('Art Image Three'),
    art_image_4: Joi.any().label('Art Image Four'),
    art_image_1_name: Joi.any(),
    art_image_2_name: Joi.any(),
    art_image_3_name: Joi.any(),
    art_image_4_name: Joi.any(),
    art_description: Joi.string().required().label('Description'),
    art_name: Joi.string().required().label('Slug'),
    slug: Joi.string().required().label('Slug'),
    size_small_price: Joi.number().required().label('Price for Size Small'),
    size_large_price: Joi.number().required().label('Price for Size Large'),
    size_xlarge_price: Joi.number().required().label('Price for Size Xlarge'),
 
   });

   const validate = artprintSchema.validate(body);
   if (validate.error) {
     return {
       success: false,
       message: 'Request data is invalid',
       error: validate.error.details.map((d) => d.message),
     };
   }

    let artprintBody = body;

    artprintBody.art_image_1_name = req.files.art_image_1[0].filename;
    artprintBody.art_image_2_name = req.files.art_image_2[0].filename;
    artprintBody.art_image_3_name = req.files.art_image_3[0].filename;
    artprintBody.art_image_4_name = req.files.art_image_4[0].filename;

  
    const newArtprint = new Artprint(artprintBody);
    const result = await newArtprint.save();
    
    if(result) {
      return {
        success: true,
        message: "ArtPrint is Added."
      };
    }
  }



  @Post('/artprints/editArtprint/')
  @UseBefore(AdminAuthMiddleware)
  async editArtprint( @Body() body: any, @Req() req: any, @QueryParam('id') id: string, @UploadedFile("", { }) file : any ) {
  
   const artprintSchema = Joi.object({

    art_description: Joi.string().label('Description'),
    art_name: Joi.string().label('name'),
    slug: Joi.string().label('Slug'),
    size_small_price: Joi.number().label('Price for Size Small'),
    size_large_price: Joi.number().label('Price for Size Large'),
    size_xlarge_price: Joi.number().label('Price for Size Xlarge'),
 
   });

   const validate = artprintSchema.validate(body);
   if (validate.error) {
     return {
       success: false,
       message: 'Request data is invalid',
       error: validate.error.details.map((d) => d.message),
     };
   }


   const response = await Artprint.findOneAndUpdate({ "artId": id }, { 
      art_description: body.art_description,
      art_name: body.art_name,
      slug: body.slug,
      size_small_price: body.size_small_price,
      size_large_price: body.size_large_price,
      size_xlarge_price: body.size_xlarge_price,
    });

  if(response){
  return { message: "ArtPrint is updated." };
  } 

}


  @Get('/artprints/allArtprints')
  async getAllArtPrints() {
     const response = await Artprint.aggregate([
        {
        '$project': {
          _id:0,
          artId: 1,
          art_name: 1,
          slug: 1,
          art_description: 1,
          art_image_1_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$art_image_1_name"]
          },
          art_image_2_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$art_image_2_name"]
          },
          art_image_3_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$art_image_3_name"]
          },
          art_image_4_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$art_image_4_name"]
          },
          size_small_price: 1,
          size_large_price: 1,
          size_xlarge_price: 1,
        }
      }
    ]);
     return {
         response,
         message: 'This action returns all printarts.'
     };
   }


   @Get('/artprints/singleArtprint')
   async getSingleArtPrint( @QueryParam('id') id: string, ) {
    const singleArtprint = await Artprint.aggregate([
      {
        '$match': {
          'artId': id
        }
      }, {
        '$project': { 
          _id: 0,
          art_name: 1,
          slug: 1,
          art_description: 1,
          artId: 1,
          art_image_1_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$art_image_1_name"]
          },
          art_image_2_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$art_image_2_name"]
          },
          art_image_3_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$art_image_3_name"]
          },
          art_image_4_name: {
            $concat: [process.env.IMAGES_BASE_PATH, "$art_image_4_name"]
          },
          size_small_price: 1,
          size_large_price: 1,
          size_xlarge_price: 1,
        }
      }
    ]);

    return {
      singleArtprint,
      message: 'This action returns single artprint details'
  };

    }

    @Get('/artprints/singleArtprintDetails')
    async getSingleArtPrintDetails( @QueryParam('id') id: string, ) {
     const singleArtprint = await Artprint.aggregate([
       {
         '$match': {
           'slug': id
         }
       }, {
         '$project': { 
           _id: 0,
           art_name: 1,
           slug: 1,
           art_description: 1,
           artId: 1,
           art_image_1_name: {
             $concat: [process.env.IMAGES_BASE_PATH, "$art_image_1_name"]
           },
           art_image_2_name: {
             $concat: [process.env.IMAGES_BASE_PATH, "$art_image_2_name"]
           },
           art_image_3_name: {
             $concat: [process.env.IMAGES_BASE_PATH, "$art_image_3_name"]
           },
           art_image_4_name: {
             $concat: [process.env.IMAGES_BASE_PATH, "$art_image_4_name"]
           },
           size_small_price: 1,
           size_large_price: 1,
           size_xlarge_price: 1,
         }
       }
     ]);
 
     return {
       singleArtprint,
       message: 'This action returns single artprint details'
   };
 
     }

   @Post('/artprint/delete/:id')
   @UseBefore(AdminAuthMiddleware)
   public async deleteArtprint(@Param('id') id: string) {


    const artprintDeleted = await Artprint.deleteOne({ bookId : id });

    if(artprintDeleted) {
      return {
        success: true,
        message: 'ArtPrint is deleted',
      }
    } else {
      return {
        success: false,
        message: 'Could not delete the ArtPrint',
      }
    }


   }

}
