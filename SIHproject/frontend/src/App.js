import { Routes, Route } from "react-router-dom";
import Stop from "./Components/new stop/stop";
import Path from "./Components/Route/route";
import Bus from "./Components/Buses/bus";
import Addbus from "./Components/Buses/addbus";

function App() {
  return (
    <Routes>
      <Route path="/Addstop" element={<Stop></Stop>}></Route>
      <Route path="/Addroute" element={<Path></Path>}></Route>
      <Route path="/Monitorbuses" element={<Bus></Bus>}></Route>
      <Route path="/Monitorbuses/addbus" element={<Addbus></Addbus>}></Route>
    </Routes>
  );
}
export default App;