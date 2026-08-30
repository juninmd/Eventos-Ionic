export interface Event {
  IDEVENTO?: number;
  DATA?: Date | string;
  TITULO?: string;
  DESCRICAO?: string;
  [key: string]: unknown;
}

export interface Message {
  userMessage?: string;
  developerMessage?: string;
}
