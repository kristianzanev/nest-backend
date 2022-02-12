import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  description: String,
  email: String,
  password: String,
  username: String,
});
