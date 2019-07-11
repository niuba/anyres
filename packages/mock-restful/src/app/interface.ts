export interface IQueryResults<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
export interface IQuery {
  limit?: number;
  offset?: number;
  fields?: string;
  is_delete?: boolean;
  ordering?: string;
}
