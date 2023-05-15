import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import EventLayout from "./layouts/EventLayout";

import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import EventDetailPage, { loader as eventDetailLoader } from "./pages/EventDetail";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'events',
                element: <EventLayout/>,
                children: [
                    {
                        index: true,
                        element: <EventsPage />,
                        loader: eventsLoader
                    },
                    {
                        path: ':eventId',
                        element: <EventDetailPage />,
                        loader: eventDetailLoader
                    },
                    {
                        path: ':eventId/edit',
                        element: <EditEventPage />
                    },
                    {
                        path: 'new',
                        element: <NewEventPage />
                    }
                ]
            },
        ]
    }
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
