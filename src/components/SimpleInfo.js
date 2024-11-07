import { useState, useEffect } from "react";

const SimpleInfo = props => {
  const { name, stat } = props;
  const [basicStat, setBasicStat] = useState(stat);

  useEffect(() => {
    setBasicStat(stat);
  }, [name, stat]);

  return (
    <div className="Info">
      <label>{props.name}</label>
      <p className="stat-value">{basicStat}</p>
    </div>
  );
};

export default SimpleInfo;
