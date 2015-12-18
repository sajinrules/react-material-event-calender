var React = require("react");
const GridList = require('material-ui/lib/grid-list/grid-list');
const GridTile = require('material-ui/lib/grid-list/grid-tile');
/*var Header = require("./Header");
var Grid = require("./Grid");*/

/**
 * @class
 * 
 * Main Calendar class. Builds the Calendar component
 * using sub Header and Grid components. Default state
 * is an empty calendar with no items.
 * 
 * @prop data (optional) Calendar items to be displayed for specific dates. 
 *               See docs for expected data structure.
 */
var Month = React.createClass({
	getInitialState: function() {
		return {
			currMonth: (new Date()).getMonth(),
			currYear: (new Date()).getFullYear() 
		};
	},

	prevMonth: function(event) {
		var month = this.state.currMonth;
		var year = this.state.currYear;
		year = (month > 0) ? year : year-1;
		var prev = (month > 0) ? month-1 : 11;
		this.setState({currMonth: prev});
		this.setState({currYear: year});
	},

	nextMonth: function(event) {
		var month = this.state.currMonth;
		var year = this.state.currYear;
		var next = (month < 11) ? month+1 : 0;
		year = (month < 11) ? year : year+1;
		this.setState({currMonth: next});
		this.setState({currYear: year});
	},

	render: function() {
		var data = this.props.data || {};
		var col= {float:'left',width: '14%'};
		var week =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',]
		var header= {padding:'5px',display:'block',backgroundColor:'#eee',height:'25px',textAlign:'center'}
		return (
			<div>
				<div>
				{
					week.map(function(item,i){
						return(
							<div style={col} key={i}>{item}</div>
						)
					})
				}
				</div>
				<div>
					<div style={col}>1</div>
					<div style={col}>2</div>
					
					<div style={col}>3</div>
					<div style={col}>4</div>
					
					<div style={col}>5</div>
					<div style={col}>6</div>
					
					<div style={col}>7</div>
				</div>
				
			</div>
			
		);
	}
});

module.exports = Month;