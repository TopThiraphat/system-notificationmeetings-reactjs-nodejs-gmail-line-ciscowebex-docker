import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { httpClient } from "./../../../../utils/HttpClient";
import { useDispatch, useSelector } from "react-redux";
import * as gmail from "./../../../../redux/actions/gmail.action";

import NumberFormat from "react-number-format";
import {
  server,
  OK,
  YES,
  STATUS_CODE_200,
  STATUS_CODE_401,
  STATUS_CODE_408,
} from "../../../../constants";

import { Formik } from "formik";
import { SpinnerCircular } from "spinners-react";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";
import Select from "react-dropdown-select";
import qs from "qs";
import moment from "moment-timezone";

function InvitToGmail(props) {
  const dispatch = useDispatch();
  const gmailReducer = useSelector(({ gmail }) => gmail);

  const [loading, setloading] = useState(true);

  const [title, settitle] = useState("");
  const [agenda, setagenda] = useState("");
  const [list_gmail, setlist_gmail] = useState([]);
  const [day_picker, setday_picker] = useState("");
  const [start_time_picker, setstart_time_picker] = useState("");
  const [end_time_picker, setend_time_picker] = useState("");

  const [get_data_meeting, setget_data_meeting] = useState("");

  const getDataMeeting = async () => {
    axios({
      method: "get",
      url: "https://webexapis.com/v1/meetings",
      headers: {
        Authorization: localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setget_data_meeting(response.data);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(gmail.getGmail());
    getDataMeeting();

    return () => {
      props.history.go();
    };
  }, [dispatch]);

  const moment_time_zone = (data) => {
    var time = moment(data);
    time.tz("Asia/Bangkok").format("ha z");
    var result = moment(time._d).format("YYYY-MM-DD"); // store localTime
    return result;
  };

  const option =
    !gmailReducer.isFetching &&
    gmailReducer.result != null &&
    gmailReducer.result.map((item, index) => ({
      value: item.name,
      label: item.name,
      email: item.gmail,
      displayName: item.name,
      coHost: false,
    }));

  const submitform = async () => {
    if (
      title != "" &&
      agenda != "" &&
      day_picker != "" &&
      start_time_picker != "" &&
      end_time_picker != "" &&
      list_gmail != ""
    ) {
      await axios({
        method: "post",
        url: `https://webexapis.com/v1/meetings`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Token"),
        },
        data: {
          title: title,
          agenda: agenda,
          start: day_picker + " " + start_time_picker,
          end: day_picker + " " + end_time_picker,
          timezone: "Asia/Bangkok",
          sendEmail: true,
          invitees: list_gmail,
          enabledAutoRecordMeeting: false,
        },
      })
        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Your gmail has been invited to room.",
            html: `<h5>You have invit room <b>${title}</b> to gmail.</h5>`,
            confirmButtonColor: "#367FA9",
          }).then((result) => {
            props.history.go();
          });
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            html: `<h5>Can't send message<b> ERROR CODE ${STATUS_CODE_401}</b>.</h5>`,
            confirmButtonColor: "#367FA9",
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        html: `<h5>Please enter <b>Gmail user list, title, agenda, date, start time, end time</b>.</h5>`,
        confirmButtonColor: "#367FA9",
      });
    }
  };
  const showForm = () => {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Select gmail user :
          </label>
          <div className="col-sm-10">
            <div className="box box-primary">
              <div className="box-header">
                <i className="ion ion-clipboard" />
                <h3 className="box-title">Gmail user list</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body">
                <Select
                  multi
                  options={option}
                  onChange={(value) => setlist_gmail(value)}
                  values={[]}
                />
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
                settitle(e.target.value);
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
              placeholder="agenda"
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
            <InputMask
              mask="9999-99-99"
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
            />
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
            />
          </div>
        </div>

        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            type="submit"
            className="btn btn-primary pull-right"
            onClick={() => submitform()}
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
      </div>
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
          <li>Invit To Gmail</li>
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
              Invit To Gmail
            </p>
          </div>
          <div className="box-header with-border">
            <Link to="/gmail">
              <button type="button" className="btn btn-success">
                Create gmail user
              </button>
            </Link>
          </div>

          <div className="box-body" style={{ marginTop: 30 }}>
            {showForm()}
          </div>

          <div className="box-body" style={{ marginTop: 30 }}>
            {/* TO DO List */}
            <div className="box box-primary">
              <div className="box-header">
                <i className="ion ion-clipboard" />
                <h3 className="box-title">List Meetings</h3>
              </div>
              {/* /.box-header */}
              <div className="box-body">
                <ul className="todo-list">
                  {loading == true ? (
                    <SpinnerCircular
                      size={61}
                      thickness={180}
                      speed={100}
                      color="rgba(57, 135, 172, 1)"
                      secondaryColor="rgba(0, 0, 0, 0.07)"
                    />
                  ) : (
                    <>
                      {get_data_meeting.items != null &&
                        get_data_meeting.items.map((item) => (
                          <>
                            <li>
                              <span className="handle">
                                <i className="fa fa-ellipsis-v" />
                                <i className="fa fa-ellipsis-v" />
                              </span>
                              <span
                                className="text"
                                onClick={() => {
                                  Swal.fire({
                                    title: `Meeting`,
                                    html: `           
                                <p>Title : ${item.title}</p>          
                                <p>Agenda : ${item.agenda}</p>
                                <p><b>Join from the meeting link</b></p>                                
                                <p><a href=${item.webLink}> ${item.webLink}</a></p>
                                <p><b>Join by meeting number</b></p>  
                                <p>Meeting number (access code) : ${item.meetingNumber}</p>
                                <p><b>Join from a video system or application</b></p>  
                                <p>Dial : ${item.sipAddress}</p><br>
                                <p>Need help? Go to <a href="https://help.webex.com">https://help.webex.com</a></p>
                                `,
                                    confirmButtonColor: "#367FA9",
                                  });
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {item.title} | {moment_time_zone(item.start)}{" "}
                              </span>
                              <div className="tools">
                                <i
                                  className="fa fa-trash-o"
                                  onClick={() => {
                                    Swal.fire({
                                      title: `Are you sure you delete your Room meeting invitation?`,
                                      html: `
                                      <p>You won't be able to revert this!</p>
                                      <p>Are you sure delete invitation meeting <b>${item.title}</b>?</p>
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
                                          url: `https://webexapis.com/v1/meetings/${item.id}`,
                                          headers: {
                                            Authorization:
                                              localStorage.getItem("Token"),
                                            "Content-Type": "application/json",
                                          },
                                        })
                                          .then(function (response) {
                                            Swal.fire({
                                              icon: "success",
                                              title: "Deleted!",
                                              text: `Your room meeting invitation has been deleted.`,
                                              confirmButtonColor: "#367FA9",
                                              html: `<h5>You have deleted room meeting invitation <b>${item.title}</b>.</h5>`,
                                            }).then(function (response) {
                                              props.history.go();
                                            });
                                          })
                                          .catch(function (error) {
                                            Swal.fire({
                                              icon: "error",
                                              title: "Error!",
                                              html: `<h5>Can't send message<b> ERROR CODE ${STATUS_CODE_408}</b>.</h5>`,
                                              confirmButtonColor: "#367FA9",
                                            });
                                          });
                                      }
                                    });
                                  }}
                                />
                              </div>
                            </li>
                          </>
                        ))}
                    </>
                  )}
                </ul>
              </div>
              {/* /.box-body */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InvitToGmail;
