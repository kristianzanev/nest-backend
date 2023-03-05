import * as mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 0, max: 5 },
    description: { type: String, required: true, maxlength: 5000 },
    targetUserId: { type: String, default: '', maxlength: 500 },
    creatorId: { type: String, default: '', maxlength: 500 },
  },
  { timestamps: true }, // adds create_at, update_at properties
);

ReviewSchema.index({ targetUserId: 1 }); // for faster database querying on this prop (don't overdo)

export { ReviewSchema };
