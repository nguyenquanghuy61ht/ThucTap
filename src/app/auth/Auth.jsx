import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
import history from "history.js";
import ConstantList from "../appConfig";
class Auth extends Component {
  state = {};
  
  constructor(props) {
    super(props);
    let user = localStorageService.getItem("auth_user");
    
    if(user!=null){
      jwtAuthService.setSession(user.token);
      this.props.setUserData(user);
    }else {
      history.push(ConstantList.LOGIN_PAGE)
    }
    
    //this.checkJwtAuth();
    // this.checkFirebaseAuth();
  }

  checkJwtAuth = () => {
    jwtAuthService.loginWithToken().then(user => {
      this.props.setUserData(user);
    });
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login
});

export default connect(
  mapStateToProps,
  { setUserData }
)(Auth);
