import React, { useState, useEffect } from "react";
import "./roomUpdate.css";
import axios from "axios";
import qs from "qs";
import { server } from "../../../constants/index";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function RoomUpdate(props) {
  const [name_space, setname_space] = useState("");
  const update_data = qs.stringify({
    title: name_space,
  });
  const [get_data, setget_data] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: `https://webexapis.com/v1/rooms/${props.match.params.id}`,
      headers: {
        Authorization: localStorage.getItem("Token"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(function (response) {
      setget_data(response.data);
    });

    return () => {};
  }, []);

  const submitUpdate = () => {
    if (name_space != "") {
      axios({
        method: "put",
        url: `https://webexapis.com/v1/rooms/${props.match.params.id}`,
        headers: {
          Authorization: localStorage.getItem("Token"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: update_data,
      })
        .then(function (response) {
          props.history.push("/main");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your room has been updated.",
            html: `<h5>You have updated room <b>${name_space}</b>.</h5>`,

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
              placeholder="โปรดระบุ"
              className="form-control"
              type="text"
              defaultValue={get_data.title}
            />
          </div>
        </div>

        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            type="submit"
            className="btn btn-primary pull-right"
            onClick={() => submitUpdate()}
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

  return (
    <div className="content-wrapper">
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
          <li>Update room</li>
        </ol>
      </section>
      {/* Main content */}
      <section className="content" style={{ maxWidth: "80%" }}>
        <div className="box box-primary" style={{ marginTop: 70 }}>
          <div className="box-header with-border">
            <img
              src={`${process.env.PUBLIC_URL}/images/refresh.png`}
              className="logo"
            />
            <p className="box-title" style={{ fontSize: 30, marginLeft: 10 }}>
              Update room{" "}
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

export default RoomUpdate;
