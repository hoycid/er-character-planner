const Dropdown = props => {
  const { name, selected } = props;

  const handleChange = event => {
    props.onSelect(event.target.value);
  };

  return (
    <div className="Dropdown">
      <span>
        <label>{name}</label>
      </span>
      {props.isDisabled ? (
        <select value={selected} onChange={handleChange} disabled>
          {props.choices.map((element, index) => (
            <option key={index} value={element}>
              {element}
            </option>
          ))}
        </select>
      ) : (
        <select value={selected} onChange={handleChange}>
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
