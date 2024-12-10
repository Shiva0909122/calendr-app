export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  completed?: boolean;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events: Event[];
}