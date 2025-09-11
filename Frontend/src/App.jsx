import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import Login from "./components/Users/Login";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />

          {/* Add other routes here */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
