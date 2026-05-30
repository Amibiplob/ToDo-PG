export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export interface Todo {
  id: number;
  user_id: number;
  title: string;
  completed: boolean;
  created_at: string;
}
