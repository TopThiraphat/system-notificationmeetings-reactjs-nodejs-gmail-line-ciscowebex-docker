import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { server } from "../../constants/index";
import Swal from "sweetalert2";

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        {/* Logo */}
        <Link to="/main">
          <a href="index2.html" className="logo">
            <span className="logo-mini">
              <b>A</b>PI
            </span>

            <span className="logo-lg">
              <b>TKC</b> Webex
            </span>
          </a>
        </Link>

        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <a
            href="#"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          {/* Navbar Right Menu */}
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/settings.png`}
                    className="user-image"
                    alt="User Image"
                  />
                  <span className="hidden-xs">
                    <b>Setting</b>
                  </span>
                </a>
                <ul className="dropdown-menu">
                  {/* User image */}
                  <li className="user-header">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/tkc.png`}
                      className="img-circle"
                      alt="User Image"
                    />
                    <p>TKC user</p>
                  </li>
                  {/* Menu Body */}

                  {/* Menu Footer*/}
                  <li className="user-footer">
                    <div
                      className="pull-right"
                      onClick={() => {
                        this.props.history.push("/login");

                        localStorage.clear();
                        this.props.appReducer.app.forceUpdate();
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Logout successfully.",
                          html: `<h5>You now have logout to the <b>Webex API</b>.</h5>`,
                          showConfirmButton: false,
                          timer: 3000,
                        });
                      }}
                    >
                      <button className="btn btn-default btn-flat">
                        Sign out
                      </button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({
  appReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
