import React, { Component,useContext } from 'react';
import { Router } from "@reach/router";
import { DatabaseProvider } from './provider/database';
import { TodoApp } from './component/page/todo.app';
import { AppProvider } from './provider/AppProvider';


function App(){

  return (
    <DatabaseProvider>
      <AppProvider>
          <Route/>
      </AppProvider>
    </DatabaseProvider>
  )
}




function Route(){

  
  return (
    <Router>
      <TodoApp path="/"/>
    </Router>
  )
}





export default App;