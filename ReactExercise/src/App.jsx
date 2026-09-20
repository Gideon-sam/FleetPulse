import Rendering from "./components/Rendering";
import PropsExample from "./components/PropsExample";
import StateExample from "./components/StateExample";
import EventExample from "./components/EventExample";
import ConditionalExample from "./components/ConditionalExample";
import ListExample from "./components/ListExample";
import EffectExample from "./components/EffectExample";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>React Basic Examples</h1>
      <Rendering />
      <PropsExample />
      <StateExample />
      <EventExample />
      <ConditionalExample />
      <ListExample />
      <EffectExample />
    </div>
  );
}

export default App;
