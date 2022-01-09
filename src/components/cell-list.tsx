import { FC, Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "../components/add-cell";

const CellList: FC = () => {
  const cells = useTypedSelector((reducer) => {
    const cellsReducer = reducer.cells;
    return cellsReducer
      ? cellsReducer.order.map((id) => cellsReducer.data[id])
      : [];
  });
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell
        prevCellId={null}
        forceVisible={cells.length === 0 ? true : false}
      />
      {renderedCells}
    </div>
  );
};

export default CellList;
