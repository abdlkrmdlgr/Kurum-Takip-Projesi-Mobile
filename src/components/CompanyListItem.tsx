import {
  IonItem,
  IonLabel,
  IonNote,
  IonThumbnail,
  IonImg, IonBadge,
  IonIcon

} from '@ionic/react';
import { useState, useEffect } from 'react';
import './CompanyListItem.css';
import { happyOutline, sadOutline } from 'ionicons/icons';


const CompanyListItem = ({ data }: { data: any }) => {
  const [companyData, setCompanyDetailData] = useState<number>(0);
  const [companyDataLimitCounter, setCompanyDataLimitCounter] = useState<number>(0);
  useEffect(() => {
    var i = 0;
    var total = 0;
    var counter = 0;

    for (i; i < data.kurum_detays.length; i++) {
      total += data.kurum_detays[i].kurum_verisi;
      if (data.kurum_detays[i].kurum_verisi > data.kurum_detays[i].ikinci_kirilim) {
        counter += 1;
      }

    }
    setCompanyDetailData(total);
    setCompanyDataLimitCounter(counter);



  }, [data]);
  return (
    <IonItem routerLink={`/company/${data.id}`} detail={false} class="ion-margin-horizontal">
      <IonThumbnail>
        <IonImg src={process.env.REACT_APP_URL+ data.logo.url} />
      </IonThumbnail>
      <IonLabel>
        <h2>
          {data.kurum_adi}


        </h2>
        <h3>{data.surum}</h3>
      </IonLabel>
      {companyData > 4 ? (<IonIcon icon={sadOutline} color="danger"></IonIcon>)
        : companyData > 2 ? (<IonIcon icon={sadOutline} color="primary"></IonIcon>)
          : companyData > 0 ? (<IonIcon icon={happyOutline} color="warning"></IonIcon>)
            : <IonIcon icon={happyOutline} color="success"></IonIcon>}

    </IonItem>
  );
};

export default CompanyListItem;
