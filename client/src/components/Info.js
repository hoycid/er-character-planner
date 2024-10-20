import { useState, useEffect } from "react";
import calculateBaseStats from "../services/calculateBaseStats";

const Info = props => {
  const { name, stat, onCalculateStat } = props;
  const [basicStat, setBasicStat] = useState(stat);

  const isCalculatingStats = onCalculateStat ? true : false;

  const calculateStats = () => {
    onCalculateStat(name, basicStat);
  };

  useEffect(() => {
    if (isCalculatingStats) {
      setBasicStat(calculateBaseStats(name, stat));
      calculateStats();
    } else {
      setBasicStat(stat);
    }
  }, [name, stat, basicStat, isCalculatingStats, calculateStats]);

  return (
    <div className="Info">
      <label>{props.name}</label>
      <p className="stat-value">{basicStat}</p>
    </div>
  );
};

export default Info;
