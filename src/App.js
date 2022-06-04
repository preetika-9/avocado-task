import axios from "axios";
import { useState, useEffect } from "react";
import CreateTable from "./components/CreateTable";
import Tables from "./components/Tables";
// import { api } from "./api/table";
function App() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const getTables = async () => {
      const tablesFromServer = await fetchTables();
      setTables(tablesFromServer);
    };
    getTables();
  }, []);

  //fetch tables
  const fetchTables = async () => {
    const res = await fetch("http://localhost:8003/table");
    const data = await res.json();
    return data;
  };

  //fetch table
  const fetchTable = async (id) => {
    const res = await fetch(`http://localhost:8003/table/${id}`);
    const data = await res.json();

    return data;
  };

  //Add Table
  const addTable = async (table) => {
    const res = await fetch("http://localhost:8003/table", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(table),
    });

    const data = await res.json();

    setTables([...tables, data]);
  };

  //Delete Table
  const deleteTable = async (id) => {
    await fetch(`http://localhost:8003/table/${id}`, {
      method: "DELETE",
    });

    setTables(tables.filter((table) => table.id !== id));
  };

  //Toggle status
  const toggleStatus = async (id) => {
    const taskToToggle = await fetchTable(id);
    const updTable = { ...taskToToggle, status: !taskToToggle.status };
    const res = await fetch(`http://localhost:8003/table/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTable),
    });

    const data = await res.json();

    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, status: data.status } : table
      )
    );
  };

  const updateTable = async (id) => {
    await fetch(`http://localhost:8003/table/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => console.log(data));

    setTables(tables.filter((table) => table.id == id));
  };

  return (
    <div className="container">
      {/* <CreateTable /> */}

      {<CreateTable data={tables} onAdd={addTable} />}
      {tables.length > 0 ? (
        <Tables
          tables={tables}
          onDelete={deleteTable}
          onToggle={toggleStatus}
          onUpdate={updateTable}
        />
      ) : (
        "No Tables To Show"
      )}
    </div>
  );
}

export default App;
