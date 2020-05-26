import React, { Component } from "react";

import User from "./User";

export default (CurrentComponent) =>
  class WrappedComponent extends Component {
    state = {
      user: User.data,
    };

    constructor(props) {
      super(props);

      User.subscribe(this.listener);
    }

    componentWillUnmount() {
      User.unsubscribe(this.listener);
    }

    listener = (user) => this.setState({ user });

    render() {
      const { user } = this.state;

      return <CurrentComponent {...this.props} user={user} />;
    }
  };
