function EventExample() {
  function shoot() {
    alert("Goal!");
  }

  return (
    <div>
      <h2>Event Example</h2>
      <button onClick={shoot}>Take the shot!</button>
    </div>
  );
}

export default EventExample;
