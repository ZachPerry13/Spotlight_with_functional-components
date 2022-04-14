import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProjectList from './ProjectList';
import ProjectEdit from "./ProjectEdit";
import TaskList from "./TaskList";
import TaskEdit from "./TaskEdit";
import {CookiesProvider} from "react-cookie";
import Header from './ZachsComponents/Header';
import styled from "styled-components"
import Sidebar from "./ZachsComponents/Sidebar"


class App extends Component {
  render() {
    return (
      <div className='app'>
        <CookiesProvider>
           <EntireBody>
          <Router>
           <>
           <Header />
            <Sidebar />
            <AppBody>
              
              <Switch>
                <Route path='/' exact={true} component={Home}/>
                <Route path='/projects' exact={true} component={ProjectList}/>
                <Route exact path='/projects/:projectId' component={ProjectEdit}/>
                <Route exact path='/projects/:projectId/:projectName' component={TaskList}/>
                <Route exact path='/projects/:projectId/:projectName/:taskId' component={TaskEdit}/>
             </Switch>
            </AppBody>
            </>
          </Router>
          </EntireBody>
        </CookiesProvider>
        </div>
    )
  }
}

export default App;

const AppBody = styled.div`
display: flex;
width: 100%;
`
const EntireBody = styled.div`
display: flex;
height: 100vh;
width: 100%;
`