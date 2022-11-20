import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar, CalendarEvent , CalendarModal  ,  FabAddNew} from "../";
import { addHours } from "date-fns";
import { getMessages, localizer } from "../../helpers";
import { useState } from "react";
import {useUiStore , useCalendarStore} from "../../hooks";
import {FabDelete} from "../components/FabDelete";


export const CalendarPages = () => {
  const { events  , setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = () => {
    console.log({ viewChanged: event });
    openDateModal();
  };

  const onSelect = (event) => {
    //console.log({ click: event });
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem('lastView' , event);
    setLastView(event)
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
        <CalendarModal /> 
        <FabAddNew />
        <FabDelete />
    </>
  );
};
