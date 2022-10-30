import Home from "./pages/home/Home";
import Edit from "./pages/edit/Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Delete from "./pages/delete/Delete";
import Add from "./pages/add/Add";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/delete/:id" element={<Delete />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
