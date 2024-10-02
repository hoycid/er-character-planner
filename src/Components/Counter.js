import { useState, useEffect } from "react";
import { useLevel } from "../Providers/LevelContext";

const Counter = props => {
  const [count, setCount] = useState(Number(props.count));
  const [input, setInput] = useState(count);

  const { level, setLevel } = useLevel();

  const increaseCount = () => {
    if (count < 99) {
      setInput(count + 1);
      setCount(count + 1);
      setLevel(level + 1);
    }
  };

  const decreaseCount = () => {
    if (count > props.count) {
      setInput(count - 1);
      setCount(count - 1);
      setLevel(level - 1);
    }
  };

  const onBlurHandler = () => {
    if (input < 99) {
      if (input > count) {
        setLevel(level + (input - count));
      } else if (input <= props.count) {
        setLevel(level - (count - props.count));
        setCount(props.count);
        setInput(props.count);
      } else {
        setLevel(level - (count - input));
      }
      setCount(Number(input));
    }
    if (input >= 99) {
      setInput(99);
      setCount(99);
      setLevel(level + (99 - count));
    }
  };

  useEffect(() => {
    setCount(props.count);
    setInput(props.count);
  }, [props.count]);

  return (
    <>
      <div>
        <p>{props.name}</p>
        <button onClick={decreaseCount}>-</button>
        <input
          id={props.name}
          value={input}
          onChange={e => {
            setInput(Number(e.target.value));
          }}
          onBlur={onBlurHandler}
        />
        <button onClick={increaseCount}>+</button>
      </div>
    </>
  );
};

export default Counter;
