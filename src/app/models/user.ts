
export enum AccessLevel{
  None,
  Visitor,
  Creator
}

export class User {
  _id: string;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  email: string;
  level: AccessLevel; // Todo: Use map of projects and levels to grand different levels
}