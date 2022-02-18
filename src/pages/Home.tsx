import { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonSearchbar,
  IonButton,
  IonAlert,
  IonButtons,
  IonIcon,
  IonText,
  IonItem,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";
import "./Home.css";
import CompanyListItem from "../components/CompanyListItem";
import { exitOutline, imageSharp } from "ionicons/icons";
import { chevronDownCircleOutline, refreshOutline } from "ionicons/icons";

type Props = {
  token: string;
};

const Home: React.FC<Props> = ({ token }) => {
  let history = useHistory();

  const [datas, setDatas] = useState<any[]>([]);
  const [searchText, setSearchText]: [string, (searchText: string) => void] =
    useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const refresh = async (e: CustomEvent) => {
    await fetchData();
    e.detail.complete();
  };

  /*
  const toplam = (data: any) => {
    let initialValue = 0;
    let sum = data.kurum_detays.reduce(function (previousValue: any, currentValue: { kurum_verisi: any; }) {
      return previousValue + currentValue.kurum_verisi
    }, initialValue)
    return sum;
  }
  */

  const fetchData = () => {
    axios
      .get("/kurumlar", {
        headers: {
          Authorization: "Basic " + token,
        },
      })
      .then((response) => {
        console.error(response.data);

        // const companyList = response.data.sort((a: any, b: any) => {
        //   return toplam(b)-toplam(a)
        // });
        setDatas(response.data);
      });
  };

  const close = () => {
    history.push("/");
  };

  return (
    <IonPage id="home-page">
      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        header={"Uyarı"}
        message={"Çıkış Yapılsın Mı?"}
        buttons={[
          {
            text: "vazgeç",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {},
          },
          {
            text: "Çıkış Yap",
            handler: () => {
              close();
            },
          },
        ]}
      />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kurumlar</IonTitle>
          {/*  <IonButton color="danger" slot="end" class="ion-padding-end" onClick={() => setShowAlert1(true)} >Çıkış</IonButton> */}
          <IonButtons slot="primary">
            <IonButton onClick={() => setShowAlert1(true)}>
              <IonIcon
                icon={exitOutline}
                slot="end"
                color="danger"
                size="large"
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent
            pullingIcon={refreshOutline}
            pullingText="yenileniyor."
            refreshingSpinner="circles"
            refreshingText="yenileniyor..."
          ></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {datas
            .filter((data) => {
              if (searchText == "") {
                return data;
              } else if (
                data.kurum_adi.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return data;
              }
            })
            .map((kurum) => (
              <CompanyListItem key={kurum.kurum_adi} data={kurum} />
              /**
                 * <IonItem routerLink={`/company/${kurum.id}`}>
                  <IonThumbnail slot="start">
                    <img src="C:\Users\mkadi\Desktop\source.png" />
                  </IonThumbnail>

                  <IonLabel>
                    <h2>{kurum.kurum_adi}</h2>
                    <p>
                      Kurum Detay İlk ve İkinci Kirilim Toplamı ={" "}
                      {kurum.kurumDetayIlkKirilimToplam +
                        kurum.kurumDetayIkinciKirilimToplam}
                    </p>
                  </IonLabel>
                </IonItem>
                 */
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
