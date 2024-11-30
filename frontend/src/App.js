import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ALL_ROUTES } from "./routes";
import Nav from "./components/Nav";

const App = () => {
  const getRoutes = (routes) => {
    return routes.map((route, index) => {
      const { path, component } = route;
      return <Route key={index} path={path} element={component} />;
    });
  };

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>{getRoutes(ALL_ROUTES)}</Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
