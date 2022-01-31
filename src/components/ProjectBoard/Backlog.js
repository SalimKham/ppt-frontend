import React, { Component } from "react";


import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  

    render(){
      let todoItems = [];
      let inProgress = [];
      let doneItems = [];
      const {project_task} = this.props;
      
      project_task.map(task => {
        switch (task.status) {
          case "TO_DO": {
             todoItems.push(<ProjectTask key={task.id} project_task={task}/>);
             break
            }
          case "IN_PROGRESS":{ 
            inProgress.push(<ProjectTask key={task.id} project_task={task}/>);
            break;
          }
          default:
            doneItems.push(<ProjectTask key={task.id} project_task={task} />);
            break
        }
       return null
      }
        
       
      )
        return(
       
        <div className="container" >
          <div className="row">
           { todoItems.length !==0 && <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-secondary text-white">
                  <h3>TO DO</h3>
                </div>
              </div>
              {todoItems}
            </div>}
          
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-primary text-white">
                  <h3>In Progress</h3>
                </div>
              </div>
              {inProgress}
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-success text-white">
                  <h3>Done</h3>
                </div>
              </div>
              {doneItems}
            </div>
          </div>
        </div>)
    }
}
export default Backlog;