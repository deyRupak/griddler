import React, { useContext } from "react";
import GridContext from "../GridContext";

const MaxWidth = () => {
  const {
    setContainerMaxWidth,
    maxWidthUnit,
    setContainerMaxWidthUnit
  } = useContext(GridContext);

  return (
    <div>
      <label htmlFor="maxWidth">Max width:</label>
      <div className="inline-flex">
        <input
          id="maxWidth"
          type="number"
          onInput={(e) => setContainerMaxWidth(e.target.value)}
        />
        <div className="[ select-wrapper select-wrapper--inline ]">
          <select
            defaultValue={maxWidthUnit}
            onChange={(e) => setContainerMaxWidthUnit(e.target.value)}
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

export default MaxWidth;
