import { useState, useEffect } from "react";
import calculateBaseStats from "../services/calculateBaseStats";

const Info = props => {
  const [basicStat, setBasicStat] = useState(props.stat);

  useEffect(() => {
    if (props.onCalculateStat) {
      setBasicStat(calculateBaseStats(props.name, props.stat));
      props.onCalculateStat(props.name, basicStat);
    } else {
      setBasicStat(props.stat);
    }
  }, [props.stat]);

  return (
    <div className="Info">
      <label>{props.name}</label>
      <p className="stat-value">{basicStat}</p>
    </div>
  );
};

export default Info;
