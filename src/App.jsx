import Sidebar from './Components/Sidebar/Sidebar';
import { Outlet } from 'react-router';
import { useState } from 'react';
import Login from './routes/Login/Login'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useEffect } from 'react';

function App() {

  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user){
            setLogado(true);
        }
    });

    return unsubscribe;
    }, [])


  if(logado == true){
      return (
        <div id="containerApp">
          <Sidebar
            setterLogout={setLogado}
          />
          <Outlet/>
        </div> 
      );
    } 

      return (
        <Login/> 
      );
    }

export default App;
