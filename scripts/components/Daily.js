var React = require("react");
var moment = require("moment");
const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
const ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');  
const IconButton = require('material-ui/lib/icon-button');
const Previous = require('material-ui/lib/svg-icons/navigation/arrow-back.js')
const DateRange = require('material-ui/lib/svg-icons/action/date-range.js')
const Forward = require('material-ui/lib/svg-icons/navigation/arrow-forward.js')

const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');
const Avatar = require('material-ui/lib/avatar');
const FlatButton = require('material-ui/lib/flat-button');

var Daily = React.createClass({
	getInitialState: function(){
		return{
			day:"",
			week: ""
		}
	},
	previous : function(today){
		var currMonth = this.props.month;
		var currYear = this.props.year;
		var data = this.props.events || [];
		var endOfMonth = moment().month(this.props.month).year(this.props.year).endOf('month').date();
		if(today>1){
			today = today-1;
		}else{
			today = endOfMonth;
		}

		var weekdays =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		var week = weekdays[new Date(currYear,currMonth,today).getDay()];
		this.setState({day:today});
		this.setState({week:week});
		
		var events = data.filter(function(item){
			var date = moment(item.start);
			var month = date.month();
			var year = date.year();
			var date = date.date();
			return currMonth===month && currYear===year && date===today
		})
		this.setState({events:events});
			
	},
	next : function(today){
		var currMonth = this.props.month;
		var currYear = this.props.year;
		var data = this.props.events || [];
		var endOfMonth = moment().month(this.props.month).year(this.props.year).endOf('month').date();
		if(today==endOfMonth){
			today = 1;
		}else{
			today = today+1;
		}

		var weekdays =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		var week = weekdays[new Date(currYear,currMonth,today).getDay()];
		this.setState({day:today});
		this.setState({week:week});
		
		var events = data.filter(function(item){
			var date = moment(item.start);
			var month = date.month();
			var year = date.year();
			var date = date.date();
			return currMonth===month && currYear===year && date===today
		})
		this.setState({events:events});
	},
	componentWillMount : function(today){
		var currMonth = this.props.month;
		var currYear = this.props.year;
		var today = moment().date();
		var data = this.props.events || [];
		var weekdays =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		var week = weekdays[new Date(currYear,currMonth,today).getDay()];
		this.setState({day:today});
		this.setState({week:week});
		
		var events = data.filter(function(item){
			var date = moment(item.start);
			var month = date.month();
			var year = date.year();
			var date = date.date();
			return currMonth===month && currYear===year && date===today
		})
		this.setState({events:events});

	},
	componentWillReceiveProps : function(nextProps){
		var data = nextProps.events || [];
		var currMonth = nextProps.month;
		var currYear = nextProps.year;
		var today = moment().date();
		
		var weekdays =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
		var week = weekdays[new Date(currYear,currMonth,today).getDay()];
		this.setState({day:today});
		this.setState({week:week});
		
		var events = data.filter(function(item){
			var date = moment(item.start);		
			var month = date.month();
			var year = date.year();
			var date = date.date();
			return currMonth===month && currYear===year && date===today
		})
		this.setState({events:events});
	},
	render:function(){
		return (
			<div>
				<Toolbar style={{textAlign:'right',borderTop:'1px solid #ddd'}}>
					<ToolbarGroup key={0} float="left">
						<IconButton touch={true} onClick={this.previous.bind(this,this.state.day)}>
							<Previous/>
						</IconButton>
					</ToolbarGroup>
					<IconButton  touch={true} >
						<DateRange/>
					</IconButton>
					<ToolbarTitle text={this.state.day+" "+this.state.week}></ToolbarTitle>
					<ToolbarGroup key={1} float="right">
						<IconButton  touch={true} onClick={this.next.bind(this,this.state.day)}>
							<Forward/>
						</IconButton>
					</ToolbarGroup>
					
				</Toolbar>
				<div>
				{
					this.state.events.map(function(event,i){
						return(
							<div key={i}>
								<Card initiallyExpanded={false}>
									<CardHeader
										title={event.title}
										subtitle={moment(event.start).format("h:mm A")}
										avatar={<Avatar style={{color:'red'}}>E</Avatar>}
										actAsExpander={true}
										showExpandableButton={true}>
									</CardHeader>
									<CardText expandable={true}>
										<div style={{margin:'10px 0px',width:'50%'}}>
											<div style={{width:'50%',float:'left'}} >Type :</div><div style={{float:'left',width:'50%'}}>{event.type}</div>
											<div style={{width:'50%',float:'left'}} >Name :</div><div style={{float:'left',width:'50%'}}>{event.originalSource.point_of_sale.name}</div>
											<div style={{width:'50%',float:'left'}} >Street Number :</div><div style={{float:'left',width:'50%'}}>{event.originalSource.point_of_sale.address.streetnumber}</div>
											<div style={{width:'50%',float:'left'}} >Zip :</div><div style={{float:'left',width:'50%'}}>{event.originalSource.point_of_sale.address.postal}</div>
											<div style={{width:'50%',float:'left'}} >City :</div><div style={{float:'left',width:'50%'}}>{event.originalSource.point_of_sale.address.city}</div>

										</div>
										
									</CardText>
								</Card>
							</div>
						)
					})
				}
					
				</div>
			</div>
		);
	}
});

module.exports = Daily;