import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,

  variants: [
    {
      label: String, // Quarter, Roti, 500ml
      price: Number,
    }
  ],

  isAvailable: {
    type: Boolean,
    default: true,
  }
});




export default mongoose.model("MenuItem", menuItemSchema);
