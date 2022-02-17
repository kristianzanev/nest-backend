import * as bcrypt from 'bcrypt';

export function hashPass(rawPass: string): Promise<string> {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(rawPass, salt);
}
