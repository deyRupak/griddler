import React, { useContext, useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import GridContext from "../GridContext";

const CodePanel = () => {
  const {
    codePanelActive,
    closeCodePanel,
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
    colMatrix
  } = useContext(GridContext);
  const [copyState, setCopyState] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(null);
  const [markup, setMarkup] = useState("");
  const [gridColStyle, setGridColStyle] = useState(
    `repeat(${numberOfColumns}, auto)`
  );

  const resetCopyState = (buttonIndex) => {
    setButtonClicked(buttonIndex);
    setTimeout(() => {
      setCopyState(false);
    }, 1000);
  };

  const gridCSS = `.grid { 
  display: grid; 
  grid-template-columns: ${gridColStyle}; 
  grid-auto-rows: minmax(min-content, max-content);
  gap: ${rowGap}${rowGapUnit} ${colGap}${colGapUnit}; 
  padding: ${gutter ? gutter : "0"}${gutterUnit}; 
  max-width: ${maxWidth ? `${maxWidth}${maxWidthUnit}` : "none"}; 
}`;

  // update markup output
  useEffect(() => {
    const newMarkup = `<div class="grid">
  ${items.map((item) => `<div class="${item.label}"></div>`).join("\n  ")}
</div>`;
    setMarkup(newMarkup);
  }, [items]);

  // update grid-template-columns style
  useEffect(() => {
    let gridTemplateColumnsStyleArr = [];
    let gridTemplateColumnsStyle = "";
    let firstCol = {};
    colMatrix.map((col) => {
      gridTemplateColumnsStyleArr.push(`${col.colWidth}${col.colWidthUnit}`);
      if (col.index === 1) {
        firstCol.width = col.colWidth;
        firstCol.unit = col.colWidthUnit;
      } else {
        return;
      }
    });
    if (gridTemplateColumnsStyleArr.every((val, i, arr) => val === arr[0]))
      gridTemplateColumnsStyle = `repeat(${numberOfColumns}, ${firstCol.width}${firstCol.unit})`;
    else gridTemplateColumnsStyle = gridTemplateColumnsStyleArr.join(" ");
    setGridColStyle(gridTemplateColumnsStyle);
  }, [colMatrix, numberOfColumns]);

  return (
    <div className={`c-CodePanel ${codePanelActive ? "is-open" : ""}`}>
      <div className="c-CodePanel__tabs">
        <div className="c-CodePanel__tab">
          <input type="radio" name="tabgroup" id="tab-1" defaultChecked />
          <label htmlFor="tab-1">CSS</label>
          <div className="c-CodePanel__tab-content">
            <div className="c-CodeBlock">
              <CopyToClipboard text={gridCSS} onCopy={() => setCopyState(true)}>
                <button
                  className={`[ c-Button c-Button--copy ] ${
                    copyState && "is-disabled"
                  }`}
                  onClick={() => resetCopyState(-1)}
                >
                  {copyState && buttonClicked === -1 ? `Copied!` : `Copy`}
                </button>
              </CopyToClipboard>
              <pre>{gridCSS}</pre>
            </div>
            {items.map((item) => {
              const code = `.${item.label} {
  grid-column: ${
    item.colStart && item.colEnd ? `${item.colStart} / ${item.colEnd}` : "auto"
  }; 
  grid-row-start: ${item.rowStart ? item.rowStart : "auto"}; 
  align-self: ${item.alignSelf};
  height: ${item.height}px;
}`;
              if (item.colStart && item.colEnd) {
                return (
                  <div key={item.index} className="c-CodeBlock">
                    <CopyToClipboard
                      text={code}
                      onCopy={() => setCopyState(true)}
                    >
                      <button
                        className={`[ c-Button c-Button--copy ] ${
                          copyState && "is-disabled"
                        }`}
                        onClick={() => resetCopyState(item.index)}
                      >
                        {copyState && buttonClicked === item.index
                          ? `Copied!`
                          : `Copy`}
                      </button>
                    </CopyToClipboard>
                    <pre key={item.index}>{code}</pre>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="c-CodePanel__tab">
          <input type="radio" name="tabgroup" id="tab-2" />
          <label htmlFor="tab-2">HTML</label>
          <div className="c-CodePanel__tab-content">
            <div className="c-CodeBlock">
              <CopyToClipboard text={markup} onCopy={() => setCopyState(true)}>
                <button
                  className={`[ c-Button c-Button--copy ] ${
                    copyState && "is-disabled"
                  }`}
                  onClick={() => resetCopyState(-2)}
                >
                  {copyState && buttonClicked === -2 ? `Copied!` : `Copy`}
                </button>
              </CopyToClipboard>
              <pre>{markup}</pre>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => closeCodePanel()}
        className="c-CodePanel__screen-overlay"
      ></div>
    </div>
  );
};

export default CodePanel;
