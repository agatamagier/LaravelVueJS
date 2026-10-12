export interface LoginForm {
  email: string,
  password: string
}
export interface RegisterForm {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  body: string;
  published: boolean;
  createdAt: string;
}

export interface LaravelData {
  data: Post[];
  links: any;
  meta: any;
}
