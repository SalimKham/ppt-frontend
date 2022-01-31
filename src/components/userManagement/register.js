import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types'
import {createUser} from '../../actions/userActions'

 class register extends Component {
     constructor(){
         super();
         this.state = {
             username :"",
             fullName :"",
             password :"",
             confirmPassword:"" ,
             errors : {}
         }
         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
     }
     onChange(e){
         this.setState({[e.target.name]:e.target.value})
     }

     componentWillReceiveProps(nextProps){
         if(nextProps.errors){
             this.setState({errors : nextProps.errors});
         }
     }
     onSubmit(e){
         e.preventDefault();
         const newUser = {
            "username" :this.state.username,
            "fullName" :this.state.fullName,
            "password" :this.state.password,
            "confirmPassword":this.state.confirmPassword ,
         }

         this.props.createUser(newUser,this.props.history);
     }
  render() {
      const {errors} = this.state;
    return (
      <div>
      <div className="register">
      <div className="container">
          <div className="row">
              <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your Account</p>
                  <form onSubmit = {this.onSubmit}>
                      <div className="form-group">
                          <input type="text" className={"form-control form-control-lg" +(errors.fullName?" is-invalid ":"") } placeholder="Name" 
                          name="fullName"
                          value = {this.state.fullName}
                          onChange = {this.onChange}
                              />
                              {errors.fullName? <div className ="invalid-feedback"> {errors.fullName} </div> : ""}    
                      </div>
                     
                      <div className="form-group">
                          <input type="text" className={"form-control form-control-lg" +(errors.username?" is-invalid ":"") } placeholder="Email Address" name="username" value = {this.state.username}
                          onChange = {this.onChange}/>
                          {errors.username? <div className ="invalid-feedback"> {errors.username} </div> : ""}  
                      </div>
                      <div className="form-group">
                          <input type="password" className={"form-control form-control-lg" +(errors.password?" is-invalid ":"") } placeholder="Password" name="password" value = {this.state.password}
                          onChange = {this.onChange}/>
                          {errors.password? <div className ="invalid-feedback"> {errors.password} </div> : ""}  
                      </div>
                      
                      <div className="form-group">
                          <input type="password" className={"form-control form-control-lg" +(errors.confirmPassword?" is-invalid ":"") } placeholder="Confirm Password"
                              name="confirmPassword" value = {this.state.confirmPassword}  onChange = {this.onChange}/>
                              {errors.confirmPassword? <div className ="invalid-feedback"> {errors.confirmPassword} </div> : ""}       
                      </div>
                     
                      <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
              </div>
          </div>
      </div>
  </div>

      </div>
    )
  }
}
register.propTypes = {
    createUser : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    errors:state.errors
})

export default connect(mapStateToProps , {createUser})(register);
