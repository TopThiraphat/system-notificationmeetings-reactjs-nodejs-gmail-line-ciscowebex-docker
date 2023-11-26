import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as actions from "./../../redux/actions/main.action";
import axios from "axios";
import { connect } from "react-redux";
import "./main.css";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { server } from "../../constants/index";
import querystring from "querystring";
import { SpinnerCircular } from "spinners-react";
import NumberFormat from "react-number-format";
import moment from "moment-timezone";

const MySwal = withReactContent(Swal);
function Main(props) {
  const dispatch = useDispatch();
  const mainReducer = useSelector(({ mainReducer }) => mainReducer);
  const [list_meeting_lenght, setlist_meeting_lenght] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    dispatch(actions.getDataRoom(props.history));

    axios({
      method: "get",
      url: "https://webexapis.com/v1/meetings",
      headers: {
        Authorization: localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        const result = response.data.items;
        setlist_meeting_lenght(result.length);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {};
  }, [dispatch]);

  const moment_time_zone = (data) => {
    var time = moment(data);
    time.tz("Asia/Bangkok").format("ha z");
    var result = moment(time._d).format("YYYY-MM-DD");
    return result;
  };

  const createRows = () => {
    try {
      const { tokenResult, roomResult, isFetching, isError } = mainReducer;

      return (
        !isFetching &&
        roomResult != null &&
        roomResult.items.map((item) => (
          <tr>
            <td>{item.title} </td>
            <td>{item.type}</td>
            <td>{moment_time_zone(item.created)}</td>
            <td style={{ textAlign: "center" }}>
              <Link to={`/room-update/${item.id}`}>
                <button
                  type="button"
                  class="btn  btn-sm"
                  style={{ backgroundColor: "#367FA9", color: "white" }}
                >
                  Update
                </button>
              </Link>
              <span style={{ color: "grey" }}> | </span>
              <button
                onClick={() => {
                  Swal.fire({
                    title: `Are you sure delete room?`,
                    text: "You won't be able to revert this!",
                    html: `
                    <p>You won't be able to revert this!</p>
                    <p>Are you sure delete room <b>${item.title}</b></p>
                    `,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#367FA9",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      axios({
                        method: "delete",
                        url: `https://webexapis.com/v1/rooms/${item.id}`,
                        headers: {
                          Authorization: localStorage.getItem("Token"),
                        },
                      })
                        .then(function (response) {
                          Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: `Your room has been deleted.`,
                            confirmButtonColor: "#367FA9",
                            html: `<h5>You have deleted room <b>${item.title}</b>.</h5>`,
                          }).then(function (response) {
                            props.history.go();
                          });
                        })
                        .catch(function (error) {});
                    }
                  });
                }}
                type="button"
                className="btn btn-danger  btn-sm"
                style={{ margin: 5 }}
              >
                Delete
              </button>
            </td>
            <td>
              <Link to={`/invit-to-line/${item.id}/?room=${item.title}`}>
                <button type="button" className="btn btn-success  btn-sm">
                  Invit
                </button>
              </Link>
            </td>
          </tr>
        ))
      );
    } catch (e) {}
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
        </ol>
      </section>
      {/* Main content */}
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="info-box">
                  <span className="info-box-icon">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/conversation.png`}
                      className="logo"
                    />
                  </span>
                  <Link to="/invit-to-gmail" style={{ color: "#222d32" }}>
                    <div className="info-box-content">
                      <p className="p_custom">
                        <b>Waiting for the meeting</b>
                      </p>
                      <h2>
                        {loading == true ? (
                          <SpinnerCircular
                            size={25}
                            thickness={180}
                            speed={100}
                            color="rgba(57, 135, 172, 1)"
                            secondaryColor="rgba(0, 0, 0, 0.07)"
                          />
                        ) : (
                          <>{list_meeting_lenght}</>
                        )}
                      </h2>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="box-body">
                <div className="row" style={{ marginBottom: 40 }}>
                  <div className="box-header with-border">
                    <p
                      className="box-title"
                      style={{ fontSize: 30, paddingRight: 30, marginLeft: 10 }}
                    >
                      Rooms list
                    </p>
                  </div>
                </div>

                <table
                  id="stock_table"
                  className="table table-bordered table-striped table-hover"
                  // style={{ height: 300, maxHeight: 300 }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "3%" }}>Name rooms</th>
                      <th style={{ width: "1%" }}>Type rooms</th>
                      <th style={{ width: "1%" }}>Created rooms</th>
                      <th style={{ width: "1%", textAlign: "center" }}>
                        Action
                      </th>
                      <th style={{ width: "1%" }}>Line</th>
                    </tr>
                  </thead>

                  <tbody>{createRows()}</tbody>
                </table>
              </div>
            </div>
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </section>
    </div>
  );
}

export default Main;
