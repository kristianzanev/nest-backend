import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    email: String,
    password: String,
    username: String,
    tokenVersion: String,
  },
  { timestamps: true },
);

UserSchema.pre('save', function (next) {
  if (!this.tokenVersion) this.tokenVersion = new mongoose.Types.ObjectId();
  next();
});

export { UserSchema };
