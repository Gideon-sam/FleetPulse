function Car(props) {
  return <h3>I am a {props.brand} car!</h3>;
}

function PropsExample() {
  return (
    <div>
      <h2>Props Example</h2>
      <Car brand="Tesla" />
    </div>
  );
}

export default PropsExample;
