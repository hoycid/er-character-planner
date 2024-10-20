import { useState, useEffect } from "react";
import calculateBaseStats from "../services/calculateBaseStats";

const Info = props => {
  const { name, stat, onCalculateStat } = props;
  const [basicStat, setBasicStat] = useState(stat);

  useEffect(() => {
    setBasicStat(calculateBaseStats(name, stat));
  }, [name, stat, onCalculateStat]);

  return (
    <div className="Info">
      <label>{props.name}</label>
      <p className="stat-value">{basicStat}</p>
    </div>
  );
};

export default Info;
