type ProspectCardProps = {
    cardData: {
      name: string;
      contactedBy: string;
      phone: string;
      origin: string;
      job: string;
      recall: string;
      society: string;
      createdAt: string;
      updatedAt: string;
    };
    status: "pending" | "not now" | "confirm" | "dead";
  };
