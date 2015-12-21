var React = require("react");
const AppBar = require('material-ui/lib/app-bar');
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
const ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');	
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const DropDownIcon = require('material-ui/lib/drop-down-icon');
const FontIcon = require('material-ui/lib/font-icon')
const RaisedButton = require('material-ui/lib/raised-button');
const IconButton = require('material-ui/lib/icon-button');
const Previous = require('material-ui/lib/svg-icons/navigation/arrow-back.js')
const Forward = require('material-ui/lib/svg-icons/navigation/arrow-forward.js')
const DateRange = require('material-ui/lib/svg-icons/action/date-range.js')

var Header = React.createClass({
	select: function(selection){
		this.props.option(selection)
	},
	render: function() {
		var data = this.props.data || {};
		var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var month = MONTHS[this.props.month];
		return (
			<div>
				<AppBar title="React Material Calendar"  iconClassNameRight="muidocs-icon-navigation-expand-more" />
				<Toolbar style={{textAlign:'center'}}>
					<ToolbarGroup key={0} float="left">
						<IconButton touch={true}  onClick={this.props.onPrevMonth}>
							<Previous/>
						</IconButton>
					</ToolbarGroup>
					<IconButton  touch={true} >
						<DateRange/>
					</IconButton>

					<ToolbarTitle text={month+" "+ this.props.year} ></ToolbarTitle>

					<ToolbarGroup key={1} float="right">
						<RaisedButton label="Month" onClick={this.select.bind(this,'month')} primary={true} />
	    				<RaisedButton label="Day" onClick={this.select.bind(this,'day')} primary={true} />
						<IconButton  touch={true} onClick={this.props.onNextMonth}>
							<Forward/>
						</IconButton>
					</ToolbarGroup>
					
				</Toolbar>
			</div>
			
		);
	}
});

module.exports = Header;