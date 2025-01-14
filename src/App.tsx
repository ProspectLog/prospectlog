import { useState } from "react";
import Container from "./components/Stats/Container/Container";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import WeklyStats from "./components/Stats/WeklyStats";
import UserInfo from "./components/Stats/UserInfo";
import MonthlyStats from "./components/Stats/MonthlyStats";
import Nav from "./components/Nav/Nav";
import ProspectCard from "./components/Card/ProspectCard";

function App() {

  
  const prospectData: ProspectCardProps[] = [
    {
      cardData: {
        name: "Jean Dupont",
        contactedBy: "Alice Martin",
        phone: "+33 6 12 34 56 78",
        origin: "Google Ads",
        job: "Diagnostiqueur immobilier",
        recall: "12-01-2025 à 15h",
        creation: "2025-01-10",
        lastEdit: "2025-01-12",
        society: "ImmoDiag",
      },
      status: "pending",
    },
    {
      cardData: {
        name: "Marie Legrand",
        contactedBy: "Paul Durand",
        phone: "+33 6 87 65 43 21",
        origin: "Facebook",
        job: "Architecte",
        recall: "12-01-2025 à 15h",
        creation: "2025-01-08",
        lastEdit: "2025-01-11",
        society: "ArchDesign",
      },
      status: "not now",
    },
    {
      cardData: {
        name: "Luc Morel",
        contactedBy: "Sophie Bernard",
        phone: "+33 6 98 76 54 32",
        origin: "BAO",
        job: "Agent immobilier",
        recall: "12-01-2025 à 15h",
        creation: "2025-01-05",
        lastEdit: "2025-01-07",
        society: "ImmoPlus",
      },
      status: "confirm",
    },
    {
      cardData: {
        name: "Claire Lefèvre",
        contactedBy: "Thomas Perrin",
        phone: "+33 6 77 88 99 00",
        origin: "LinkedIn",
        job: "Évaluateur de biens",
        recall: "12-01-2025 à 15h",
        creation: "2024-12-30",
        lastEdit: "2025-01-03",
        society: "EvalImmo",
      },
      status: "dead",
    },
  ];
  

  return (
    <>
      <Nav />
      <Container>
        <div className="flex justify-between">
          <WeklyStats />
          <UserInfo />
        </div>
        <MonthlyStats />

        <AdvancedSearch />
        <div className="flex gap-10 mt-10 flex-wrap"> 
          <ProspectCard cardData={prospectData[0].cardData} status={prospectData[0].status} />
          <ProspectCard cardData={prospectData[1].cardData} status={prospectData[1].status} />
          <ProspectCard cardData={prospectData[2].cardData} status={prospectData[2].status} />
          <ProspectCard cardData={prospectData[3].cardData} status={prospectData[3].status} />

        </div>
      </Container>
    </>
  );
}

export default App;
