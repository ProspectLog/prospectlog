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
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./config/firebaseConfig"; // Assurez-vous d'avoir votre configuration Firebase

function App() {
  const [selectedCard, setSelectedCard] = useState<
    ProspectCardProps["cardData"] | null
  >(null); // Pour gérer la carte sélectionnée
  const [isModalOpen, setModalOpen] = useState(false); // Pour gérer l'état de la modal
  const [prospectData, setProspectData] = useState<
    { cardData: ProspectCardProps["cardData"]; statut: string }[]
  >([]);
  const [filteredData, setFilteredData] = useState(prospectData);
  const [filters, setFilters] = useState({ origine: "", contact: "" });

  const [origins, setOrigins] = useState<string[]>([]);
  const [contacts, setContacts] = useState<string[]>([]);
  useEffect(() => {
    const fetchProspectData = async () => {
      const querySnapshot = await getDocs(collection(db, "prospects"));
      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();

        // Fonction pour convertir un champ de date
        const formatDate = (dateValue: any) => {
          if (dateValue instanceof Timestamp) {
            return dateValue.toDate().toLocaleString(); // Firestore Timestamp
          } else if (
            typeof dateValue === "string" ||
            typeof dateValue === "number"
          ) {
            return dateValue.toLocaleString(); // Chaîne ou timestamp numérique
          }
        };

        return {
          cardData: {
            nom: docData.nom || "",
            contact: docData.contact || "",
            tel: docData.tel || "",
            origine: docData.origine || "",
            metier: docData.metier || "",
            rappel: docData.rappel || "",
            createdAt: formatDate(docData.createdAt),
            updatedAt: formatDate(docData.updatedAt),
            id: doc.id || "",
          },
          statut: docData.statut || "pending",
        };
      });
      setProspectData(
        data as { cardData: ProspectCardProps["cardData"]; statut: string }[]
      );
      const uniqueOrigins = Array.from(
        new Set(data.map((item) => item.cardData.origine))
      ).filter(Boolean);
      const uniqueContacts = Array.from(
        new Set(data.map((item) => item.cardData.contact))
      ).filter(Boolean);

      setOrigins(uniqueOrigins);
      setContacts(uniqueContacts);
    };

    fetchProspectData();
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCard(null);
  };

  const handleCardClick = (cardData: ProspectCardProps["cardData"]) => {
    setSelectedCard(cardData);
    setModalOpen(true);
  };

  useEffect(() => {
    console.log("Filters changed", filters);
    
    setFilteredData(
      prospectData.filter(
        (prospect) =>
          (filters.origine
            ? prospect.cardData.origine === filters.origine
            : true) &&
          (filters.contact
            ? prospect.cardData.contact === filters.contact
            : true)
      )
    );
  }, [filters, prospectData]);

  return (
    <>
      <Nav />
      <Container>
        <div className="flex justify-between">
          <WeklyStats />
          <UserInfo />
        </div>
        <MonthlyStats />

        <AdvancedSearch origins={origins} contacts={contacts} setFilters={setFilters} />
        <div className="flex gap-10 mt-10 flex-wrap">
          {filteredData.map((card, index) => (
            <div key={index}>
              <ProspectCard
                key={index}
                cardData={card.cardData}
                statut={card.statut}
                handleCardClick={handleCardClick}
              />
            </div>
          ))}
        </div>
      </Container>

      {isModalOpen && selectedCard && (
        <UpdateModal
          cardData={selectedCard}
          onClose={handleCloseModal}
        ></UpdateModal>
      )}
    </>
  );
}

export default App;
