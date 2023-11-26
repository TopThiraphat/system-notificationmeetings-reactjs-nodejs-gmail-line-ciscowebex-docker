import React from "react";
import { Link, withRouter } from "react-router-dom";

function menu() {
  return (
    <aside className="main-sidebar">
      {/* sidebar: style can be found in sidebar.less */}
      <section className="sidebar">
        {/* Sidebar user panel */}
        <div className="user-panel">
          <div className="pull-left image">
            <img
              src={`${process.env.PUBLIC_URL}/images/tkc.png`}
              // className="img-circle"
              alt="User Image"
            />
          </div>
          <div className="pull-left info">
            <p>TKC user</p>
            <a>
              <i className="fa fa-circle text-success" /> Online
            </a>
          </div>
        </div>
        <ul className="sidebar-menu" data-widget="tree">
          <li className="header">MAIN NAVIGATION</li>
          <li className="active treeview menu-open">
            <a>
              <i className="fa fa-dashboard" /> <span>Dashboard</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>

            <ul className="treeview-menu">
              <li className="active">
                <Link to="/room-create">
                  <i className="fa fa-circle-o" /> Create room
                </Link>
              </li>
              <li className="active">
                <Link to="/invit-to-gmail">
                  <i className="fa fa-circle-o" /> Invit to gmail
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      {/* /.sidebar */}
    </aside>
  );
}

export default withRouter(menu);
