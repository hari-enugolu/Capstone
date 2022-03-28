import "./Donation.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import VideoPlayer from "react-video-js-player";
import foodwaste from "./Foodwaste.mp4";
import emailjs from "emailjs-com";

function App() {
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const { data } = await axios.get("/list-orders");
    setOrders(data);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  function sendEmail(e) {
    e.preventDefault();
    return emailjs
      .sendform(
        "service_8n9ucoo",
        "template_1xrg8ge",
        e.target,
        "user_YPTEpTAF2CkKRxEjG"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loadRazorpay() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post("/create-order", {
          amount: orderAmount + "00",
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get("/get-razorpay-key");

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: "example name",
          description: "example transaction",
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post("/pay-order", {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert(result.data.msg);
            fetchOrders();
          },
          prefill: {
            name: "example name",
            email: "email@example.com",
            contact: "111111",
          },
          notes: {
            address: "example address",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  return (
    <div className="Header">
      <Header />
      <hr />
      <div className="image">
        <div className="App">
          <div>
            <h1 className="donate-header">Donate to feed people in hunger</h1>
          </div>
          <div>
            <div id="form-view" className="donate-heading">
              <form className="form">
                <div>
                  <div className="form">Email</div>
                  <input type="email" placeholder="email"></input>
                </div>
                <div className="form">Username</div>
                <input type="text" placeholder="user_name"></input>

                <div className="form">
                  Phone
                  <span>(optional)</span>
                </div>
                <input type="number" placeholder="number"></input>
                <div className="form">Amount</div>
                <div>
                  <input
                    placeholder="INR"
                    type="number"
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(e.target.value)}
                  ></input>
                </div>
              </form>

              <button
                style={{ color: "green" }}
                disabled={loading}
                onClick={() => {
                  loadRazorpay();
                  sendEmail();
                }}
              >
                Donate
              </button>
              {loading && <div>Loading...</div>}
            </div>
          </div>
        </div>
        <div className="donation-details">
          <h2 className="details-screen" style={{ color: "green" }}>
            Donate For Cause
          </h2>
          <h4 className="food-wate">
            Did you know that about 40 % of the food produced in India is
            wasted?
          </h4>
          <h4 className="food-waste-money">
            Despite adequate food production, the UN has reported that about 190
            million Indians remain undernourished. It is further estimated that
            the value of food wastage in India is around ₹92,000 crores per
            annum.
          </h4>

          <h4 className="food-waste-steps">
            The world recognises that no truly sustainable and developed country
            can exist without tackling the issue of food waste, and while the
            challenge in front of us may be monumental, some steps need to be
            taken sooner than others.
          </h4>
          <h4 className="food-waste-steps">
            Reducing and eventually eliminating food waste needs to be
            incentivised and encouraged across key sources such as restaurants,
            banquets, weddings, canteens, and retail outlets. Partnerships
            should be formed with all stakeholders to identify how to do this.
            Eventually, each city should have a plan in place to tackle food
            waste.
          </h4>
          <h4 className="food-waste-steps">
            Everyone must join hands if we are to work towards a truly
            sustainable India that does not have millions undernourished despite
            having adequate food production.
          </h4>
          <VideoPlayer className="video" src={foodwaste}></VideoPlayer>
        </div>
      </div>
    </div>
  );
}

export default App;
