import { useRoutes } from "react-router-dom";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ShowCreator from "./pages/ShowCreator";
import ViewCreator from "./pages/ViewCreator";
import Home from "./pages/Home";
import "./App.css";

function App() {
  let routes = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        { index: true, element: <ShowCreator /> },
        { path: "add", element: <AddCreator /> },
        { path: "view/:id", element: <ViewCreator /> },
        { path: "edit/:id", element: <EditCreator /> },
      ],
    },
    { path: "*", element: <h2>Page Not Found</h2> }
  ]);
  
  return routes;
}

export default App;
