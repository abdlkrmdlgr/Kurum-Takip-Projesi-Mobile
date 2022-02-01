import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Pages */
import Login from './pages/Login';
import Home from './pages/Home';
import CompanyDetail from './pages/CompanyDetail';
import axios from 'axios';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useState } from 'react';

axios.defaults.baseURL = process.env.REACT_APP_URL

const App: React.FC = () => {


  const [token, setToken] = useState<string>('');
  return (

    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login" component={() => <Login setToken={setToken} token={token} />} exact={true} />
          <Route path="/home" exact={true}>
            <Home setToken={setToken} token={token} />
          </Route>
          <Route path="/company/:id">
            <CompanyDetail setToken={setToken} token={token} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}


export default App;
