import { connect } from "react-redux";
import Presentational from "../src/components/Presentational";
import * as actions from "./actions/actions";

const mapStateToProps = state => {
  return { messages: state };
};

const mapDispatchToProps = dispatch => {
  return {
    submitNewMessage: message => {
      dispatch(actions.addMessage(message));
    },
    submitDelete: index => {
      console.log(index);
      dispatch(actions.deleteMessage(index));
    },
    saveEdit: (index, item) => {
      console.log(index, item + " saveEdit");
      dispatch(actions.editMessage(index, item));
    }
  };
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational);
export default Container;
