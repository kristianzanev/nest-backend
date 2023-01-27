import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, maxlength: 500 },
    username: { type: String, required: true, unique: true, maxlength: 500 },
    password: { type: String, required: true, maxlength: 500 },
    name: { type: String, default: '', maxlength: 500 },
    description: { type: String, default: '', maxlength: 5000 },
    isEmailConfirmed: { type: Boolean, default: false },
    tokenVersion: String,
  },
  { timestamps: true }, // adds create_at, update_at properties
);

// this pre save func is necessary because if you put the ObjectId directly as
// default in the tokenVersion UserSchema all user models will use the same id
UserSchema.pre('save', function (next) {
  if (!this.tokenVersion) this.tokenVersion = new mongoose.Types.ObjectId();
  next();
});

export { UserSchema };
