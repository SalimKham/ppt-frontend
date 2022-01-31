import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {deleteTask} from "../../../actions/backlogActions";

class ProjectTask extends Component {
  onDelete(sequence){
    this.props.deleteTask(sequence);
  }
  render(){
    const {project_task} = this.props;
    let priority_class="";
    let priorityText = "";
   
    switch (project_task.priority) {
      case 1: {
       priority_class = "bg-danger text-light";
       priorityText = "HIGH";
       break;
      }
       case 2 : 
       {
       priority_class = "bg-warning text-light";
       priorityText = "MEDIUM";
       break;
      }
      case 3: {
        priority_class = "bg-info text-light";
        priorityText = "LOW"
        break
      }
      default:
        break
        
       
    }

return (
  
      <div className="card mb-1 bg-light">
        <div className={"card-header text-primary " + priority_class}>
          ID: {project_task.projectSequence} -- Priority: {priorityText}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{project_task.summary}</h5>
          <p className="card-text text-truncate ">
           { project_task.acceptanceCriteria}
          </p>
          <Link to={"/updateTask/"+project_task.projectIdentifier+"/"+project_task.projectSequence} className="btn btn-primary">
            View / Update
          </Link>

          <button className="btn btn-danger ml-4" onClick ={this.onDelete.bind(this,project_task.projectSequence)}>Delete</button>
        </div>
      </div>

   
 
)
    }
  
};
export default connect(null,{deleteTask})(ProjectTask);