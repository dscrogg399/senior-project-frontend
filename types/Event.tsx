export interface Event {
  id: number;
  appliance_id: number;
  log_id: number;
  on_at: string;
  off_at: string;
  watts_used: number;
  water_used: number;
  cost: number;
  created_at: string;
  is_active: boolean;
}
