function ConditionalExample() {
  const isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? <h2>Welcome Back!</h2> : <h2>Please Log In</h2>}
    </div>
  );
}

export default ConditionalExample;
