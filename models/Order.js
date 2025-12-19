import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    tableNo: {
      type: Number,
      required: true,
    },

    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
        },
        name: String,          // snapshot (important)
        portion: {
          type: String,
          enum: ["quarter", "half", "full"],
        },
        qty: Number,
        price: Number,         // price per item
      },
    ],

    status: {
      type: String,
      enum: ["pending", "preparing", "completed"],
      default: "pending",
    },

    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
