var React = require("react");
var moment = require("moment");
var Day = require('./Day');

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
		var data = this.props.events || [];
		var currMonth = this.props.month;
		var currYear = this.props.year
		var col= {float:'left',width: '13.6%',textAlign:'left',display: 'block',padding:'5px',borderBottom:'1px solid #ddd',borderLeft:'1px solid #ddd'};
		var week =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',]
		var startOfMonth = moment().month(this.props.month).year(this.props.year).startOf('month');
		var endOfMonth = moment().month(this.props.month).year(this.props.year).endOf('month');
		var endOfLastMonth = new Date(moment().month(this.props.month-1).year(this.props.year).endOf('month')).getDate();
		//console.log("endOfLastMonth:",new Date(endOfLastMonth).getDate());
		var startDay = startOfMonth.day()
		var days = [];
		var day = startOfMonth;
		var j=0;
		while (day <= endOfMonth) {
		    days.push(day.toDate());
		    day = day.clone().add(1, 'd');
		}
		while(j<startDay){
			days.unshift("");
			j++;
		}
		var events = data.filter(function(item){
			var date = moment(item.start);
			var month = date.month();
			var year = date.year();
			return currMonth===month && currYear===year
		})
		return (
			<div  style={{width:'90%',margin:'0px auto'}}>
				<div>
				{
					week.map(function(item,i){
						return(
							<div className="week" style={col} key={i}>{item}</div>
						)
					})
				}
				</div>
				<div>
					{
						days.map(function(day,i){
													
							return(
								<Day day={day} lastMonthDays={j} last={endOfLastMonth} data={events} count={days.length} index={i} key={i} startDay={startDay}></Day>
							)
						})
					}
					
				</div>
				
			</div>
			
		);
	}
});

module.exports = Month;