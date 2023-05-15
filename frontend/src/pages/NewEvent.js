import { json, redirect } from "react-router-dom";

import EventForm from "../components/EventForm";

const NewEventPage = (props) => {
    return (
        <EventForm />
    )
}

export default NewEventPage;

export const action = async ({request, params}) => {
    const data = await request.formData();

    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    };

    const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })

    if (response.ok === false) {
        throw json({
            message: 'Error on add new Event!'
        },
            {
                status: 500
            });
    }

    return redirect('/events');
}
