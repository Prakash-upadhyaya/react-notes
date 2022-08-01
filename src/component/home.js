import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

function Home() {
  const [notes, setNotes] = useState({ title: "", desc: "" });
  const [items, setItems] = useState(getDataFromStorage());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [editNoteId, setEditNoteId] = useState(0);

  const { title, desc } = notes;

  function getDataFromStorage() {
    const local_data = localStorage.getItem("NOTES");
    if (local_data) {
      return JSON.parse(local_data);
    } else {
      return [];
    }
  }

  function getInputValue(e) {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  }

  function addNotesData(e) {
    if (title === "" || desc === "") {
      alert("Please fill the data");
    } else if (notes && !toggleBtn) {
      setItems(
        items.map((ele) => {
          if (ele.id === editNoteId) {
            return {
              ...ele,
              date: new Date().toLocaleString(),
              title: title,
              desc: desc,
            };
          }
          return ele;
        })
      );

      setNotes({ title: "", desc: "" });
      setEditNoteId(null);
      setToggleBtn(true);
    } else {
      const data_with_id = {
        //id: new Date().getTime().toString(),
        id: uuid(),
        date: new Date().toLocaleString(),
        title: title,
        desc: desc,
      };
      setItems([...items, data_with_id]);
      setNotes({ title: "", desc: "" });
    }
  }

  function deleteNotes(id) {
    const delete_note = items.filter((ele) => {
      return id !== ele.id;
    });
    setItems(delete_note);
  }
  function editNotes(id) {
    let edit_item = items.find((ele) => {
      return ele.id === id;
    });

    setEditNoteId(id);
    setNotes({ title: edit_item.title, desc: edit_item.desc });
    setToggleBtn(false);
  }

  useEffect(() => {
    localStorage.setItem("NOTES", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="notes">
        <div className="container container-notes">
          <h3>Notes App</h3>
          <label htmlFor="Title" className="form-lable">
            Enter Notes Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={(e) => getInputValue(e)}
          />

          <label htmlFor="Description" className="form-lable">
            Enter Notes Description
          </label>
          <textarea
            className="form-control"
            name="desc"
            value={desc}
            onChange={(e) => getInputValue(e)}
          ></textarea>
          <br />
          {toggleBtn ? (
            <button className="btn btn-primary " onClick={addNotesData}>
              <b>Add Notes</b>
            </button>
          ) : (
            <button className="btn btn-success " onClick={addNotesData}>
              <b>Update Note</b>
            </button>
          )}
        </div>
      </div>
      <div className="display-notes">
        <div className="container">
          <div className="row">
            {items.map((ele, index) => {
              return (
                <>
                  <div className="col-4">
                    <div
                      className="card "
                      style={{ width: " 18rem" }}
                      key={index}
                    >
                      <div className="card-body">
                        <h5 className="card-title">Title : {ele.title}</h5>
                        <p className="card-text">Desc: {ele.desc}</p>
                        <p>{ele.date}</p>
                        <button
                          className="btn btn-success"
                          onClick={() => editNotes(ele.id)}
                        >
                          Edit
                        </button>{" "}
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteNotes(ele.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <br />
                  </div>
                </>
              );
            })}
          </div>
        </div>{" "}
        <div> </div>
      </div>
      <br />
    </>
  );
}
export default Home;
