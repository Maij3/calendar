import { parseISO } from "date-fns";
import { events } from "../store";

export function convertEventDateEvents(events = []) {
  return events.map((event) => {
    event.end = parseISO(event.end);
    event.start = parseISO(event.start);
    return event;
  });
}
