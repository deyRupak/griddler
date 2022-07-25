import React, { useContext } from "react";
import GridContext from "../GridContext";

const ColumnGap = () => {
  const { setColumnGap, setColumnGapUnit, colGap, colGapUnit } = useContext(
    GridContext
  );

  return (
    <div>
      <label htmlFor="colGap">Column gap:</label>
      <div className="inline-flex">
        <input
          id="colGap"
          type="number"
          defaultValue={colGap}
          onKeyDown={(e) => setColumnGap(e)}
        />
        <div className="[ select-wrapper select-wrapper--inline ]">
          <select
            defaultValue={colGapUnit}
            onChange={(e) => setColumnGapUnit(e.target.value)}
          >
            <option value="px">px</option>
            <option value="em">em</option>
            <option value="%">%</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ColumnGap;
