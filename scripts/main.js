var React = require('react');
var ReactDOM = require('react-dom');
var Calendar = require("./components/Calender");
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

ReactDOM.render(<Calendar />,document.getElementById('main'));
