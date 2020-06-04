import React from "react";
import { connect } from "react-redux";
// import { fetchUser } from "../actions";

class UserHeader extends React.Component {
  // componentDidMount() {
  //   this.props.fetchUser(this.props.userId);
  // } Removed since we created a combined function

  render() {
    // moving this to mapStateTo Props
    //const user = this.props.users.find((user) => user.id === this.props.userId);
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return <div className="header">{user.name}</div>;
  }
}

// ownProps is reference to component props
const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find((user) => user.id === ownProps.userId) };
};

export default connect(
  mapStateToProps
  // { fetchUser } Commented since we have a new common function
)(UserHeader);
