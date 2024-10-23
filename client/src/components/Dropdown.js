const Dropdown = props => {
  const handleChange = event => {
    props.onSelect(event.target.value);
  };

  return (
    <div className="Dropdown">
      <label>{props.name}</label>
      {props.isDisabled ? (
        <select value={props.selected} onChange={handleChange} disabled>
          {props.choices.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </select>
      ) : (
        <select value={props.selected} onChange={handleChange}>
          {props.choices.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Dropdown;
