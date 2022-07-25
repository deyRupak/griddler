import React, { useContext } from "react";
import GridContext from "../GridContext";

const RowGap = () => {
  const { setRGap, setRGapUnit, rowGap, rowGapUnit } = useContext(GridContext);

  return (
    <div>
      <label htmlFor="rowGap">Row gap:</label>
      <div className="inline-flex">
        <input
          id="rowGap"
          type="number"
          defaultValue={rowGap}
          onKeyDown={(e) => setRGap(e)}
        />
        <div className="[ select-wrapper select-wrapper--inline ]">
          <select
            defaultValue={rowGapUnit}
            onChange={(e) => setRGapUnit(e.target.value)}
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

export default RowGap;
