export interface EventLog {
  pk: number;
  fields: EventLogFields;
}

interface EventLogFields {
  watts_used: number;
  water_used: number;
  cost: number;
  created_at: string;
  is_active: boolean;
}
