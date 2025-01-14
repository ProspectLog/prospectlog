import { useState } from "react"; 
import Container from "./components/Container/Container";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import WeklyStats from "./components/Stats/WeklyStats";


function App() {
  const [count, setCount] = useState(0);


  return (
    <>
     <Container>
        <WeklyStats />
        <AdvancedSearch />
     </Container>
    </>
  );
}

export default App;
