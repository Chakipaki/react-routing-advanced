import {json, redirect, useRouteLoaderData} from "react-router-dom";

import EventItem from "../components/EventItem";

const EventDetailPage = (props) => {
    const data = useRouteLoaderData('event-detail');
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

export const action = async ({request, params}) => {
    const { eventId: id } = params;

    const response = await fetch(`http://localhost:8080/events/${id}`, {
        method: request.method
    });

    if (response.ok === false) {
        throw json({message: 'Could not delete event.'}, {
            status: 500
        })
    }

    return redirect('/events');
}
