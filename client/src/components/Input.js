import { useEffect, useState } from "react";

const Input = props => {
  const { name, value, onChangeName } = props;
  const [input, setInput] = useState(props.value);

  useEffect(() => {
    setInput(props.value);
  }, [props.value]);

  const handleOnChange = e => {
    const value = e.target.value;
    setInput(value);
  };

  const handleOnBlur = () => {
    if (input === "") {
      setInput(value);
    } else {
      onChangeName(input);
    }
  };

  return (
    <>
      <label>{name}</label>
      <input
        name={name}
        onChange={handleOnChange}
        value={input}
        onBlur={handleOnBlur}
      />
    </>
  );
};

export default Input;
