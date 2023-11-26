import React, { Component } from "react";
import * as actions from "./../../../../redux/actions/tokenLine.action";
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
  NOT_CONNECT_NETWORK,
} from "../../../../constants";

class TokenLine extends Component {
  componentDidMount() {
    this.props.getTokenLine();
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
            Name chat :
          </label>
          <div className="col-sm-10">
            <input
              name="name"
              onChange={handleChange}
              value={values.name}
              placeholder="name chat"
              className="form-control"
              type="text"
              id="name"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Token chat :
          </label>
          <div className="col-sm-10">
            <input
              name="tokenline"
              onChange={handleChange}
              value={values.tokenline}
              placeholder="token line"
              className="form-control"
              type="text"
              id="tokenline"
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
        <div className="box-footer">
          <small>
            <a
              href="https://access.line.me/dialog/oauth/weblogin?response_type=code&client_id=1476232700&redirect_uri=https%3A%2F%2Fnotify-bot.line.me%2Flogin%2Fcallback&state=3KNam9IA0KAg94J3rqsFeP"
              style={{ color: "blue" }}
              target="_blank"
            >
              Are you looking for Token Line?
            </a>
          </small>
        </div>
      </form>
    );
  };

  render() {
    const { result, isFetching } = this.props.tokenLine;
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
                Invit To Line
              </a>
            </li>
            <li>Create token line</li>
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
                Create token line
              </p>
            </div>
            <div className="box-body" style={{ marginTop: 30 }}>
              <Formik
                initialValues={{ name: "", tokenline: "" }}
                onSubmit={async (values, { setSubmitting }) => {
                  let formData = new FormData();
                  formData.append("nameChat", values.name);
                  formData.append("token_line", values.tokenline);
                  formData.append("typeChat", "GROUP");
                  if (values.name != "" && values.tokenline != "") {
                    let result = await httpClient.post(
                      server.TOKEN_LINE,
                      formData
                    );
                    if (result.data.result == OK) {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your token line has been created.",
                        html: `<h5>You have created token line <b>${values.name}</b>.</h5>`,
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
                      html: `<h5>Please enter <b>name chat or token chat</b>.</h5>`,
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
                  {/* See dist/js/pages/dashboard.js to activate the todoList plugin */}
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
                                  title: "Token",
                                  html: `<h4>${item.token_line}</h4>`,
                                  confirmButtonColor: "#367FA9",
                                });
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {item.nameChat}
                            </span>

                            <div className="tools">
                              <i
                                className="fa fa-edit"
                                onClick={() => {
                                  this.props.history.push(
                                    `/line-token-update/${item.token_line}/?nameChat=${item.nameChat}`
                                  );
                                }}
                              />
                              <i
                                className="fa fa-trash-o"
                                onClick={() => {
                                  Swal.fire({
                                    title: `Are you sure delete token?`,
                                    html: `
                                    <p>You won't be able to revert this!</p>
                                    <p>Are you sure delete token <b>${item.nameChat}</b>?</p>
                                    `,
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonColor: "#367FA9",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      this.props.deleteTokenLine(
                                        item.token_line
                                      );
                                      Swal.fire({
                                        icon: "success",
                                        title: "Deleted!",
                                        text: `Your token line has been deleted.`,
                                        confirmButtonColor: "#367FA9",
                                        html: `<h5>You have deleted token line <b>${item.nameChat}</b>.</h5>`,
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

const mapStateToProps = ({ tokenLine }) => ({
  tokenLine,
});

const mapDispatchToProps = {
  // spreading
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenLine);
