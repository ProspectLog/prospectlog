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
    status: "pending" | "not now" | "confirm" | "dead";
    
  };
