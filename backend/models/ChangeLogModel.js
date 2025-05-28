import mongoose from 'mongoose';

const changeLogSchema = new mongoose.Schema({
  actionType: { 
    type: String, 
    enum: ['added', 'updated', 'deleted'], 
    required: true 
  },
  itemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'FoodItem' 
  },
  itemName: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  changes: { 
    type: mongoose.Schema.Types.Mixed 
  },
  previousQuantity: Number,
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

export const ChangeLog = mongoose.model('ChangeLog', changeLogSchema);
