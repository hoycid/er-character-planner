import { useState } from "react";

const Input = props => {
  const { name } = props;
  const [input, setInput] = useState("Tarnished");

  const handleOnChange = e => {
    const val = e.target.value;
    setInput(val);
  };

  const handleOnBlur = () => {
    if (input === "") {
      setInput(input);
    }
  };

  return (
    <>
      <label>{name}</label>
      <input
        name={name}
        id={name}
        onChange={handleOnChange}
        value={input}
        onBlur={handleOnBlur}
      />
    </>
  );
};

export default Input;
