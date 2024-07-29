//libary imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//page & component imports
import './index.css';
import RootLayout from './RootLayout';
import AboutUs from './about_us';
import Home from './home';
import Artwork from './artwork';
import Search from './search';
import ProfilePage from './profile_page';
import ArtworkDetail, { loader as ArtDetailData } from './artworkdetailpage';
import ResourceDetail, {
  loader as ResourceDetailData,
} from './resourcedetailpage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/artwork',
        element: <Artwork />,
      },
      {
        path: '/search',
        element: <Search />,
      },

      {
        path: '/profile',
        element: <ProfilePage />,
      },

      {
        path: '/:id', // defaults to the first json document
        loader: ArtDetailData,
        element: <ArtworkDetail />,
      },

      {
        path: '/resources/:id', //have to put specific path when using different id.
        loader: ResourceDetailData,
        element: <ResourceDetail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
