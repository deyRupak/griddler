import { createContext, useState, useEffect } from "react";

const GridContext = createContext();

export function GridProvider({ children }) {
  const [numberOfColumns, setNumberOfColumns] = useState(12);
  const [numberOfRows, setNumberOfRows] = useState(3);

  const [colGap, setColGap] = useState(10);
  const [colGapUnit, setColGapUnit] = useState("px");

  const [rowGap, setRowGap] = useState(20);
  const [rowGapUnit, setRowGapUnit] = useState("px");

  const [gutter, setGutter] = useState(30);
  const [gutterUnit, setGutterUnit] = useState("px");

  const [maxWidth, setMaxWidth] = useState(null);
  const [maxWidthUnit, setMaxWidthUnit] = useState("px");

  const [items, setItems] = useState([]);
  const [codePanelActive, setCodePanelActive] = useState(false);

  // state to handle array of objects (columns)
  const [colMatrix, setColMatrix] = useState([]);

  // state to handle grid highlighting on hover
  const [itemHovered, setItemHovered] = useState(null);

  const setColumns = (event) => {
    if (event.key === "Enter") setNumberOfColumns(event.target.value);
  };

  const setColumnGap = (event) => {
    if (event.key === "Enter") setColGap(event.target.value);
  };

  const setColumnGapUnit = (unit) => {
    setColGapUnit(unit);
  };

  const setRows = (event) => {
    if (event.key === "Enter") setNumberOfRows(event.target.value);
  };

  const setRGap = (gap) => {
    setRowGap(gap);
  };

  const setRGapUnit = (unit) => {
    setRowGapUnit(unit);
  };

  const setGridGutter = (g) => {
    setGutter(g);
  };

  const setGridGutterUnit = (unit) => {
    setGutterUnit(unit);
  };

  const setContainerMaxWidth = (width) => {
    setMaxWidth(width);
  };

  const setContainerMaxWidthUnit = (unit) => {
    setMaxWidthUnit(unit);
  };

  const addItem = (item) => {
    const existingItems = [...items];
    existingItems.push(item);
    setItems(existingItems);
  };

  // layout item (grid element)
  const updateItem = (prop, value, index) => {
    const existingItems = [...items];
    const itemIndex = existingItems.findIndex((i) => i.index === index);
    let validatedValue = value;

    // input validation
    if (prop === "colStart")
      validatedValue = Math.min(Number(numberOfColumns), Number(value));

    if (prop === "colEnd")
      validatedValue = Math.min(Number(numberOfColumns + 1), Number(value));

    if (prop === "rowStart")
      validatedValue = Math.max(
        Number(1),
        Math.min(Number(999), Number(value))
      );

    existingItems[itemIndex][prop] = validatedValue;

    setItems(existingItems);
  };

  const updateColWidth = (event, index) => {
    const existingCols = [...colMatrix];
    const colIndex = existingCols.findIndex((i) => i.index === index);
    existingCols[colIndex]["colWidth"] = event.target.value;
    setColMatrix(existingCols);
  };

  const updateColWidthUnit = (event, index) => {
    const existingCols = [...colMatrix];
    const colIndex = existingCols.findIndex((i) => i.index === index);
    existingCols[colIndex]["colWidthUnit"] = event.target.value;
    setColMatrix(existingCols);
  };

  const removeItem = (index) => {
    const existingItems = [...items];
    const itemIndex = existingItems.findIndex((i) => i.index === index);
    existingItems.splice(itemIndex, 1);

    let existingItemsUpdatedIndexes = existingItems.map((item, idx) => {
      if (item.idx !== index) {
        return {
          ...item,
          index: idx
        };
      }
    });

    setItems(existingItemsUpdatedIndexes);
  };

  const toggleCodePanel = () => {
    let bool = codePanelActive;
    setCodePanelActive((bool = !bool));
  };

  const closeCodePanel = () => {
    setCodePanelActive(false);
  };

  useEffect(() => {
    let initialColMatrix = [];
    for (let i = 1; i <= numberOfColumns; i++) {
      initialColMatrix.push({
        index: i,
        colWidth: 1,
        colWidthUnit: "fr"
      });
    }
    setColMatrix(initialColMatrix);
  }, [numberOfColumns]);

  return (
    <GridContext.Provider
      value={{
        numberOfColumns,
        numberOfRows,
        setColumns,
        colGap,
        colGapUnit,
        setColumnGap,
        setColumnGapUnit,
        setRows,
        rowGap,
        rowGapUnit,
        setRGap,
        setRGapUnit,
        gutter,
        gutterUnit,
        setGridGutter,
        setGridGutterUnit,
        maxWidth,
        maxWidthUnit,
        setContainerMaxWidth,
        setContainerMaxWidthUnit,
        items,
        addItem,
        updateItem,
        removeItem,
        codePanelActive,
        toggleCodePanel,
        closeCodePanel,
        itemHovered,
        setItemHovered,
        colMatrix,
        updateColWidth,
        updateColWidthUnit
      }}
    >
      {children}
    </GridContext.Provider>
  );
}

export default GridContext;
