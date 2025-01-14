type ProspectCardProps = {
    cardData: {
      name: string;
      contactedBy: string;
      phone: string;
      origin: string;
      job: string;
      recall: string;
      society: string;
      creation: string;
      lastEdit: string;
    };
    status: "pending" | "not now" | "confirm" | "dead";
  };
