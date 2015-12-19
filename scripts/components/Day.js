var React = require("react");
//var moment= require("moment");

var Day = React.createClass({
	render: function() {
		var col= {float:'left',width: '13%',textAlign:'left',display: 'block',padding:'5px',borderBottom:'1px solid #ddd',borderLeft:'1px solid #ddd'};
		var data = this.props.data || {};
		var startDay = this.props.startDay;
		var date = (this.props.day) ? new Date(this.props.day).getDate() : ""
		var index = this.props.index;
		console.log("this.props:",this.props.day)
		return (
			<div style={col} className="day">{date}</div>
		);
	}
});

module.exports = Day;