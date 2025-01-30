type ProspectCardProps = {
  cardData: {
    nom: string;
    contact: string;
    tel: string;
    origine: string;
    metier: string;
    rappel: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  statut: "pending" | "not now" | "confirm" | "dead";
  handleCardClick: (cardData: {
    nom: string;

    contact: string;

    tel: string;

    origine: string;

    metier: string;

    rappel: string;

    createdAt: string;

    updatedAt: string;

    id: string;
  }) => void;
};
