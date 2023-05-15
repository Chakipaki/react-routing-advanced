import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";

import EventsList from '../components/EventsList';

const EventsPage = (props) => {
    const { events } = useLoaderData();

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) =>  <EventsList events={loadedEvents}/>}
            </Await>
        </Suspense>
    )
}

export default EventsPage;

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

export const loader = () => {
    return defer({
        events: loadEvents()
    })
}
