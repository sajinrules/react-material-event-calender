var React = require("react");
var moment = require("moment");
var Day = require('./Day');
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
		var data = this.props.events || [];
		//console.log("this.props:",this.props);
		var currMonth = this.props.month;
		var currYear = this.props.year
		var col= {float:'left',width: '13%',textAlign:'left',display: 'block',padding:'5px',borderBottom:'1px solid #ddd',borderLeft:'1px solid #ddd'};
		var week =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',]
		var startOfMonth = moment().month(this.props.month).year(this.props.year).startOf('month');
		var endOfMonth = moment().month(this.props.month).year(this.props.year).endOf('month');
		var startDay = startOfMonth.day()
		//console.log("startDay:",startDay);
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
		//console.log("data:",data);
		var events = data.filter(function(item){
			//console.log("item:",item.start);
			var date = moment(item.start);
			//console.log("date:",date);
			var month = date.month();
			//console.log("this.props.month:",this.props);
			var year = date.year();
			//console.log("year:",year);
			return currMonth===month && currYear===year
		})
		//console.log("datas:",data);
		/*createDay = function(day){
			console.log("day:",day);
		}*/
		//console.log(days);
		return (
			<div style={{margin:'0px auto'}}>
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
								<Day day={day} data={events} index={i} key={i} startDay={startDay}></Day>
							)
						})
					}
					{/*<div style={col} className="day">1</div>
										<div style={col} className="day">2</div>
										
										<div style={col} className="day">3</div>
										<div style={col} className="day">4</div>
										
										<div style={col} className="day">5</div>
										<div style={col} className="day">6</div>
										
										<div style={col} className="day">7</div>
										<div style={col} className="day">8</div>*/}
				</div>
				
			</div>
			
		);
	}
});

module.exports = Month;