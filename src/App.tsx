import { Route, Routes } from "react-router-dom";
import MainMap from './pages/Map';



function App() {
  return (
    <>
      <Routes>
        <Route path='/'element={<MainMap />} />
      </Routes>
    </>
  )
}

export default App
