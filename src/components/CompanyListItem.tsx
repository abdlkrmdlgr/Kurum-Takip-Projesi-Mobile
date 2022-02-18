import {
  IonItem,
  IonLabel,
  IonNote,
  IonThumbnail,
  IonImg,
  IonBadge,
  IonIcon,
} from "@ionic/react";
import "./CompanyListItem.css";
import { happyOutline, sadOutline } from "ionicons/icons";

const CompanyListItem = ({ data }: { data: any }) => {
  return (
    <IonItem
      routerLink={`/company/${data.id}`}
      detail={false}
      class="ion-margin-horizontal"
    >
      <IonThumbnail>
        <IonImg
          src={`http://localhost:8080/logo/${data.kurum_adi}/${data.kurum_adi}Logo.png`}
        />
      </IonThumbnail>
      <IonLabel>
        <h2>{data.kurum_adi}</h2>
        <h3>{data.surum}</h3>
      </IonLabel>
      <IonIcon icon={happyOutline} color={data.status}></IonIcon>
    </IonItem>
  );
};
//process.env.REACT_APP_URL + data.logo.url
export default CompanyListItem;
