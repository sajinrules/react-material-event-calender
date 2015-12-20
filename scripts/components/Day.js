var React = require("react");
var moment= require("moment");
const DateRange = require('material-ui/lib/svg-icons/action/date-range.js')
const Badge = require('material-ui/lib/badge');
const LeftNav = require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menus/menu-item');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');

var Day = React.createClass({
	handleClick() {
	console.log(this);
		this.refs.leftNav.toggle();
	},
	render: function() {
		var col= {float:'left',width: '13%',textAlign:'left',display: 'block',padding:'5px',borderBottom:'1px solid #ddd',borderLeft:'1px solid #ddd'};
		var data = this.props.data || {};
		var startDay = this.props.startDay;
		var current = (this.props.day) ? new Date(this.props.day).getDate() : ""
		var index = this.props.index;
		var events = data.filter(function(item,i){
			var day= moment(item.start).date()
			return current===day
		});
		var style ={float: 'right'}
			//console.log("events:",events);
		return (
			<div style={col} className="day" onClick={this.handleClick}>{current}
			{
				(events.length > 0) ? <div style={style}><Badge badgeContent={events.length} secondary={true}></Badge></div> : ""
			}
				<LeftNav ref="leftNav" docked={false} header="Events">
					{
						events.map(function(event,i){
							return(
								<div>
									<List>
										<ListItem primaryText={event.title} />
										<ListItem primaryText={event.type}/>
									</List>
									<ListDivider />
								</div>
							)
						})
					}
				</LeftNav>
			</div>
		);
	}
});

module.exports = Day;