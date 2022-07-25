import React, { useContext, useId } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import GridContext from "../GridContext";
import Columns from "./Columns";
import ColumnGap from "./ColumnGap";
import RowGap from "./RowGap";
import Gutter from "./Gutter";
import MaxWidth from "./MaxWidth";

const Sidebar = () => {
  const {
    items,
    addItem,
    updateItem,
    removeItem,
    toggleCodePanel,
    setItemHovered
  } = useContext(GridContext);

  const labelId = useId();
  const colStartId = useId();
  const colEndId = useId();
  const rowStartId = useId();
  const heightId = useId();
  const alignSelfId = useId();

  let itemsLength = items.length + 1;

  const itemPlaceholder = {
    index: items.length,
    label: `item-${itemsLength}`,
    colStart: "",
    colEnd: "",
    rowStart: "",
    height: 100,
    alignSelf: "auto"
  };

  return (
    <div className="c-Sidebar">
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
        style={{ width: 290, minHeight: `calc(100vh - 83px)` }}
      >
        <div className="c-Sidebar__main-heading">
          <h1>griddler</h1>
        </div>
        <div className="c-Sidebar__block">
          <h2>Configuration</h2>
          <div className="c-Sidebar__grid-ui">
            <Columns />
            <ColumnGap />
            <RowGap />
            <Gutter />
            <MaxWidth />
          </div>
        </div>
        <div>
          <div className="c-Sidebar__block">
            <h2>Layout</h2>
            {items.map((item) => (
              <div
                key={item.index}
                className="c-Item"
                onMouseEnter={() => setItemHovered(`block-${item.index}`)}
                onMouseLeave={() => setItemHovered(null)}
              >
                <div>
                  <label htmlFor={`${colStartId}-${item.index}`}>
                    Col start:
                  </label>
                  <div className="inline-flex">
                    <input
                      autoFocus
                      id={`${colStartId}-${item.index}`}
                      type="text"
                      value={item.colStart}
                      onChange={(e) =>
                        updateItem("colStart", e.target.value, item.index)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={`${colEndId}-${item.index}`}>Col end:</label>
                  <div className="inline-flex">
                    <input
                      id={`${colEndId}-${item.index}`}
                      type="text"
                      value={item.colEnd}
                      onChange={(e) =>
                        updateItem("colEnd", e.target.value, item.index)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={`${rowStartId}-${item.index}`}>
                    Row start:
                  </label>
                  <div className="inline-flex">
                    <input
                      id={`${rowStartId}-${item.index}`}
                      type="text"
                      value={item.rowStart}
                      onChange={(e) =>
                        updateItem("rowStart", e.target.value, item.index)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={`${alignSelfId}-${item.index}`}>
                    Align self:
                  </label>
                  <div className="[ select-wrapper select-wrapper--full-width ]">
                    <select
                      id={`${alignSelfId}-${item.index}`}
                      defaultValue="auto"
                      onChange={(e) =>
                        updateItem("alignSelf", e.target.value, item.index)
                      }
                    >
                      <option value="auto">auto</option>
                      <option value="baseline">baseline</option>
                      <option value="center">center</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor={`${heightId}-${item.index}`}>Height:</label>
                  <div className="inline-flex">
                    <input
                      id={`${heightId}-${item.index}`}
                      type="text"
                      value={item.height}
                      onChange={(e) =>
                        updateItem("height", e.target.value, item.index)
                      }
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={`${labelId}-${item.index}`}>Class:</label>
                  <div className="inline-flex">
                    <input
                      id={`${labelId}-${item.index}`}
                      type="text"
                      value={item.label}
                      onChange={(e) =>
                        updateItem("label", e.target.value, item.index)
                      }
                    />
                  </div>
                </div>
                <button
                  className="button-close"
                  onClick={() => removeItem(item.index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.627"
                    height="22.628"
                    viewBox="0 0 22.627 22.628"
                  >
                    <g transform="translate(-1953.686 -29.685)">
                      <line
                        x2="30"
                        transform="translate(1954.393 30.393) rotate(45)"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      <line
                        x2="30"
                        transform="translate(1954.393 51.606) rotate(-45)"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            ))}
            <button
              className="[ c-Button c-Button--simple ]"
              onClick={() => addItem(itemPlaceholder)}
            >
              + Add element
            </button>
          </div>
        </div>
      </Scrollbars>
      <div className="c-Sidebar__view-code">
        <button
          onClick={() => toggleCodePanel()}
          className="[ c-Button c-Button--view-code ]"
        >
          View generated code →
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
