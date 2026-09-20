import { useState } from "react";

function StateExample() {
  const [color, setColor] = useState("Red");

  return (
    <div>
      <h2>My favorite color is {color}!</h2>
      <button onClick={() => setColor("Blue")}>Change Color</button>
    </div>
  );
}

export default StateExample;
