import { useState } from "react"; 
import Container from "./components/Container/Container";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";


function App() {
  const [count, setCount] = useState(0);


  return (
    <>
     <Container>
        <h1>Counter</h1>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <AdvancedSearch />
     </Container>
    </>
  );
}

export default App;
