import { json, useLoaderData } from "react-router-dom";

import EventItem from "../components/EventItem";

const EventDetailPage = (props) => {
    const data = useLoaderData();
    const event = data.event;

    return (
        <EventItem event={event} />
    )
}

export default EventDetailPage;

export const loader = async ({request, params}) => {
    const { eventId: id } = params;

    const response = await fetch(`http://localhost:8080/events/${id}`);

    if (response.ok === false) {
        throw json({message: 'Could not fetch details for selected event.'}, {
            status: 500
        })
    } else {
        return response;
    }
}
