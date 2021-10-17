import { useState, StrictMode, lazy, Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import ThemeContext from "./ThemeContext";

const Details = lazy(()=> import("./Details"))
//lazy returns it into a promise, that sets this to a component
const SearchParams = lazy(()=> import("./SearchParams"))

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div
      className="p-0 m-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg"
      }}
      //signifies to tailwind that we want 0 padding and 0 margin
      >
        <h2>this h2 wont go away</h2>
        {/* //if you are waiting for something to load using lazy then use the fallback
        assignment to run while they are waiting */}
        <Suspense fallback={<h2>loading route...</h2>}>
          <Router>
            <header
              className="w-full m-10 text-center p-7 bg-gradient-to-b
              from-purple-400 via-pink-500 to-red-500"
            >
              {/* tail wind classes being called here */}
              <Link to="/" className="text-6xl text-white hover:text-gray-500">Adopt Me!</Link>
            </header>
            <Switch>
              <Route path="/details/:id">
                <Details />
              </Route>
              <Route path="/">
                <SearchParams />
              </Route>
            </Switch>
          </Router>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
