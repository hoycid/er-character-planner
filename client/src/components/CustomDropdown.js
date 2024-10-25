import React, { useEffect, useState } from "react";

const CustomDropdown = props => {
  const [input, setInput] = useState(""); // State for the input value
  const [optionsShown, setOptionsShown] = useState(false); // State to show/hide options

  useEffect(() => {
    setInput(props.selected); // Initialize input from props
  }, [props.selected]);

  const handleChange = event => {
    const value = event.target.value;
    setInput(value);
    setOptionsShown(value.length > 0); // Show options only if input is not empty
  };

  const handleBlur = () => {
    // Delay closing the dropdown to allow the option click to register
    setTimeout(() => {
      const match = props.choices.find(choice => input === choice);
      if (match) {
        props.onSelect(input); // Confirm selection
      } else {
        setInput("");
      }
      setOptionsShown(false);
    }, 150);
  };

  const showOptions = () => {
    setOptionsShown(prev => !prev); // Toggle options visibility
  };

  const handleOptionClick = option => {
    setInput(option);
    props.onSelect(option); // Pass selected option back
    setOptionsShown(false); // Hide options after selection
  };

  // Filter choices based on input value
  const filteredChoices = props.choices.filter(choice =>
    choice.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="dropdownContainer" tabIndex={0} onBlur={handleBlur}>
      <input
        value={input}
        onChange={handleChange}
        onClick={showOptions}
        placeholder={props.name}
      />
      {optionsShown && (
        <div className="dropdownOptions">
          {filteredChoices.length > 0 ? (
            filteredChoices.map((element, index) => (
              <div
                key={index}
                className="dropdownOption"
                onMouseDown={() => handleOptionClick(element)} // Use onMouseDown instead of onClick
              >
                {element}
              </div>
            ))
          ) : (
            <div className="dropdownOption">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
