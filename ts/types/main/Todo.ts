export type Todos = {
  data: TodoType[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
};

export type TodoType = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  is_complete: boolean;
  position: number;
  created_at: string;
};
