import { useState, useEffect } from "react";

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
  useIonViewWillEnter,
  IonThumbnail,
  IonImg,
  IonText,
  IonCol,
  IonGrid,
  IonRow,
  IonSpinner,
  IonLoading,
  IonItemDivider,
} from "@ionic/react";

import { useParams } from "react-router";
import "./CompanyDetail.css";
import axios from "axios";

type Props = {
  token: string;
};

const CompanyDetail: React.FC<Props> = ({ token }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyImage, setCompanyImage] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [companyDetails, setCompanyDetails] = useState<any[]>([]);
  const [detailsList, setDetailsList] = useState<any[]>([]);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    var id = parseInt(params.id);
    getDetailListe();

    axios
      .get("/kurumlar/" + id, {
        headers: {
          Authorization: "Basic " + token,
        },
      })
      .then((response) => {
        setCompanyName(response.data.kurum_acik_adi);
        setCompanyDetails(response.data.surum);
        setCompanyImage(
          "http://localhost:8080/logo/" +
            response.data.kurum_adi +
            "/" +
            response.data.kurum_adi +
            "Logo.png"
        );
        //  setCompanyImage(process.env.REACT_APP_URL + response.data.logo.url);
        setShowLoading(false);
      });
  }, []);
  const getDetailListe = async () => {
    const detays = await axios
      .get(`kurum_detay/${params.id}`, {
        headers: {
          Authorization: "Basic " + token,
        },
      })
      .then((response) => {
        setDetailsList(response.data);
      });
  };
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
          message={"Lütfen Bekleyin"}
        />

        <IonGrid className="ion-padding">
          <IonRow className="ion-align-items-center">
            <IonCol size="2">
              <IonThumbnail>
                <IonImg src={companyImage} />
              </IonThumbnail>
            </IonCol>
            <IonCol>
              <h3>{companyName}</h3>
            </IonCol>

            <span className="companyDetailListItemLastModifyDate">
              {companyDetails}
            </span>
          </IonRow>

          {detailsList.map((companyDetail) => (
            <IonRow>
              <IonItemDivider>
                <IonGrid>
                  <IonRow key={companyDetail.detayAdi}>
                    <IonCol size="10">
                      <h5>{companyDetail.detayAdi}</h5>
                    </IonCol>
                    <IonCol size="2" className="ion-text-end">
                      {
                        <IonRow>
                          <IonText color={companyDetail.status}>
                            <h6>{companyDetail.kurumVeri}</h6>
                          </IonText>
                        </IonRow>
                      }
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonText>
                      <span className="companyDetailListItemLastModifyDate">
                        Veri Tarihi: {companyDetail.kurumVeriTarih}{" "}
                      </span>
                    </IonText>
                  </IonRow>
                </IonGrid>
              </IonItemDivider>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CompanyDetail;
