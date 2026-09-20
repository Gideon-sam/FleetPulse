function ListExample() {
  const fruits = ["Apple", "Banana", "Cherry"];
  return (
    <div>
      <h2>List Example</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListExample;
