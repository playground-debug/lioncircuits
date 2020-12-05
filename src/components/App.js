import React, { useState } from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import UpdateProfile from "./UpdateProfile"
import Profile from "./Profile"
import Header from "./Header"

function App() {

  return (
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Dashboard} />
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "500px" }}>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
              <Route path="/update/:value" component={UpdateProfile} />
            </div>
          </Container>
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App