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
      <AddCell nextCellId={cell.id} />
      <CellListItem key={cell.id} cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  );
};

export default CellList;
