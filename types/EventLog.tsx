export interface EventLog {
  id: number;
  watts_used: number;
  water_used: number;
  cost: number;
  created_at: string;
  is_active: boolean;
}
