import React, { Component } from "react";
import StatsDataService from "../services/stats.service";
import { withRouter } from '../common/with-router';


export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.getStats = this.getStats.bind(this);

    this.state = {
      currentStats: {
        number_of_contacts: null,
        number_of_phones:null,
        newest_contact_timestamp:"",
        oldest_contact_timestamp: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getStats();
  }

  getStats(){
  	StatsDataService.get()
      .then(response => {
        this.setState({
          currentStats: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  // refreshStats() {
  //   this.getStats();
  //   this.setState({
  //     currentTutorial: null,
  //     currentIndex: -1
  //   })
  //   .catch(e => {
  //       console.log(e);
  //     });
  // }

render(){
const { currentStats } = this.state;
    return (
        <div>
	      {currentStats ? (
          <div>
            <h5>Stats</h5>
            <div class="row">
                <div class="col-md-6 offset-md-6">
                    <div class="box-shadow">
                          <p>Number of Contacts: {currentStats.number_of_contacts}</p>
                          <p>Number of Phones: {currentStats.number_of_phones}</p>
                          <p>Newest Contact Timestamp: {currentStats.newest_contact_timestamp}</p>
                          <p>Oldest Contact Timestamp: {currentStats.oldest_contact_timestamp}</p>
                    </div>
                </div>
            </div>
          </div>
	):(
    <div>
      <br />
      <p>Click on Contact to See Phone Numbers</p>
    </div>)
    }
    	</div>
  )
  }
}
// export default withRouter(Stats);