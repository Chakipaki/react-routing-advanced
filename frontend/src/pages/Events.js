import { json, useLoaderData } from "react-router-dom";

import EventsList from '../components/EventsList';

const EventsPage = (props) => {
    const data = useLoaderData();
    const events = data.events;

    return (
        <>
            {events && <EventsList events={events}/>}
        </>
    )
}

export default EventsPage;

export async function loader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        return json(
            {message: 'Could not fetch events'},
            {
                status: 500
            }
        );
    } else {
        return response;
    }
}
