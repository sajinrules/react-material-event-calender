var React = require("react");
var moment= require("moment");
const Badge = require('material-ui/lib/badge');
var Leftnav = require('./Leftnav');

var Day = React.createClass({
	handleClick:function() {
		this.refs.leftNav.refs.leftNav.toggle();
	},
	render: function() {
		var count = this.props.count;
		var data = this.props.data || {};
		var startDay = this.props.startDay;
		var current = (this.props.day) ? new Date(this.props.day).getDate() : ""
		var index = this.props.index;

		var colStyle='';
		var col= {float:'left',width: '13.6%',textAlign:'left',display: 'block',padding:'5px',borderBottom:'1px solid #ddd',borderLeft:'1px solid #ddd'};
		var colLast= {float:'left',width: '13.6%',textAlign:'left',display: 'block',padding:'5px',borderBottom:'1px solid #ddd',borderLeft:'1px solid #ddd',borderRight:'1px solid #ddd'};
		var newIndex = index+1;
		if(newIndex%7===0 || newIndex===count){
			colStyle=colLast
		}else{
			colStyle=col;
		}
		
		var events = data.filter(function(item,i){
			var day= moment(item.start).date()
			return current===day
		});
		var style ={float: 'right'}
		return (
			<div style={colStyle} className="day" onClick={this.handleClick}>{current}
			{
				(events.length > 0) ? <div style={style}><Badge badgeContent={events.length} secondary={true}></Badge></div> : ""
			}
				<Leftnav ref="leftNav" docked={false} data={events}></Leftnav>
			</div>
		);
	}
});

module.exports = Day;