import {Header, Footer} from "./components";
import {Home} from "./pages";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path=":route/:direction/:stop" element={<Home />} />
            <Route path=":stopId" element={<Home />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
