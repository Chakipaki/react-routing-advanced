import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import EventLayout from "./layouts/EventLayout";

import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import EventDetailPage from "./pages/EventDetail";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
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
                    },
                    {
                        path: ':eventId',
                        element: <EventDetailPage />
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
