import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from "react";
import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from "../";
import { addHours } from "date-fns";
import { getMessages, localizer } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { FabDelete } from "../components/FabDelete";

export const CalendarPages = () => {
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  //Event Style Getter
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({ event, start, end, isSelected });

    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  //Event Double Click
  const onDoubleClick = () => {
    console.log({ viewChanged: event });
    openDateModal();
  };

  //Event Select
  const onSelect = (event) => {
    //console.log({ click: event });
    setActiveEvent(event);
  };

  //Event ViewChanged
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  //UseEffect Que Reacciona a la Carga de Eventos
  useEffect(() => {
    startLoadingEvents();
  }, []);

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
