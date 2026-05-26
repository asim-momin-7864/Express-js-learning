//* Subscription model, schema

// 3rd party modules
import mongoose from "mongoose";

const subScheam = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      uppercase: true,
      trim: true,
      enum: {
        values: ["USD", "INR", "EUR"],
        message: "{VALUE} is not a supported currency", // Custom error message
      },
    },
    billingCycle: {
      type: String,
      required: true,
      lowercase: true, // Auto converts
      trim: true, // Auto removes space
      enum: {
        values: ["monthly", "yearly"],
        message: "{VALUE} is not a supported option", // Custom error message
      },
    },
    category: {
      type: String,
      required: true,
      lowercase: true, // Auto converts "Entertainment" or "ENTERTAINMENT" -> "entertainment"
      trim: true, // Auto removes accidental blank spaces like " entertainment "
      enum: {
        values: [
          "entertainment",
          "software",
          "health",
          "utility",
          "miscellaneous",
        ],
        message: "{VALUE} is not a supported category", // Custom error message
      },
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    nextBillingDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamp: true },
);


// model
const Subscription = new mongoose.model("Subscription", subScheam);

export default Subscription;