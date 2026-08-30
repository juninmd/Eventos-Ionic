import { Event } from './event.model';

export interface EventDetail extends Event {
  IDDETALHE?: number;
  IDEVENTO?: number;
  DESC?: string;
}
