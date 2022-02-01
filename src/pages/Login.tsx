
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {
  IonApp, IonRouterOutlet, IonLoading, IonPage, IonHeader, IonAlert, IonToolbar, IonContent, IonGrid, IonTitle, IonRow, IonCol, IonIcon, IonItem, IonLabel, IonInput, IonButton, useIonAlert,
  IonImg
} from '@ionic/react';
import './Login.css';

import { personCircle } from "ionicons/icons";
import axios from 'axios';
import { workerData } from 'worker_threads';


type Props = {
  token: string;
  setToken: (val: string) => void;

};

const Login: React.FC<Props> = ({ token, setToken }) => {



  const [present] = useIonAlert();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState(false);

  let history = useHistory();

  const handleLogin = async () => {

    if (!email && !password) {

      setMessage("Lütfen kullanıcı adınızı ve parolanızı girmeyin");
      setLoginError(true);
      return;
    }
    if (!email) {

      setMessage("Kullanıcı adı eksik");
      setLoginError(true);
      return;
    }
    if (!password) {
      setMessage("Parola eksik");
      setLoginError(true);
      return;
    }
/*
    if (password.length < 8) {
      setMessage("Parola en az 8 karakter olmalı");
      setLoginError(true);
      return;
    }

*/

    const user = {
      "email": email,
      "password": password
    }
    if (loginError != true) {
      setShowLoading(true)
      try {
        const { data } = await axios.get('/login', {
          headers: {
            "Access-Control-Allow-Headers":"*"
          },
          auth: {
            username: user.email,
            password: user.password
          }
        });
      
        setToken(data);
        setShowLoading(false)

        setLoginError(false);
        history.push("/home");
        setEmail("");
        setPassword("");

      } catch (error) {
        console.log(error);
        setMessage("kullanıcı adı yada parola yanlış");
        setLoginError(true);
        setShowLoading(false)
      }

    }

  }


  return (
    <IonPage >
      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Lütfen Bekleyin'}
      />

      <IonAlert
        isOpen={loginError}
        onDidDismiss={() => setLoginError(false)}
        cssClass='my-custom-class'
        header={'Hata'}
        message={message}
        buttons={['Tamam']}
      />
      <IonContent className="centercontainer ion-padding ion-text-center">
        <IonGrid className="centered">

          <IonAlert
            isOpen={iserror}
            onDidDismiss={() => setIserror(false)}
            cssClass="my-custom-class"
            header={"Error!"}
            message={message}
            buttons={["Dismiss"]}
          />

          <IonRow>
            <IonCol className="ion-margin-bottom">

              <IonImg  className="ion-margin-top ion-margin-bottom image" src="assets/image/logo_belgenet.png" />

            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-bottom">
            <IonCol >
              <IonItem>
                <IonLabel position="floating"> Kullanıcı Adım</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                >
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-bottom">
            <IonCol >
              <IonItem>
                <IonLabel position="floating"> Parola</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                >
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol>
              <IonButton expand="block" onClick={handleLogin}>Giriş Yap</IonButton>

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );

};

export default Login;
