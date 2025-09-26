import HomePage from "./routes/homepage/homepage";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ListPage from "./routes/Listpage/listpage";
import {Layout, RequireAuth } from "./routes/Layout/layout";
import Login from "./routes/LoginPage/login";
import Signup from "./routes/Signup/signup";
import SinglePage from "./routes/SinglePage/singlepage";
import ProfilePage from "./routes/ProfilePage/profilePage";
import ProfileUpdatePage from "./routes/profileUpdatepage/profileUpdate";
import NewPostPage from "./routes/newPostpage/newPostpage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader:listPageLoader,
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signin",
          element:<Signup/>
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader: singlePageLoader,
        },
      ],
    },
    {
      //path:"/",
      element:<RequireAuth/>,
      children:[{
          path:"/profile",
          element:<ProfilePage/>,
          loader: profilePageLoader,
        },
      {
 path:"/profile/update",
          element:<ProfileUpdatePage/>,
      },
    {
      path:"/newpost",
          element:<NewPostPage/>,
      },
    ],
    },
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;



