import mongoose from 'mongoose';

const {v4 : uuidv4} = require('uuid')
const { Schema } = mongoose;

const artprintSchema = new Schema({

  artId: {   
    type: String,
    default: uuidv4
  },
  art_name: String,
  slug: String,
  art_description: String,
  art_image_1: String,
  art_image_2: String,
  art_image_3: String,
  art_image_4: String,
  art_image_1_name: String,
  art_image_2_name: String,
  art_image_3_name: String,
  art_image_4_name: String,
  size_small_price: Number,
  size_small_description: String,
  size_large_price: Number,
  size_large_description: String,
  size_xlarge_price: Number,
  size_xlarge_description: String,
  priority: Number,

},
{timestamps: true}
);
  
export default mongoose.model('Artprint', artprintSchema);