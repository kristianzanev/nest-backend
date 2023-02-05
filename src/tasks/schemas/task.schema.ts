import * as mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 500 },
    description: { type: String, required: true, maxlength: 5000 },
    isOnline: { type: Boolean, required: true },
    deadline: { type: String, default: '', maxlength: 500 },
    coordinates: { type: String, default: '', maxlength: 500 },
    category: { type: String, default: '', maxlength: 500 },
    userId: { type: String, default: '', maxlength: 500 },
  },
  { timestamps: true }, // adds create_at, update_at properties
);

export { TaskSchema };
