var React = require("react");
var moment= require("moment");
const Badge = require('material-ui/lib/badge');
var Leftnav = require('./Leftnav');

var Day = React.createClass({
	handleClick:function() {
		this.refs.leftNav.refs.leftNav.toggle();
	},
	dragStart: function(e) {
		//this.dragged = e.currentTarget;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData("text", e.target.id);
	},
	dragEnd: function(e) {
		
	},
	dragOver: function(e) {
		e.preventDefault();
	},
	drop : function(e) {
		console.log("e",e);
		console.log("this:",this);
		console.log("e.currentTarget",e.currentTarget);
		console.log("e.target:",e.target);
		//console.log("e.target.children:",e.target.children);
		var data = e.dataTransfer.getData("text");
		if(e.target.children.length > 0)
			e.target.children[0].appendChild(document.getElementById(data));
		else
			e.currentTarget.children[3].children[0].appendChild(document.getElementById(data))
		
		e.preventDefault();
	},
	render: function() {
		var count = this.props.count;
		var data = this.props.data || {};
		var startDay = this.props.startDay;
		//console.log("last:",this.props.lastMonthDays);
		//console.log("index:",this.props.index);
		var index = this.props.index;
		var current = (this.props.day) ? new Date(this.props.day).getDate() : this.props.last-this.props.lastMonthDays+1+index;
		var colStyle='';
		var col= {float:'left',width: '13.6%',textAlign:'left',display: 'block',padding:'5px',borderBottom:'1px solid #ddd',borderLeft:'1px solid #ddd',overflow:'hidden'};
		var colLast= {float:'left',width: '13.6%',textAlign:'left',display: 'block',padding:'5px',borderBottom:'1px solid #ddd',borderLeft:'1px solid #ddd',borderRight:'1px solid #ddd',overflow:'hidden'};
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
		var listItems = events.map(function(item, i) {
			return (
				<li data-id={i}
					id={current+'-'+i}
				    key={i}
				    draggable="true"
				    onDragEnd={this.dragEnd}
				    onDragStart={this.dragStart}
				    >
				  {item.title}
				</li>
			);
		},this);
		return (
			<div style={colStyle} className="day" onClick={this.handleClick} onDrop={this.drop} onDragOver={this.dragOver}>{current}
			{
				(events.length > 0) ? <div style={style}><Badge badgeContent={events.length} secondary={true}></Badge></div> : ""
			}
				<Leftnav ref="leftNav" docked={false} data={events}></Leftnav>
				<div style={{overflow:'auto',height:'120px',width:'100%'}} >
					<ul id="drop" style={{padding:'2px',margin:'0px '}}>{listItems}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = Day;