export class User {
  id!: string;
  title!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  role!: string;
  displayName!: string;
  created!: Date;
  isVerified!: boolean;
  jwtToken!: string;
}