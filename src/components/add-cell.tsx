import "./add-cell.css";
import { FC } from "react";
import { useActions } from "../hooks/use-actions";

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-primary is-small is-rounded"
          onClick={() => insertCellAfter(prevCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-primary is-small is-rounded"
          onClick={() => insertCellAfter(prevCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
