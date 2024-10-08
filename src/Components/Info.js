import { useState, useEffect } from "react";
import { calculateHealth } from "../Utilities/calculateBaseStats";
import { calculateFP } from "../Utilities/calculateBaseStats";

const Info = props => {
  const [basicStat, setBasicStat] = useState(1);

  useEffect(() => {
    if (props.name === "HP") {
      setBasicStat(calculateHealth(props.stat));
    }
    if (props.name === "FP") {
      setBasicStat(calculateFP(props.stat));
    }
  }, [props.stat]);

  return (
    <div>
      <label>{props.name}</label>
      <p>{basicStat}</p>
    </div>
  );
};

export default Info;
