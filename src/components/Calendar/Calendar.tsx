import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { EventForm } from './EventForm';
import { getCalendarDays } from '../../utils/dateUtils';
import { Event, CalendarDay } from '../../types/calendar';

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<CalendarDay[]>(getCalendarDays(currentDate));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    setDays(getCalendarDays(newDate));
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    setDays(getCalendarDays(newDate));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
    };

    setDays((prevDays) =>
      prevDays.map((day) =>
        day.date.toDateString() === eventData.date.toDateString()
          ? { ...day, events: [...day.events, newEvent] }
          : day
      )
    );
  };

  const handleEventComplete = (eventId: string, date: Date) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.date.toDateString() === date.toDateString()
          ? {
              ...day,
              events: day.events.map((event) =>
                event.id === eventId
                  ? { ...event, completed: true }
                  : event
              ),
            }
          : day
      )
    );
  };

  const handleEventDelete = (eventId: string, date: Date) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.date.toDateString() === date.toDateString()
          ? {
              ...day,
              events: day.events.filter((event) => event.id !== eventId),
            }
          : day
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarGrid
        days={days}
        onDayClick={handleDayClick}
        onEventComplete={handleEventComplete}
        onEventDelete={handleEventDelete}
      />
      {showEventForm && selectedDate && (
        <EventForm
          selectedDate={selectedDate}
          onSave={handleSaveEvent}
          onClose={() => setShowEventForm(false)}
        />
      )}
    </div>
  );
};