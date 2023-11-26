import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { httpClient } from "./../../../../utils/HttpClient";
import { useDispatch, useSelector } from "react-redux";
import * as token_line from "./../../../../redux/actions/tokenLine.action";
import Select from "react-select";
import NumberFormat from "react-number-format";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  server,
  OK,
  YES,
  STATUS_CODE_200,
  STATUS_CODE_401,
} from "../../../../constants";

import { Formik } from "formik";
import { SpinnerCircular } from "spinners-react";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";

function InvitToline(props) {
  const dispatch = useDispatch();
  const tokenLineReducer = useSelector(({ tokenLine }) => tokenLine);

  const [get_data, setget_data] = useState("");
  const query = new URLSearchParams(props.location.search);
  const nameRoom = query.get("room");
  const [loading, setloading] = useState(true);
  const [radio_click, setradio_click] = useState(false);

  const [radio_select_token, setradio_select_token] = useState("");
  const [nameGroupLine, setnameGroupLine] = useState("");
  const [title_data, settitle_data] = useState("");
  const [agenda, setagenda] = useState("");
  const [day_picker, setday_picker] = useState("");
  const [start_time_picker, setstart_time_picker] = useState("");
  const [end_time_picker, setend_time_picker] = useState("");

  //////////////////////////////////////
  const [get_day, setget_day] = useState("Mon");
  const [get_time_ampm_start, setget_time_ampm_start] = useState("AM");
  const [get_time_ampm_end, setget_time_ampm_end] = useState("AM");

  const popup_input = async () => {
    axios({
      method: "get",
      url: `https://webexapis.com/v1/rooms/${props.match.params.id}/meetingInfo`,
      headers: {
        Authorization: localStorage.getItem("Token"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(function (response) {
      setget_data(response.data);
      setloading(false);
    });
  };

  useEffect(() => {
    dispatch(token_line.getTokenLine());
    popup_input();

    return () => {};
  }, [dispatch]);

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Select chat group :
          </label>
          <div className="col-sm-10">
            <div className="box box-primary">
              <div className="box-header">
                <i className="ion ion-clipboard" />
                <h3 className="box-title">Chat group list</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body">
                {/* See dist/js/pages/dashboard.js to activate the todoList plugin */}
                <ul className="todo-list">
                  {!tokenLineReducer.isFetching &&
                    tokenLineReducer.result != null &&
                    tokenLineReducer.result.map((item) => (
                      <>
                        <li>
                          <span className="handle">
                            <i className="fa fa-ellipsis-v" />
                            <i className="fa fa-ellipsis-v" />
                          </span>
                          <input
                            type="radio"
                            onClick={(e) => {
                              setradio_select_token(item.token_line);
                              setnameGroupLine(item.nameChat);
                              setradio_click(true);
                            }}
                            disabled={radio_click == true ? true : false}
                          />
                          <span className="text">{item.nameChat}</span>
                        </li>
                      </>
                    ))}
                </ul>
              </div>
            </div>
            <br />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Title :
          </label>
          <div className="col-sm-10">
            <input
              onChange={(e) => {
                settitle_data(e.target.value);
              }}
              placeholder="title or message"
              className="form-control"
              type="text"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Agenda :
          </label>
          <div className="col-sm-10">
            <input
              onChange={(e) => {
                setagenda(e.target.value);
              }}
              placeholder="agenda or message"
              className="form-control"
              type="text"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Date :
          </label>
          <div className="col-sm-10">
            <select
              style={{ marginRight: 10, marginBottom: 10 }}
              className="form-control"
              onChange={(e) => {
                setget_day(e.target.value);
              }}
            >
              <option value="Mon">Monday</option>
              <option value="Tue">Tuesday</option>
              <option value="Wed">Wednesday</option>
              <option value="Thu">Thursday</option>
              <option value="Fri">Friday</option>
              <option value="Sat">Saturday</option>
              <option value="Sun">Sunday</option>
            </select>
            <InputMask
              mask="99/99/9999"
              placeholder="Enter date"
              className="form-control"
              onChange={(e) => {
                setday_picker(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Start :
          </label>
          <div className="col-sm-10">
            <InputMask
              mask="99:99"
              placeholder="Start time"
              className="form-control"
              onChange={(e) => {
                setstart_time_picker(e.target.value);
              }}
              style={{ marginBottom: 10 }}
            />
            <select
              className="form-control"
              onChange={(e) => {
                setget_time_ampm_start(e.target.value);
              }}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            End :
          </label>
          <div className="col-sm-10">
            <InputMask
              mask="99:99"
              placeholder="End time"
              className="form-control"
              onChange={(e) => {
                setend_time_picker(e.target.value);
              }}
              style={{ marginBottom: 10 }}
            />
            <select
              className="form-control"
              onChange={(e) => {
                setget_time_ampm_end(e.target.value);
              }}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary pull-right"
          >
            Invit
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
      </form>
    );
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
          <li>Invit To Line</li>
        </ol>
      </section>
      {/* Main content */}
      <section className="content" style={{ maxWidth: "80%" }}>
        <div className="box box-primary" style={{ marginTop: 70 }}>
          <div className="box-header with-border">
            <img
              src={`${process.env.PUBLIC_URL}/images/invitation.png`}
              className="logo"
            />
            <p
              className="box-title"
              style={{ fontSize: 30, paddingRight: 30, marginLeft: 10 }}
            >
              Invit To Line
            </p>
          </div>
          <div className="box-header with-border">
            <Link to="/line-token">
              <button type="button" className="btn btn-success">
                Create token line
              </button>
            </Link>
          </div>
          <div className="box-body" style={{ marginTop: 30 }}>
            <Formik
              initialValues={{}}
              onSubmit={async (values, { setSubmitting }) => {
                let formData = new FormData();
                formData.append("nameRoom", nameRoom);
                /////////

                formData.append("token_line", radio_select_token);

                ////////
                formData.append("meetingLink", get_data.meetingLink);
                formData.append("meetingNumber", get_data.meetingNumber);
                formData.append("sipAddress", get_data.sipAddress);
                ///////
                formData.append("title_data", title_data);
                formData.append("agenda", agenda);
                formData.append("day", get_day);
                formData.append("day_picker", day_picker);
                formData.append("start_time_picker", start_time_picker);
                formData.append("get_time_ampm_start", get_time_ampm_start);
                formData.append("end_time_picker", end_time_picker);
                formData.append("get_time_ampm_end", get_time_ampm_end);

                if (
                  radio_select_token != "" &&
                  title_data != "" &&
                  agenda != "" &&
                  get_day != "" &&
                  day_picker != "" &&
                  start_time_picker != "" &&
                  get_time_ampm_start != "" &&
                  end_time_picker != "" &&
                  get_time_ampm_end != ""
                ) {
                  let message = await httpClient.post(
                    server.INVIT_LINE,
                    formData
                  );
                  if (message.data.statusCode == STATUS_CODE_401) {
                    Swal.fire({
                      icon: "error",
                      title: "Error!",
                      html: `<h5>Error in operation</h5>`,
                      confirmButtonColor: "#367FA9",
                    }).then((result) => {
                      setSubmitting(false);
                      props.history.go();
                    });
                  } else {
                    Swal.fire({
                      icon: "success",
                      title: "Your group Line has been invited to room.",
                      html: `<h5>You have invit room <b>${nameRoom}</b> to group Line <b>${nameGroupLine}</b>.</h5>`,
                      confirmButtonColor: "#367FA9",
                    }).then((result) => {
                      props.history.go();

                      setSubmitting(false);
                    });
                  }
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "warning!",
                    html: `<h5>Please enter <b>title, select chat group, day, date, start time, end time</b>.</h5>`,
                    confirmButtonColor: "#367FA9",
                  }).then((result) => {
                    setSubmitting(false);
                  });
                }
              }}
            >
              {(props) => showForm(props)}
            </Formik>
          </div>
          <div>
            {/* START CUSTOM TABS */}
            <h2
              className="page-header"
              style={{
                paddingTop: 5,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 15,
              }}
            >
              Room : <b>{nameRoom}</b>
            </h2>

            {loading == true ? (
              <SpinnerCircular
                size={61}
                thickness={180}
                speed={100}
                color="rgba(57, 135, 172, 1)"
                secondaryColor="rgba(0, 0, 0, 0.07)"
                style={{ margin: 30 }}
              />
            ) : (
              <>
                <div
                  className="row"
                  style={{ paddingTop: 5, marginLeft: 20, marginRight: 20 }}
                >
                  <div className="col-md-12">
                    {/* Custom Tabs */}
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active">
                          <a href="#tab_1" data-toggle="tab">
                            Example
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane active" id="tab_1">
                          <p style={{ fontSize: 10 }}>
                            Title : {title_data} <br />
                            Agenda : {agenda} <br />
                            {get_day}, {day_picker} <br />
                            Start : {start_time_picker} {get_time_ampm_start}{" "}
                            <br />
                            End : {end_time_picker} {get_time_ampm_end}
                            <p style={{ marginTop: 5 }}>-------------</p>
                          </p>
                        </div>
                        <div className="tab-pane active" id="tab_1">
                          <p style={{ fontSize: 10 }}>More ways to join:</p>
                        </div>
                        <div className="tab-pane active" id="tab_1">
                          <p style={{ fontSize: 10 }}>
                            Join from the meeting link <br />
                            {get_data.meetingLink}
                            <p style={{ marginTop: 5 }}>-------------</p>
                          </p>
                        </div>
                        <div className="tab-pane active" id="tab_1">
                          <p style={{ fontSize: 10 }}>
                            Join by meeting number <br />
                            Meeting number (access code) :{" "}
                            {get_data.meetingNumber}
                            <p style={{ marginTop: 5 }}>-------------</p>
                          </p>
                        </div>
                        <div className="tab-pane active" id="tab_1">
                          <p style={{ fontSize: 10 }}>
                            Join from a video system or application <br />
                            Dial : {get_data.sipAddress}
                            <p style={{ marginTop: 5 }}>-------------</p>
                          </p>
                        </div>
                        <div className="tab-pane active" id="tab_1">
                          <p style={{ fontSize: 10 }}>
                            Need help? Go to https://help.webex.com
                          </p>
                        </div>
                      </div>
                      {/* /.tab-content */}
                    </div>
                    {/* nav-tabs-custom */}
                  </div>
                </div>
              </>
            )}

            {/* /.row */}
            {/* END CUSTOM TABS */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default InvitToline;
