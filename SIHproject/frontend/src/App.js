import { Routes, Route } from "react-router-dom";
import Stop from "./Components/new stop/stop";
import Path from "./Components/Route/route";

function App() {
  return (
    <Routes>
      <Route path="/Addstop" element={<Stop></Stop>}></Route>
      <Route path="/Addroute" element={<Path></Path>}></Route>
    </Routes>
  );
}
export default App;