import { useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import GridContext from "../GridContext";
import { useFirstRender } from "../hooks/useFirstRender";

const Grid = () => {
  const {
    numberOfColumns,
    colGap,
    colGapUnit,
    rowGap,
    rowGapUnit,
    gutter,
    gutterUnit,
    maxWidth,
    maxWidthUnit,
    items,
    itemHovered,
    colMatrix,
    updateColWidth,
    updateColWidthUnit
  } = useContext(GridContext);
  const firstRender = useFirstRender();
  const [gridColStyle, setGridColStyle] = useState(
    `repeat(${numberOfColumns}, auto)`
  );

  let styles = {
    gridTemplateColumns: gridColStyle,
    columnGap: colGap ? `${colGap}${colGapUnit}` : "0",
    rowGap: rowGap ? `${rowGap}${rowGapUnit}` : "0",
    padding: gutter ? `0 ${gutter}${gutterUnit}` : "0",
    maxWidth: maxWidth ? `${maxWidth}${maxWidthUnit}` : "none"
  };

  const createColumns = (hideUI = false) => {
    let cols = [];
    // map over `colMatrix` array to generate a column for each object
    colMatrix.map((col) => {
      if (hideUI) {
        cols.push(
          <div key={col.index} className="l-Columns__col">
            <span>{col.index}</span>
          </div>
        );
      } else {
        cols.push(
          <div key={col.index} className="l-Columns__col">
            <div className="l-Columns__col-width-wrapper">
              <input
                id={`col-${col.index}`}
                type="text"
                value={col.colWidth}
                onChange={(e) => updateColWidth(e, col.index)}
              />
              <div className="[ select-wrapper select-wrapper--inline ]">
                <select
                  value={col.colWidthUnit}
                  onChange={(e) => updateColWidthUnit(e, col.index)}
                >
                  <option value="fr">fr</option>
                  <option value="px">px</option>
                  <option value="em">em</option>
                  <option value="%">%</option>
                </select>
              </div>
            </div>
          </div>
        );
      }
    });
    return cols;
  };

  // update grid styles
  useEffect(() => {
    let gridTemplateColumnsStyle = [];
    if (!firstRender) {
      colMatrix.map((col) => {
        gridTemplateColumnsStyle.push(`${col.colWidth}${col.colWidthUnit}`);
      });
      setGridColStyle(gridTemplateColumnsStyle.join(" "));
    }
  }, [colMatrix, firstRender]);

  return (
    <div className="c-GridVisualisation">
      <Scrollbars
        renderTrackHorizontal={(props) => (
          <div {...props} className="hide-track" />
        )}
        renderTrackVertical={(props) => (
          <div {...props} className="hide-track" />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className="hide-track" />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className="hide-track" />
        )}
        style={{ width: `100%` }}
      >
        <div className="l-Columns" style={styles}>
          {items.map((item) => {
            if (item.colStart && item.colEnd) {
              return (
                <div
                  className={`l-Columns__item ${
                    itemHovered === `block-${item.index}`
                      ? "is-highlighted"
                      : ""
                  }`}
                  key={item.index}
                  style={{
                    gridRowStart: item.rowStart,
                    gridColumnStart: item.colStart,
                    gridColumnEnd: item.colEnd,
                    alignSelf: item.alignSelf,
                    height: `${item.height}px`
                  }}
                >
                  {item.label && (
                    <span className="l-Columns__item-label">{item.label}</span>
                  )}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </Scrollbars>
      <div className="l-GridOverlay" style={styles}>
        {createColumns(false)}
      </div>
      <div className="l-ColNumbers" style={styles}>
        {createColumns(true)}
      </div>
    </div>
  );
};

export default Grid;
