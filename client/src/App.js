/** @format */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/default.component";
import { Fragment } from "react";
import { routers } from "./routers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routers.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultComponent : Fragment;
          return (
            <Route
              path={route.path}
              key={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
