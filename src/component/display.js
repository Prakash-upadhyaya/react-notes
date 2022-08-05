import React from "react";

function Display() {
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
            <button className="btn btn-warning note-btn" onClick={ShowAll}>
              Hide all
            </button>
          ) : (
            <button className="btn btn-primary note-btn" onClick={ShowAll}>
              Show All
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
          style={hide ? { display: "block" } : { display: "none" }}
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

export default Display;
