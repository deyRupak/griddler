import React, { useContext } from "react";
import GridContext from "../GridContext";

const Gutter = () => {
  const { setGridGutter, gutter, gutterUnit, setGridGutterUnit } = useContext(
    GridContext
  );

  return (
    <div>
      <label htmlFor="gutter">Gutter:</label>
      <div className="inline-flex">
        <input
          id="gutter"
          type="number"
          defaultValue={gutter}
          onInput={(e) => setGridGutter(e.target.value)}
        />
        <div className="[ select-wrapper select-wrapper--inline ]">
          <select
            defaultValue={gutterUnit}
            onChange={(e) => setGridGutterUnit(e.target.value)}
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

export default Gutter;
