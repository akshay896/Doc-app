import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TextEditor from "./pages/TextEditor";
import { useState } from "react";

function App() {
  const [value, setValue] = useState('');

  return (
    <>
      <Routes>
        <Route path="/" element={<Home value={value} setValue={setValue} />} />
        <Route path="/editor/:id" element={<TextEditor value={value} setValue={setValue} />} />
      </Routes>
    </>
  );
}

export default App;
