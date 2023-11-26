import React, { Component } from "react";
import { login, autoLogin } from "./../../redux/actions/main.action";
import { connect } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { server } from "../../constants/index";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
    };
  }

  componentDidMount() {
    this.props.autoLogin(this.props.history);
  }

  render() {
    return (
      <div className="">
        <div className="login-box">
          <div className="login-logo">
            <span className="logo-lg">
              <b>TKC</b> Webex
            </span>
          </div>
          {/* /.login-logo */}
          <div className="login-box-body">
            <p className="login-box-msg">Sign in Token to start your session</p>
            <div className="form-group has-feedback">
              <input
                type="Text"
                className="form-control"
                placeholder="Token"
                onChange={(e) => this.setState({ token: e.target.value })}
              />
            </div>

            <div className="row">
              {/* /.col */}
              <div className="col-xs-12">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.login(this.props.history, this.state);
                  }}
                >
                  Sign In
                </button>
                <small>
                  <a
                    href="https://developer.webex.com/docs/api/getting-started"
                    style={{ color: "blue" }}
                    target="_blank"
                  >
                    Are you looking for Webex Token?
                  </a>
                </small>
              </div>
              {/* /.col */}
            </div>
          </div>
          {/* /.login-box-body */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({ loginReducer });

const mapDispatchToProps = {
  login,
  autoLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
