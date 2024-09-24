import { Exclude } from "class-transformer";

export class PublicUserDto {
  id: string
  email: string;
  username: string;

  @Exclude()
  password?: string;
}
