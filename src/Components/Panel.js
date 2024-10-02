const Panel = props => {
  return (
    <>
      <h1>{props.title}</h1>
      {props.children}
    </>
  );
};

export default Panel;
