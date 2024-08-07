export interface UserInterface {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  followers: number;
  posts: number;
  createdAt?: Date;
}

export interface BlogUser {
  id: string;
}
