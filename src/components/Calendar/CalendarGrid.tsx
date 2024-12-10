import React from 'react';
import { format } from 'date-fns';
import { CalendarDay, Event } from '../../types/calendar';
import { Check, Trash2 } from 'lucide-react';

interface CalendarGridProps {
  days: CalendarDay[];
  onDayClick: (date: Date) => void;
  onEventComplete: (eventId: string, date: Date) => void;
  onEventDelete: (eventId: string, date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  onDayClick,
  onEventComplete,
  onEventDelete,
}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleEventClick = (e: React.MouseEvent, event: Event, date: Date) => {
    e.stopPropagation();
  };

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-7">
      {weekDays.map((day) => (
        <div
          key={day}
          className="p-2 text-center text-sm font-semibold text-gray-600 border-b"
        >
          {day}
        </div>
      ))}
      {days.map((day, idx) => (
        <div
          key={idx}
          onClick={() => onDayClick(day.date)}
          className={`min-h-[100px] p-2 border border-gray-200 ${
            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
          } hover:bg-gray-50 cursor-pointer`}
        >
          <span
            className={`text-sm ${
              day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            {format(day.date, 'd')}
          </span>
          <div className="mt-1 space-y-1">
            {day.events.map((event) => (
              <div
                key={event.id}
                onClick={(e) => handleEventClick(e, event, day.date)}
                className={`text-xs p-1 rounded flex items-center justify-between group ${
                  event.completed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                <span className={event.completed ? 'line-through' : ''}>
                  {event.title}
                </span>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!event.completed && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventComplete(event.id, day.date);
                      }}
                      className="p-1 hover:bg-blue-200 rounded"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventDelete(event.id, day.date);
                    }}
                    className="p-1 hover:bg-blue-200 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};