export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user_id: number;
  created_at: Date;
}
