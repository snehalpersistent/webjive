import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getIsLoggedIn } from "../../selectors/user";
import { setModal } from "../../actions/modal";

class NotLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.handleGoToLogin = this.handleGoToLogin.bind(this);
  }

  handleGoToLogin(e) {
    e.preventDefault();
    this.props.onGoToLogin();
  }

  render() {
    return this.props.isLoggedIn ? null : (
      <div className="alert alert-warning" role="alert">
        {this.props.children}{" "}
        <a href="#" onClick={this.handleGoToLogin}>
          Click here to log in.
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: getIsLoggedIn(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGoToLogin: () => dispatch(setModal("LOGIN"))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotLoggedIn);
