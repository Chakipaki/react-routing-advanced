import { Suspense } from "react";

import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage = (props) => {
    const {event, events} = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={event}>
                    {(fetchedEvent) => <EventItem event={fetchedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={events}>
                    {(fetchedEvents) => <EventsList events={fetchedEvents} />}
                </Await>
            </Suspense>
        </>
    )
}

export default EventDetailPage;

const loadEvent = async (id) => {
    const response = await fetch(`http://localhost:8080/events/${id}`);

    if (response.ok === false) {
        throw json({message: 'Could not fetch details for selected event.'}, {
            status: 500
        })
    } else {
        const data = await response.json();
        return data.event;
    }
}

const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (response.ok === false) {
        return json(
            {message: 'Could not fetch events'},
            {
                status: 500
            }
        );
    } else {
        const data = await response.json()
        return data.events;
    }
}

export const loader = async ({request, params}) => {
    const { eventId: id } = params;

    return defer({
        event: await loadEvent(id),
        events: loadEvents()
    })

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
