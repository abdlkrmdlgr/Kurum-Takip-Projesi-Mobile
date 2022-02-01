import { useState, useEffect } from 'react';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter, IonThumbnail,
  IonImg,
  IonText,
  IonCol,
  IonGrid,
  IonRow,
  IonSpinner,
  IonLoading

} from '@ionic/react';

import { useParams } from 'react-router';
import './CompanyDetail.css';
import axios from "axios";


type Props = {
  token: string;
  setToken: (val: string) => void;

};


const CompanyDetail: React.FC<Props> = ({ token, setToken }) => {

  const [companyName, setCompanyName] = useState('');
  const [companyImage, setCompanyImage] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [companyDetails, setCompanyDetails] = useState<any[]>([]);
  const [detailsList, setDetailsList] = useState<any[]>([]);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    var id = parseInt(params.id);
    getDetailListe();

    axios.get('/kurumlars/' + id, {
      headers: {
        Authorization:
          'Bearer ' + token,
      },
    }).then(response => {

      setCompanyName(response.data.kurum_adi);
      setCompanyDetails(response.data.kurum_detays)


      setCompanyImage(process.env.REACT_APP_URL + response.data.logo.url);
      setShowLoading(false);

    });
  }, []);
  const getDetailListe = async () => {
    const detays = await axios.get('detays/').then(response => {
      setDetailsList(response.data)
    });


  }
  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Lütfen Bekleyin'}
        />

        <IonGrid className="ion-padding">
          <IonRow className="ion-align-items-center">
            <IonCol size="2" >

              <IonThumbnail>
                <IonImg src={companyImage} />

              </IonThumbnail>
            </IonCol>
            <IonCol>

              <h3>
                {companyName}
              </h3>
            </IonCol>
          </IonRow>

          {companyDetails.map(companyDetail => (
            <IonRow key={companyDetail.detay_id} className="ion-align-items-center">
              <IonCol>
                <h5>
                  {detailsList[companyDetail.detay_id - 1].adi}

                </h5>
              </IonCol>
              <IonCol size="2" className="ion-text-end">


                {companyDetail.kurum_verisi > companyDetail.ikinci_kirilim ? (
                  <IonText color="danger" >
                    <h5>
                      {companyDetail.kurum_verisi}
                    </h5>
                  </IonText>)
                  : companyDetail.kurum_verisi > companyDetail.ilk_kirilim ? (
                    <IonText color="warning" >
                      <h5>
                        {companyDetail.kurum_verisi}
                      </h5>
                    </IonText>)
                    : <IonText color="success" >
                      <h5>
                        {companyDetail.kurum_verisi}
                      </h5>
                    </IonText>
                }

              </IonCol>
            </IonRow>

          )
          )}


        </IonGrid>

      </IonContent>
    </IonPage>
  );
}

export default CompanyDetail;
