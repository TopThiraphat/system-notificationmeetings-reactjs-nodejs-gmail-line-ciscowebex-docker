import React, { Component } from "react";
import * as actions from "./../../../../redux/actions/gmail.action";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { httpClient } from "./../../../../utils/HttpClient";
import {
  server,
  OK,
  YES,
  STATUS_CODE_200,
  STATUS_CODE_401,
} from "../../../../constants";

class Gmail extends Component {
  componentDidMount() {
    this.props.getGmail();
  }

  showForm = ({
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
            Name :
          </label>
          <div className="col-sm-10">
            <input
              name="name"
              onChange={handleChange}
              value={values.name}
              placeholder="name gmail"
              className="form-control"
              type="text"
              id="name"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Gmail :
          </label>
          <div className="col-sm-10">
            <input
              name="gmail"
              onChange={handleChange}
              value={values.gmail}
              placeholder="gmail"
              className="form-control"
              type="email"
              id="gmail"
            />
          </div>
        </div>

        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary pull-right"
          >
            Submit
          </button>

          <a
            type="Button"
            className="btn btn-default pull-right"
            style={{ marginRight: 10 }}
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Cancel
          </a>
        </div>
      </form>
    );
  };

  render() {
    const { result, isFetching } = this.props.gmail;
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
            <li>
              <a
                onClick={() => {
                  this.props.history.goBack();
                }}
                style={{ cursor: "pointer" }}
              >
                Invit To Gmail
              </a>
            </li>
            <li>Create gmail </li>
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
                Create gmail
              </p>
            </div>
            <div className="box-body" style={{ marginTop: 30 }}>
              <Formik
                initialValues={{ name: "", gmail: "" }}
                onSubmit={async (values, { setSubmitting }) => {
                  let formData = new FormData();
                  formData.append("name", values.name);
                  formData.append("gmail", values.gmail);

                  if (values.name != "" && values.gmail != "") {
                    let result = await httpClient.post(server.GMAIL, formData);
                    if (result.data.result == OK) {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your gmail has been created.",
                        html: `<h5>You have created gmail <b>${values.gmail}</b>.</h5>`,
                        showConfirmButton: false,
                        timer: 3000,
                      }).then((result) => {
                        setSubmitting(false);
                        this.props.history.go();
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Error!",
                        html: `<h5>Can't send message<b> ERROR CODE ${STATUS_CODE_401}</b>.</h5>`,
                        confirmButtonColor: "#367FA9",
                      }).then((result) => {
                        setSubmitting(false);
                      });
                    }
                  } else {
                    Swal.fire({
                      icon: "warning",
                      title: "warning!",
                      html: `<h5>Please enter <b>name or gmail</b>.</h5>`,
                      confirmButtonColor: "#367FA9",
                    }).then((result) => {
                      setSubmitting(false);
                    });
                  }
                }}
              >
                {(props) => this.showForm(props)}
              </Formik>
            </div>

            <div className="box-body" style={{ marginTop: 30 }}>
              {/* TO DO List */}
              <div className="box box-primary">
                <div className="box-header">
                  <i className="ion ion-clipboard" />
                  <h3 className="box-title">Chat list</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ul className="todo-list">
                    {!isFetching &&
                      result != null &&
                      result.map((item) => (
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
                                  title: `Gmail`,
                                  html: `
                                  <p>Name : <b>${item.name}</b></p>
                                  <p>Gmail : <b>${item.gmail}</b></p>
                                  `,
                                  confirmButtonColor: "#367FA9",
                                });
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {item.name}
                            </span>

                            <div className="tools">
                              <i
                                className="fa fa-edit"
                                onClick={() => {
                                  this.props.history.push(
                                    `/gmail-update/${item.gmail}/?name=${item.name}`
                                  );
                                }}
                              />
                              <i
                                className="fa fa-trash-o"
                                onClick={() => {
                                  Swal.fire({
                                    title: `Are you sure delete gmail ${item.name} ?`,
                                    text: "You won't be able to revert this!",
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonColor: "#367FA9",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      this.props.deleteGmail(item.gmail);
                                      Swal.fire({
                                        icon: "success",
                                        title: "Deleted!",
                                        text: `Your gmail has been deleted.`,
                                        confirmButtonColor: "#367FA9",
                                        html: `<h5>You have deleted gmail <b>${item.name}</b>.</h5>`,
                                      });
                                    }
                                  });
                                }}
                              />
                            </div>
                          </li>
                        </>
                      ))}
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
}

const mapStateToProps = ({ gmail }) => ({
  gmail,
});

const mapDispatchToProps = {
  // spreading
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gmail);
