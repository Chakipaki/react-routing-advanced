import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEventPage = (props) => {
    const data = useRouteLoaderData('event-detail');

    return (
       <EventForm event={data.event} />
    )
}

export default EditEventPage;
