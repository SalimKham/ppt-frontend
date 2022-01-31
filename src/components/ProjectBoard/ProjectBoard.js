import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import {connect} from "react-redux";
import PropTypes from "prop-types"
import {getBacklog} from "../../actions/backlogActions"


class ProjectBoard extends Component {

  constructor(){
    super();
    this.state = {
      errors : {}
    }

  }
  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.getBacklog(id);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
    this.setState({"errors" : nextProps.errors});
    
  }
  }
  render() {

    const { id } = this.props.match.params;
    const {project_tasks} = this.props.backlog;
    const {errors} = this.state;
    const boardAlgorithm = (errors,project_tasks) =>{
      if(project_tasks.length === 0){
        if(errors.projectNotFound){
          return (
            <div className="alert alert-danger text-center" role ="alert">{errors.projectNotFound}</div>
          )
        }else{
         return( <div className="alert alert-info text-center" role ="alert">No project Tasks in this board</div>)
        }  

      }
      return (<Backlog project_task = {project_tasks}/>)
    }
   
    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
         {boardAlgorithm(errors , project_tasks)}
       
      </div>
    );
  }
}
ProjectBoard.propTypes = {
  getBacklog : PropTypes.func.isRequired,
  backlog : PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
const mapStateToProps = state  =>({
 backlog : state.backlog,
 errors : state.errors

})
export default connect(mapStateToProps,{getBacklog})(ProjectBoard);
