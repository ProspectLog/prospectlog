

export default function ProspectCard({ cardData , status }: ProspectCardProps) {
    // Définir des styles et des icônes dynamiques en fonction du statut
    const statusIcon =
      status === "pending" ? "😬" : status === "not now" ? "💤" : status === "confirm" ? "🎉" : "💀";
    const bgColor =
      status === "pending"
        ? "bg-blue-500"
        : status === "not now"
        ? "bg-yellow-500"
        : status === "confirm"
        ? "bg-green-500"
        : "bg-gray-900";
  
    return (
      <div className="mb-10 rounded-lg p-4 shadow-customshadow1 border border-gray-300 w-[270px] flex flex-col justify-end  relative">
        <h3 className="text-center text-2xl">{cardData.society}</h3>
        {/* Logo dynamique */}
        <div
          className={`${bgColor} w-[50px] h-[50px] absolute -top-3 rounded-full -right-3 items-center justify-center flex text-2xl`}
        >
          {statusIcon}
        </div>

        
        <div className="mt-3 flex   justify-between">
          <div className="flex gap-2  text-[10px] text-wrap flex-col ">
            <h4><strong>Nom :</strong> <br /> {cardData.name}</h4>
            <h4><strong>Contacté par :</strong> <br /> {cardData.contactedBy}</h4>
            <h4><strong>Tel : </strong><br /> {cardData.phone}</h4>
          </div>
          <div className="flex gap-2 w-[30%]  text-[10px] flex-col ">
            <h4><strong>Origine :</strong> <br />{cardData.origin}</h4>
            <h4><strong>Métier par :</strong> <br /> {cardData.job}</h4>
            <h4><strong>Rappel :</strong> <br />{cardData.recall}</h4>
          </div>
        </div>
        <div className="bg-slate-200 w-full h-[50px] mt-4"></div>
        <div className="w-full flex justify-between mt-2 text-[10px]">
          <h4><strong>Création</strong>   <br />{cardData.creation} </h4>
          <h4><strong>Modifications </strong>  <br />{cardData.lastEdit} </h4>
        </div>
      </div>
    );
  }
  