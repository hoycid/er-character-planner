import { useState, useEffect } from "react";
import { useLevel } from "../providers/LevelProvider";
import Button from "./Button";

const Counter = props => {
  const [count, setCount] = useState(Number(props.count));
  const [input, setInput] = useState(count);

  const { level, setLevel } = useLevel();

  const initialValue = props.initCount;

  const increaseCount = () => {
    if (count < 99) {
      setInput(count + 1);
      setCount(count + 1);
      setLevel(level + 1);
      props.onAlterStat(props.name, count + 1);
    }
  };

  const decreaseCount = () => {
    if (count > initialValue) {
      setInput(count - 1);
      setCount(count - 1);
      setLevel(level - 1);
      props.onAlterStat(props.name, count - 1);
    }
  };

  const onBlurHandler = () => {
    const maxLimit = 99;
    let newInput = input;

    if (newInput !== initialValue) {
      if (newInput < initialValue) {
        newInput = initialValue;
      } else if (newInput >= maxLimit) {
        newInput = maxLimit;
      }

      setInput(newInput);
      setCount(newInput);
      setLevel(level + (newInput - initialValue));
    }

    if (newInput < maxLimit && newInput !== count) {
      setLevel(level + (newInput - count));
      setCount(newInput);
    }

    props.onAlterStat(props.name, newInput);
  };

  useEffect(() => {
    setCount(props.count);
    setInput(props.count);
  }, [props.count]);

  return (
    <div className="Counter">
      <label>{props.name}</label>
      <Button onClick={decreaseCount}>-</Button>
      <input
        className="stat-value"
        id={props.name}
        value={input}
        onChange={e => {
          setInput(Number(e.target.value));
        }}
        onBlur={onBlurHandler}
      />
      <Button onClick={increaseCount}>+</Button>
    </div>
  );
};

export default Counter;
