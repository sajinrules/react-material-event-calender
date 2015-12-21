var React = require("react");
var Header = require('./Header');
var Month = require('./Month');
var Daily = require('./Daily')

var Calendar = React.createClass({
	getInitialState: function() {
		return {
			currMonth: (new Date()).getMonth(),
			currYear: (new Date()).getFullYear(),
			events :[],
			option : 'month'
		};
	},
	select : function(selected){
		this.setState({option:selected});
	},
	componentWillMount:function(){
		var that = this;
		$.ajax({
			url: "eventdata/mediumEvent.json",
			success: function (data) {
				that.setState({events:data})
			}
		});
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
		return (
			<div>
				<Header month={this.state.currMonth} year={this.state.currYear} onPrevMonth={this.prevMonth} onNextMonth={this.nextMonth} option={this.select}/>
				{
					(this.state.option==='month') ? <Month month={this.state.currMonth} year={this.state.currYear} events={this.state.events}/> : <Daily events={this.state.events} month={this.state.currMonth} year={this.state.currYear} />
				}	
			</div>
			
		);
	}
});

module.exports = Calendar;