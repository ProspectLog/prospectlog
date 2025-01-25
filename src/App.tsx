import { useState } from "react";
import Container from "./components/Stats/Container/Container";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import WeklyStats from "./components/Stats/WeklyStats";
import UserInfo from "./components/Stats/UserInfo";
import MonthlyStats from "./components/Stats/MonthlyStats";
import Nav from "./components/Nav/Nav";
import ProspectCard from "./components/Card/ProspectCard";
import UpdateModal from "./components/Modal/UpdateModal /UpdateModal";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebaseConfig"; // Assurez-vous d'avoir votre configuration Firebase


function App() {
  const [selectedCard, setSelectedCard] = useState(null); // Pour gérer la carte sélectionnée
  const [isModalOpen, setModalOpen] = useState(false); // Pour gérer l'état de la modal
  const [prospectData, setProspectData] = useState<ProspectCardProps[]>([]);



  useEffect(() => {
    const fetchProspectData = async () => {
      const querySnapshot = await getDocs(collection(db, "prospects"));
      const data = querySnapshot.docs.map(doc => {
        console.log(doc.data());
        
        const docData = doc.data();
        return {
          cardData: {
            name: docData.nom || "",
            contactedBy: docData.contact || "",
            phone: docData.tel || "",
            origin: docData.origine || "",
            job: docData.metier || "",
            recall: docData.rappel || "",
            createdAt: docData.createdAt ? docData.createdAt.toDate().toLocaleString() : "N/A",
            updatedAt: docData.updatedAt ? docData.updatedAt.toDate().toLocaleString() : "N/A",
          },
          statut: docData.statut || "pending",
        };
      });
      setProspectData(data);

      
    };
    
    fetchProspectData();

  }, []);


  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  }

  const handleCardClick = (cardData: any) => {
    setSelectedCard(cardData);
    setModalOpen(true);
  };


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
          {prospectData.map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(card.cardData)}
            >
              <ProspectCard
                key={index}
                cardData={card.cardData}
                status={card.status}
              />
            </div>
          ))}
        </div>
      </Container>

      {isModalOpen && selectedCard && (
        <UpdateModal cardData={selectedCard} onClose={handleCloseModal} ></UpdateModal>
      )}
    </>
  );
}

export default App;
