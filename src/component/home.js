import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Icon } from "react-icons-kit";
import { androidDelete } from "react-icons-kit/ionicons/androidDelete";
import { compose } from "react-icons-kit/ionicons/compose";

function Home() {
  const [notes, setNotes] = useState({ title: "", desc: "" });
  const [items, setItems] = useState(getDataFromStorage());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [editNoteId, setEditNoteId] = useState();
  const [backup, setBackup] = useState(GetBackupData());
  // const [archive, setArchive] = useState(GetArchiveData());
  const [storageBtn, setStorageBtn] = useState(false);
  const [hide, setHide] = useState(false);

  const { title, desc } = notes;

  function getDataFromStorage() {
    const local_data = localStorage.getItem("NOTES");
    if (local_data) {
      return JSON.parse(local_data);
    } else {
      return [];
    }
  }

  function GetBackupData() {
    const data = localStorage.getItem("BACKUP");

    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  // function GetArchiveData() {
  //   const data = localStorage.getItem("ARCHIVE");
  //   if (data) {
  //     return JSON.parse(data);
  //   } else {
  //     return [];
  //   }
  // }

  function getInputValue(e) {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  }

  function CheckMultiple(id) {
    let arr = [];
    items.forEach((i) => {
      if (i.id === id) {
        if (i.completed === false) {
          i.completed = true;
        } else if (i.completed === true) {
          i.completed = false;
        }
      }
      arr.push(i);
      setItems(arr);
    });
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
              completed: false,
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
        id: uuid(),
        date: new Date().toLocaleString(),
        title: title,
        desc: desc,
        completed: false,
      };
      setItems([...items, data_with_id]);
      setNotes({ title: "", desc: "" });
    }
  }

  function DeleteSelcted() {
    let deleted_data = [];

    if (window.confirm("Are you sure to deleted selected Notes")) {
      let selected = items.filter((i) => {
        if (i.completed === true) {
          deleted_data.push(...backup, i);
        }
        return i.completed !== true;
      });

      setBackup(deleted_data);
      setItems(selected);
    }
  }

  function deleteNotes(id) {
    let ind_del = [];

    if (window.confirm("Are you sure ?")) {
      const delete_note = items.filter((ele) => {
        if (ele.id === id) {
          ind_del.push(...backup, ele);
        }
        return id !== ele.id;
      });

      setBackup(ind_del);
      setItems(delete_note);
    }
  }

  function Restore() {
    let arr = [];
    if (backup.length > 0) {
      backup.forEach((i) => {
        i.completed = false;
        arr.push(i);
      });
      setItems([...arr, ...items]);
      alert("Deleted Notes Restored Successfully");
      setStorageBtn(false);
    } else {
      setStorageBtn(true);
    }

    setBackup([]);
  }

  function editNotes(id) {
    let edit_item = items.find((ele) => {
      return ele.id === id;
    });

    setEditNoteId(id);
    setNotes({ title: edit_item.title, desc: edit_item.desc });
    setToggleBtn(false);
  }

  // function Archive() {
  //   let archive_data = [];
  //   let selected = items.filter((i) => {
  //     if (i.completed === true) {
  //       archive_data.push(...archive, i);
  //     }
  //     return i.completed !== true;
  //   });

  //   // archive_data.forEach((i) => {
  //   //   return (i.completed = false);
  //   // });
  //   setArchive(archive_data);
  //   setItems(selected);
  // }

  function ShowAll() {
    setHide(!hide);
  }

  useEffect(() => {
    localStorage.setItem("NOTES", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("BACKUP", JSON.stringify(backup));
  }, [backup]);

  // useEffect(() => {
  //   localStorage.setItem("ARCHIVE", JSON.stringify(archive));
  // }, [archive]);

  useEffect(() => {
    if (backup.length > 0) {
      setStorageBtn(false);
    } else {
      setStorageBtn(true);
    }
  }, [backup.length]);

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
            <button className="btn btn-primary note-btn" onClick={addNotesData}>
              <b>Add Notes</b>
            </button>
          ) : (
            <button className="btn btn-success note-btn" onClick={addNotesData}>
              <b>Update Note</b>
            </button>
          )}

          {hide ? (
            <button className="btn btn-primary note-btn" onClick={ShowAll}>
              Show all
            </button>
          ) : (
            <button className="btn btn-warning note-btn" onClick={ShowAll}>
              Hide All
            </button>
          )}

          <button
            className={
              storageBtn ? "btn btn-dark note-btn" : "btn btn-info note-btn"
            }
            disabled={storageBtn}
            onClick={Restore}
          >
            Backup
          </button>

          {/* <button className="btn btn-success note-btn" onClick={Archive}>
            Archive
          </button> */}

          <button onClick={DeleteSelcted} className="btn btn-danger note-btn">
            Delete Checked
          </button>
          {/* <button className="btn btn-danger note-btn" onClick={ShowAll}>
            Delete All
          </button> */}
        </div>
      </div>
      <div className="display-notes">
        <div
          className="container"
          style={hide ? { display: "none" } : { display: "block" }}
        >
          <div className="row">
            {items.map((ele, index) => {
              return (
                <>
                  <div className="col-4">
                    <div
                      className="card "
                      style={{ width: "15rem" }}
                      key={index}
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          <span>
                            <input
                              type="checkbox"
                              checked={ele.completed}
                              onChange={() => {
                                CheckMultiple(ele.id);
                              }}
                            />
                          </span>
                          {"  "}
                          Title : {ele.title}
                        </h5>{" "}
                        <p className="card-text">Desc: {ele.desc}</p>
                        <p>{ele.date}</p>
                        <Icon
                          className="btn btn-success"
                          icon={compose}
                          onClick={() => editNotes(ele.id)}
                        />{" "}
                        <Icon
                          className="btn btn-danger"
                          icon={androidDelete}
                          onClick={() => deleteNotes(ele.id)}
                        />
                      </div>
                    </div>
                    <br />
                  </div>
                </>
              );
            })}
          </div>
        </div>{" "}
      </div>
      <br />
    </>
  );
}
export default Home;
