import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventDateEvents } from "../helpers";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  //Set Active Event
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  //Start Saving Event
  const startSavingEvent = async (calendarEvent) => {
    try {
      //TODO: Update Event
      if (calendarEvent.id) {
        //Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //Creando
      const { data } = await calendarApi.post("/events", calendarEvent);
      console.log(data);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al Guardar", error.response.data?.msg, "error");
    }
  };

  //Start Deleted Event
  const startDeleteEvent = async () => {
    //Todo Debe de LLegar al backend
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error Al Eliminar", error.response.data.msg, "error");
    }
  };

  //Start Loading Events
  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
      console.log({ events });
    } catch (error) {
      console.log("Error Cargado Eventos");
      console.log(error);
    }
  };

  return {
    events,
    hasEventSelected: !!activeEvent,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  };
};
