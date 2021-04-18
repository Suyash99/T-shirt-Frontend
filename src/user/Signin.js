import React, {useState} from 'react'
import Base from "../core/Base"
import {Link, Redirect} from 'react-router-dom'

import {signIn, authenticate, isAuthenticated} from "../auth/helper"


const Signin = () => {

  const [values, setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading: false,
        didRedirect: false
    })

    const {email, password, error, loading, didRedirect} = values
    const {user} = isAuthenticated()

  const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

  const onSubmit = event => {
          event.preventDefault()
          setValues({...values, error: false, loading: true})
          signIn({email, password})
          .then(data => {
              if(data.error){
                console.log(data);
                setValues({...values, error: data.error, loading: true})
              } else {
                  authenticate(data, () => {
                      setValues({
                          ...values,
                          didRedirect: true,
                      })
                  })
              }
          })
          .catch((err) =>console.log(err, "err"))
      }

      const performRedirect = () => {
        if(didRedirect){
          if(user && user.role === 1){
            return <p>redirecting to admin</p>
          } else {
            return <p>redirecting to home</p>
          }
        }
    }
      const redirect = () => {
        if (isAuthenticated()) {
          if(user && user.role === 1){
          return <Redirect to="/admin/dashboard" />;
          } else {
          return <Redirect to="/" />;
          }
      }
      }
    
  const loadingMessage = () => {
    return(
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    )
  }

  const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-4 offset-sm-4 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };
    
  const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input onChange={handleChange("email")} value= {email} className="form-control" type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input onChange={handleChange("password")} value= {password} className="form-control" type="password"/>
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto">
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Signin Page" description="A page for user to signin!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            {redirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin

