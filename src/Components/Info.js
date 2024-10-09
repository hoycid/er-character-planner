import { useState, useEffect } from "react";
import calculateBaseStats from "../Utilities/calculateBaseStats";

const Info = props => {
  const [basicStat, setBasicStat] = useState();

  useEffect(() => {
    setBasicStat(calculateBaseStats(props.name, props.stat));
    props.onCalculateStat(props.name, basicStat);
  }, [props.stat]);

  return (
    <div>
      <label>{props.name}</label>
      <p>{basicStat}</p>
    </div>
  );
};

export default Info;
