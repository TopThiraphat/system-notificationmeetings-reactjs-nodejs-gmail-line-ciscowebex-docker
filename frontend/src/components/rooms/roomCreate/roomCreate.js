import React, { useState } from "react";
import "./roomCreate.css";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { server } from "../../../constants/index";
import Swal from "sweetalert2";

function RoomCreate(props) {
  const [name_space, setname_space] = useState("");
  const create_data = qs.stringify({
    title: name_space,
  });
  const showForm = () => {
    return (
      <>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Room name :{" "}
          </label>
          <div className="col-sm-10">
            <input
              onChange={(e) => setname_space(e.target.value)}
              placeholder="name room"
              className="form-control"
              type="text"
            />
          </div>
        </div>

        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            type="submit"
            className="btn btn-primary pull-right"
            onClick={() => submitform()}
          >
            Submit
          </button>
          <Link to="/main">
            <a
              type="Button"
              className="btn btn-default pull-right"
              style={{ marginRight: 10 }}
            >
              Cancel
            </a>
          </Link>
        </div>
      </>
    );
  };

  const submitform = (e) => {
    if (name_space != "") {
      axios({
        method: "post",
        url: "https://webexapis.com/v1/rooms",
        headers: {
          Authorization: localStorage.getItem("Token"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: create_data,
      })
        .then(function (response) {
          props.history.push("/main");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your room has been created.",
            html: `<h5>You have created room <b>${name_space}</b>.</h5>`,

            showConfirmButton: false,
            timer: 3000,
          });
        })
        .catch(function (error) {});
    } else {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        html: `<h5>Please enter <b>room name</b>.</h5>`,
        confirmButtonColor: "#367FA9",
      });
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <h1>
          Dashboard <i className="fa fa-dashboard" />
        </h1>
        <ol className="breadcrumb">
          <li>
            <Link to="/main">Home</Link>
          </li>
          <li>
            <Link to="/main">Rooms</Link>
          </li>
          <li>Create room</li>
        </ol>
      </section>
      {/* Main content */}
      <section className="content" style={{ maxWidth: "80%" }}>
        <div className="box box-primary" style={{ marginTop: 70 }}>
          <div className="box-header with-border">
            <img
              src={`${process.env.PUBLIC_URL}/images/create.png`}
              className="logo"
            />
            <p className="box-title" style={{ fontSize: 30, marginLeft: 10 }}>
              Create room
            </p>
          </div>
          <div className="box-body" style={{ marginTop: 30 }}>
            {showForm()}
          </div>
        </div>
      </section>
    </div>
  );
}

export default RoomCreate;
