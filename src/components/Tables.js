import Table from "./Table";

const Tables = ({ tables, onDelete, onToggle, onUpdate }) => {
  return (
    <div>
      {tables.map((table, index) => (
        <Table
          key={index}
          table={table}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default Tables;
