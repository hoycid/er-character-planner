const Panel = props => {
  return (
    <div className="panel">
      <p>{props.title}</p>
      {props.children}
    </div>
  );
};

export default Panel;
