import React, { Component } from "react";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";
import Main from "./components/main/main";
import RoomCreate from "./components/rooms/roomCreate/roomCreate";
import RoomUpdate from "./components/rooms/roomUpdate/roomUpdate";

import RoomInvitLine from "./components/rooms/roomInvit/invitToline";
import RoomTokenLine from "./components/rooms/roomInvit/tokenLine";
import RoomTokenLineUpdate from "./components/rooms/roomInvit/tokenLineUpdate";

import RoomInvitGmail from "./components/rooms/roomInvit/invitToGmail";

import RoomGmail from "./components/rooms/roomInvit/gmail";
import RoomGmailUpdate from "./components/rooms/roomInvit/gmailUpdate";

import "./App.css";
import { server, YES } from "./constants";
import { setApp } from "./redux/actions/app.action";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";

const isLoggedIn = () => {
  if (!localStorage.getItem("Token")) {
    localStorage.clear();
    return localStorage.getItem(server.LOGIN_PASSED) == YES;
  } else {
    return localStorage.getItem(server.LOGIN_PASSED) == YES;
  }
  // return localStorage.getItem(server.LOGIN_PASSED) == YES;
};

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.setApp(this);
  }

  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  render() {
    return (
      <Router>
        <div>
          {isLoggedIn() && <Header />}
          {isLoggedIn() && <Menu />}
          <Switch>
            <Route path="/login" component={Login} />
            <SecuredRoute path="/main" component={Main} />
            <SecuredRoute path="/room-create" component={RoomCreate} />
            <SecuredRoute path="/room-update/:id" component={RoomUpdate} />
            /////////////////
            <SecuredRoute path="/invit-to-line/:id" component={RoomInvitLine} />
            <SecuredRoute path="/line-token" component={RoomTokenLine} />
            <SecuredRoute
              path="/line-token-update/:id"
              component={RoomTokenLineUpdate}
            />
            /////////////////
            <SecuredRoute path="/invit-to-gmail" component={RoomInvitGmail} />
            <SecuredRoute path="/gmail" component={RoomGmail} />
            <SecuredRoute
              path="/gmail-update/:id"
              component={RoomGmailUpdate}
            />
            ////////////////
            <Route exact={true} path="/" component={this.redirectToLogin} />
            <Route path="*" component={this.redirectToLogin} />
          </Switch>
          {isLoggedIn() && <Footer />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
