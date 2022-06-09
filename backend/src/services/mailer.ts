import path from 'path';
import sendgrid from '@sendgrid/mail';
import dayjs from 'dayjs';
import ejs from 'ejs';


const sendEmail = async (message: {
  to: string;
  cc?: string;
  subject: string;
  html: any;
}) => {
 
    //@ts-ignore
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  return sendgrid.send({
    to: message.to,
    cc: message.cc,
    from: 'jennifer@worldofweareone.com',
    subject: message.subject,
    html: message.html,
  }).then(() => {
      console.log("mail sent", message.to)
  }, (error) => {
      console.log("mail not send", error)
    if (error.response) {
      console.error(error.response.body);
    }
  });
};

const getTemplate = async (templateLocation: string, data: any = {}) => ejs.renderFile(path.join(__dirname, '..', 'views', templateLocation), { ...data, dayjs, reactAppUrl: process.env.REACT_APP_URL });


var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_key: process.env.NODEMAILER_SENDGRID_API_KEY
  }
}

var client = nodemailer.createTransport(sgTransport(options));

export {
  sendEmail,
  getTemplate,
  client,
};