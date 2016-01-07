var React = require("react");
const LeftNav = require('material-ui/lib/left-nav');
const ListDivider = require('material-ui/lib/lists/list-divider');
const MenuItem = require('material-ui/lib/menus/menu-item');
var Leftnav = React.createClass({
	render: function() {
		var events = this.props.data || {};
		//console.log("events:",events);
		return (
			<div>
				<LeftNav ref="leftNav" docked={false} >
					{
						events.map(function(event,i){
							return(
								<div key={i}>
									<MenuItem primaryText={event.title}></MenuItem>
									<MenuItem primaryText={event.type}></MenuItem>
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

module.exports = Leftnav;