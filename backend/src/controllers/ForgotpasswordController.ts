import Currency from '../models/currency';
import { Controller, Body, Get, Post, Req, UploadedFile, Param, QueryParam, UseBefore, JsonController} from 'routing-controllers';
import Joi from 'joi';
var path = require('path');
const {v4 : uuidv4} = require('uuid')
import AdminAuthMiddleware from 'middlewares/AdminAuthMiddleware';
const bcrypt = require('bcryptjs');
import Users from '../models/users';
import { client } from 'services/mailer';
const jwt = require('jsonwebtoken');


@JsonController('/api') 
export class ForgotpasswordController {

  @Post('/forgotPassword') 
  async postForgotPassword( @Body() body: any, ) {


    return {
        message: "Success",
    }
   
  }
  
  



  @Post('/userExists')
  async postContent( @Body() body: any, @UploadedFile("", { }) file: any ) {

    const userSchema = Joi.object({
     email: Joi.string().required().label('Email'),
    });
  
    const validate = userSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }
          
    const email = body.email;
    const doUserExist  = await Users.find({ email })


    console.log("USER", doUserExist)

    if( doUserExist.length > 0 ){
    return {
        userExists: true
    };
    } else {
        return {
            userExists: false
        }
    }
  }


  @Post('/changePassword')
  async changePassword( @Body() body: any, @UploadedFile("", { }) file: any ) {

    const userSchema = Joi.object({
     email: Joi.string().required().label('Email'),
    });
  
    const validate = userSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }
          
    const email = body.email;
    const doUserExist  = await Users.find({ email })

 
    console.log("USER", doUserExist)

    if( doUserExist.length > 0 ){

      var token = jwt.sign({
        email: email,
        secret: process.env.FORGOT_PASSWORD_SECRET_KEY,
      }, process.env.API_SECRET, {
        expiresIn: 86400
      });

      var resetEmail = {
        to: `${body.email}`,
        subject: 'Reset password',
        html: `<p> Click below to reset your password. </p></br>${process.env.FRONTEND_BASE_URL}change-password?token=${token}`,
        from: `${process.env.ADMIN_EMAIL}`
      };

      client.sendMail(resetEmail, function(err: any, info: any){
        if (err ){
          console.log(err);
        }
        else {
          console.log('Message sent: ' + info.response);
        }
    });
    return {
        userExists: true
    };

    } else {
      return {
          userExists: false
      }
    }
  }


  @Post('/confirmChangePassword')
  async COnfirmChangePassword( @Body() body: any, @UploadedFile("", { }) file: any ) {

    const userSchema = Joi.object({
     email: Joi.string().required().label('Email'),
     password: Joi.string().required().label('Passsword'),
     confirm_password: Joi.string().required().label('Confirm Password'),
    });
  
    const validate = userSchema.validate(body);
    if (validate.error) {
      return {
        success: false,
        message: 'Request data is invalid',
        error: validate.error.details.map((d) => d.message),
      };
    }
          
    const email = body.email;
    const password = body.password;
    const confirm = body.confirm_password;
    const SALT_WORK_FACTOR = 10;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(password, salt);
    const passwordUpdated = await Users.findOneAndUpdate({ email },  { $set: { password: hashedPassword }})

    // console.log("USER", passwordUpdated )

    if( passwordUpdated !== null ){
      return {
        passwordUpdated: true
      };
    } else {
        return {
          passwordUpdated: false
        }
    }
  }













}

