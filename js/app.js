import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'

import Root from './Root'

require('../css/app.css')

var ReactDOM = require('react-dom');
 
var toDoList = [
  { name: "First", isDone: false },
  { name: "Second", isDone: false },
  { name: "Third", isDone: false },
  { name: "Four", isDone: false },
  { name: "Five", isDone: false },
  { name: "Six", isDone: true }
];

ReactDOM.render(
  <Root list={toDoList} />,
  document.getElementById('root')
);