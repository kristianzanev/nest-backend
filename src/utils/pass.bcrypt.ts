import * as bcrypt from 'bcrypt';

export function hashString(string: string): Promise<string> {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(string, salt);
}
