const Dropdown = props => {
  const handleChange = event => {
    props.onSelectClass(event.target.value);
  };

  return (
    <div className="Dropdown">
      <label>{props.name}</label>
      {props.isDisabled ? (
        <select value={props.selected} onChange={handleChange} disabled>
          {Object.keys(props.classes).map(key => (
            <option key={key}>{key}</option>
          ))}
        </select>
      ) : (
        <select value={props.selected} onChange={handleChange}>
          {Object.keys(props.classes).map(key => (
            <option key={key}>{key}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Dropdown;
