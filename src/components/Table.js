const Table = ({ table, onDelete, onToggle, onUpdate }) => {
  return (
    <div
      className={`table ${table.status ? "status" : ""}`}
      onDoubleClick={() => onToggle(table.id)}
    >
      <div>
        <p>
          {table.layout}
          <div>
            <input
              // onClick={resetInputField}
              type="button"
              value="Delete"
              className="btn btn-delete"
              onClick={() => onDelete(table.id)}
            />
            {/* <FaTimes
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => onDelete(table.id)}
            /> */}
            <input
              onClick={() => onUpdate(table.id)}
              type="button"
              value="Edit"
              className="btn btn-edit"
            />
          </div>
        </p>
        <p> {table.name}</p>

        <p> {table.capacity}</p>
        <p>{table.image} </p>
      </div>
    </div>
  );
};

export default Table;
