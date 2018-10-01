import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
//import Bootsrap from 'bootstrap'
//import jQuery from 'bootstrap-jquery'
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      edit: -1,
      editInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  submitMessage() {
    if (this.state.input) {
      this.props.submitNewMessage(this.state.input);
      this.props.submitPost(this.state.input);
    }
    this.setState({ input: "" });
  }

  handleDelete(index) {
    var item = this.props.messages[index];
    this.props.submitDelete(index, item);
  }

  handleEditToggle = index => {
    this.setState({ edit: index });
  };

  handleEditChange(event, idx) {
    this.setState({
      editInput: event.target.value,
      index: idx
    });
  }

  handleEditSave = idx => {
    this.setState({ editInput: "" });
    if (this.state.editInput === "") {
      this.setState({ edit: -1 });
    } else {
      this.props.saveEdit(idx, this.state.editInput);
      this.setState({ edit: -1 });
    }
  };

  componentDidMount() {
    this.props.submitGet();
  }

  render() {
    return (
      <div className="container-fluid  text-center border border-primary">
        <div className="jumbotron">
          <h2 className="text-center  ">Add item to todo:</h2>
          <p>Todos Are Saved On Page Reload In Mongo Database</p>
        </div>
        <div className="form-group">
          <input
            className="text-center btn btn-outline-primary btn-sm"
            value={this.state.input}
            onChange={this.handleChange}
          />

          <button className=" btn btn-dark " onClick={this.submitMessage}>
            Submit
          </button>
        </div>
        <ul className="list-group">
          {this.props.messages.map((message, idx) => {
            return (
              <li
                key={idx}
                className="list-group-item
                d-flex
                justify-content-between
                align-items-center"
              >
                {this.state.edit === idx ? (
                  <div>
                    <input
                      id={idx}
                      className="text-center "
                      placeholder={this.props.messages[idx]}
                      onChange={this.handleEditChange.bind(this.idx)}
                    />
                    <button
                      className="btn btn-primary "
                      style={{ cursor: "not-allowed" }}
                      onClick={this.handleDelete.bind(this, idx)}
                    >
                      delete
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={this.handleEditSave.bind(this, idx)}
                    >
                      save
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-danger ml-1  "
                      style={{ cursor: "not-allowed" }}
                      onClick={this.handleDelete.bind(this, idx)}
                    >
                      delete
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={this.handleEditToggle.bind(this, idx)}
                    >
                      edit
                    </button>
                    &nbsp;{/*message*/}
                    {this.props.messages[idx]}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { messages: state };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostDelete: item => {
      dispatch(actions.getDelete(item));
    },
    submitPost: message => {
      dispatch(actions.postRequest(message));
    },
    submitGet: () => {
      dispatch(actions.getRequest());
    },
    submitNewMessage: message => {
      dispatch(actions.addMessage(message));
    },
    submitDelete: (index, item) => {
      // dispatch(actions.deleteMessage(index));
      dispatch(actions.getDelete(index, item));
    },
    saveEdit: (index, item) => {
      dispatch(actions.editMessage(index, item));
    },
    endPoint: url => {
      dispatch(actions.apiCall(url));
    }
  };
};

const container = () =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Presentational);

export default container();
