import { useState } from "react"; 
import Container from "./components/Stats/Container/Container";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import WeklyStats from "./components/Stats/WeklyStats";
import UserInfo from "./components/Stats/UserInfo";
import MonthlyStats from "./components/Stats/MonthlyStats";


function App() {
  const [count, setCount] = useState(0);


  return (
    <>
     <Container>
      
        <div className="flex items-end justify-between">
          <WeklyStats />
          <UserInfo />
        </div>
          <MonthlyStats />

        <AdvancedSearch />
     </Container>
    </>
  );
}

export default App;
