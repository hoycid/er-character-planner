const Dropdown = props => {
  const handleChange = event => {
    props.onSelectClass(event.target.value);
  };

  return (
    <div className="Dropdown">
      <label>{props.name}</label>
      {props.isDisabled ? (
        <select onChange={handleChange} disabled>
          {Object.keys(props.classes).map(key => (
            <option key={key}>{key}</option>
          ))}
        </select>
      ) : (
        <select onChange={handleChange}>
          {Object.keys(props.classes).map(key => (
            <option key={key}>{key}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Dropdown;
