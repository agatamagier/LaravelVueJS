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

export interface LaravelResponseCollection<T> {
  data: T[];
  links: {
    url: string | null;
    label: string | null;
    active: boolean | null;
  }[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  path: string | null;
  first_page_url: string | null;
  last_page_url: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export type PostForm = {
  title: string;
  body: string;
}
