import React, { useContext } from "react";
import GridContext from "../GridContext";

const Columns = () => {
  const { setColumns, numberOfColumns } = useContext(GridContext);

  return (
    <div>
      <label htmlFor="numCols">No. of columns:</label>
      <div className="inline-flex">
        <input
          id="numCols"
          type="number"
          defaultValue={numberOfColumns}
          onKeyDown={(e) => setColumns(e)}
          max={40}
        />
      </div>
    </div>
  );
};

export default Columns;
