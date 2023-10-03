import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarvelCharacterList from "./pages/characterList";
import CharacterProfile from "./pages/characterProfile";
import Header from "./components/header";
function App() {
    return (
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path="/" element={<MarvelCharacterList />} />
                <Route path="/character/:id" element={<CharacterProfile/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
