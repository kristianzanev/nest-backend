export interface User {
  id?: string;
  name?: string;
  description?: string;
  tokenVersion?: string;
  username?: string;
  email?: string;
  password?: string;
  isEmailConfirmed?: string;
  tasks?: Array<string>;
}
