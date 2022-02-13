import "./cell-list.css";
import { FC, Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "../components/add-cell";
import { useActions } from "../hooks/use-actions";

const CellList: FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell
        prevCellId={null}
        forceVisible={cells.length === 0 ? true : false}
      />
      {renderedCells}
    </div>
  );
};

export default CellList;
