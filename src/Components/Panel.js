const Panel = props => {
  return (
    <div className="panel">
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
};

export default Panel;
