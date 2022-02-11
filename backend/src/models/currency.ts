import mongoose from 'mongoose';

const { Schema } = mongoose;
const {v4 : uuidv4} = require('uuid')

const currencySchema = new Schema({

  puzzle_uuid: {
    type: String,
    default: uuidv4
  },
  
  aud_price: Number,
  currency_id: String
},  
{timestamps: true}   
);               
  
export default mongoose.model('Currency', currencySchema);