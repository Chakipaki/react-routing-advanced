import { useParams } from "react-router-dom";

const EventDetailPage = (props) => {
    const params = useParams();

    return (
        <h1>
            Event Detail Page: {params.eventId}
        </h1>
    )
}

export default EventDetailPage;
