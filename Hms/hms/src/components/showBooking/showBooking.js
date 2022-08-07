import React, { Component } from 'react';
import './showBooking.scss'
import Menu from '../menu/menu';
import { withRouter } from '../../withRouter';
import axios from 'axios';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as placeOrderActions from "../../store/placeOrder/actions";
export class showBooking extends Component {
  constructor(props) {
    super(props);
    let cid = localStorage.getItem("cid");
    this.state = {
      customerId: cid,
      roomId: '',
      vendorId: '',
      walSource: '',
      qty: '',
      comments: '',
      wallets: []
    };
  }
  changeCustomerId(event) {
    this.setState({
      customerId: event.target.value
    });
  }

  changeVendorId(event) {
    this.setState({
      vendorId: event.target.value
    });
  }

  changeRoomId(event) {
    this.setState({
      roomId: event.target.value
    });
  }

  changeWalSource(event) {
    this.setState({
      walSource: event.target.value
    });
  }

  changeQty(event) {
    this.setState({
      qty: event.target.value
    });
  }

  changeComments(event) {
    this.setState({
      comments: event.target.value
    });
  }

  placeOrd = () => {
    axios.post('http://localhost:1111/showbooking',
      {
        cusId: this.state.customerId, venId: this.state.vendorId,
        roomId: this.state.roomId, walSource: this.state.walSource,
        bookingQuantity: this.state.qty, bookingComments: this.state.comments
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.state.result = res.data
        alert(res.data)
      })
  }

  componentDidMount() {
    axios.get('http://localhost:1111/getallwalletsource/' + this.state.customerId)
      .then(response => {
        this.setState({
          wallets: response.data
        })
      })
  }


  render() {
    const { wallets } = this.state;

    let walletList = wallets.length > 0
      && wallets.map((item) => {
        return (
          <option value={item}>{item}</option>
        )
      }, this);
    return <div className="component-show-booking">
      <Menu />
      <form>
        <div class="container">
          <center><h1>Book Room</h1></center>

          <hr />

          <label><b>Customer Id</b></label>
          <input type="text" id="customerId" value={this.state.customerId} onChange={this.changeCustomerId.bind(this)}></input>

          <label><b>Room Id</b></label>
          <input type="text" id="roomId" value={this.state.roomId} onChange={this.changeRoomId.bind(this)}></input>

          <label><b>Admin Id</b></label>
          <input type="text" id="vendorId" value={this.state.vendorId} onChange={this.changeVendorId.bind(this)}></input>


          <label><b>Wallet </b></label>
          <select onChange={this.changeWalSource.bind(this)}>
            {walletList}
          </select>
          <br></br>
          <br></br>
          <label><b>Number Of Rooms</b></label>
          <input type="text" id="qty" value={this.state.qty} onChange={this.changeQty.bind(this)}></input>

          <label><b>Comments</b></label>
          <input type="text" id="comments" value={this.state.comments} onChange={this.changeComments.bind(this)}></input>

          <hr />
          <input type="button" value="PlaceOrder" onClick={this.placeOrd} id="btn"></input>

        </div>
      </form>
    </div>;
  }
}
export default withRouter(showBooking);
