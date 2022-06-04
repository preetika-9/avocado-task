import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateTable = ({ onAdd, data }) => {
  const [layout, setLayout] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState("");
  // const [file, setFile] = useState("");

  const [id, setId] = useState(null);
  const params = useParams();
  useEffect(() => {
    setId(localStorage.getItem("id"));
    setLayout(localStorage.getItem("layout"));
    setName(localStorage.getItem("name"));
    setCapacity(localStorage.getItem("capacity"));
    setStatus(localStorage.getItem("status"));
    setImage(localStorage.getItem("image"));
  }, []);

  // let { id, layout, name, capacity, status, image } = editTable;

  // const [inputValue, setInputValue] = useState();
  console.log(data);
  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please create user");
      console.log({ image });
      return;
    }

    onAdd({ layout, name, capacity, status, image });

    setLayout("");
    setName("");
    setCapacity("");
    setStatus(false);
    setImage("");
  };

  const resetInputField = (e) => {
    setLayout("");
    setName("");
    setCapacity("");
    setStatus(false);
    setImage("");
  };

  // useEffect(() => {
  //   setLayout(data[0].layout);
  //   setName(data[0].name);
  //   setCapacity(data[0].capacity);
  //   setStatus(false);
  //   setImage("");
  // }, [data]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch(`http://localhost:8003/table/${id}`);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [id]);

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <h1>{params.id ? "Edit" : "Create"} Table</h1>
      <div className="wrapper">
        <div className="form-control">
          <label>Layout:</label>
          <select
            className="select"
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="Select Layout">Select Layout</option>
            <option value="Product">Product</option>
            <option value="Combination">Combination</option>
            <option value="Fixed">Fixed</option>
          </select>
        </div>
        <div className="form-control">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label>Capacity:</label>
          <input
            type="number"
            placeholder="Enter number of capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>

        <div className="form-control form-control-check">
          <label>Status:</label>
          <input
            type="checkbox"
            checked={status}
            value={status}
            onChange={(e) => setStatus(e.currentTarget.checked)}
          />
        </div>
        <div className="form-control ">
          <label>Image:</label>
          <input
            type="file"
            id="myFile"
            name="filename"
            value={image}
            onChange={(e) => setImage(e.currentTarget.value)}
          />
          {/* <img src={file} /> */}
        </div>
        <div className="btn-wrapper">
          <input
            type="submit"
            value={params.id ? "Update Table" : "Create Table"}
            className="btn1 btn1-block"
          />

          <input
            onClick={resetInputField}
            type="reset"
            value="Cancel"
            className="btn btn-block"
          />
        </div>
      </div>
    </form>
  );
};

export default CreateTable;
