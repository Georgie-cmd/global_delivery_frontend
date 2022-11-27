import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/Error";
import MainPage from "./pages/Main";
import MainMap from './pages/Map';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/map' element={<MainMap />} />
        
        <Route path='/error' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
