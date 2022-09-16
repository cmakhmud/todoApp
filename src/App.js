import {BrowserRouter , Route , Routes} from 'react-router-dom';
import MainPage from "./Pages/MainPage";
import Adduser from './components/adduser';
import UpdateUser from './components/updateUser';
import LiteDarkProvider from './providers/liteDarkProvider';
function App() {
  return (
    <LiteDarkProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/todos/addpage" element={<Adduser/>}/>
          <Route path='/todos/:id' element={<UpdateUser/>}/>
        </Routes>
      </BrowserRouter>
    </LiteDarkProvider>
    
  );
}

export default App;
