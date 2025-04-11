import mongoose from 'mongoose';


const FoodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    expirationDate: { type: Date },
    donor: String,
    storageLocation: String,
    lastModified: { type: Date, default: Date.now }
  });

export const FoodItem = mongoose.model('FoodItem', FoodItemSchema);