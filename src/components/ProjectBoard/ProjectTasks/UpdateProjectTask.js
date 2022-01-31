
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { addProjectTask,getProjectTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";

class UpdateProjectTask extends Component {
  constructor(props) {
    super(props);
    const { identifier } = this.props.match.params;
    const { sequence } = this.props.match.params;

    this.state = {
      id:"",
      projectSequence : sequence,
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: 0,
      dueDate: "",
      projectIdentifier: identifier,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getProjectTask(this.state.projectIdentifier,this.state.projectSequence, this.props.history);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors:nextProps.errors});
    }
    const {project_task} = nextProps;
    this.setState({
      id : project_task.id,
      summary: project_task.summary,
      acceptanceCriteria: project_task.acceptanceCriteria,
      status: project_task.status,
      priority: project_task.priority,
      dueDate: project_task.dueDate,
    })

  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  onSubmit(e){
    e.preventDefault();
    const task = {
      "id":this.state.id,
      "summary": this.state.summary,
      "acceptanceCriteria": this.state.acceptanceCriteria,
      "status": this.state.status,
      "priority": this.state.priority,
      "dueDate": this.state.dueDate, 
    }

    this.props.addProjectTask(this.state.projectIdentifier,task , this.props.history);
   
  }
  render() {
    const { id } = this.props.match.params;
    const {errors} = this.state;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${id}`} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">update Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form onSubmit = {this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange = {this.onChange}
                  />
                  {errors.summary && (
                      <div className="invalid-feedback">
                        {errors.summary}
                      </div>
                    )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange = {this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange = {this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange = {this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange = {this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



UpdateProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  getProjectTask: PropTypes.func.isRequired,
  errors:PropTypes.object.isRequired
  
};

const mapStateToProps = state =>({
  errors:state.errors,
  project_task : state.backlog.project_task
})

export default connect(
  mapStateToProps,
  { addProjectTask,getProjectTask}
)(UpdateProjectTask);