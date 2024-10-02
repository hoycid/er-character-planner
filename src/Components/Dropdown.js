const Dropdown = props => {
  const handleChange = event => {
    props.onSelectClass(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      {Object.keys(props.classes).map(key => (
        <option key={key}>{key}</option>
      ))}
    </select>
  );
};

export default Dropdown;
