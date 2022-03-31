import "./Donation.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import VideoPlayer from "react-video-js-player";
import foodwaste from "./Foodwaste.mp4";
import emailjs from "emailjs-com";
import image1 from "./food waste graph.JPG";
import image2 from "./food loss food waste.JPG";
import image3 from "./food waste recycle.jpg";

function App() {
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  // const [orders, setOrders] = useState([]);

  //fetching orders by connecting to backend
  // async function fetchOrders() {
  //   const { data } = await axios.get("/list-orders");
  //   setOrders(data);
  // }

  // to show orders list in frontend
  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  //to send Email to users after donating using EmailJs
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

  //
  function loadRazorpay() {
    const script = document.createElement("script"); //creating script element
    script.src = "https://checkout.razorpay.com/v1/checkout.js"; //source coming from razorpay
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?"); //show error if not loaded or any trouble in loading script
    };
    script.onload = async () => {
      try {
        setLoading(true); //loading is true then only ceates
        const result = await axios.post("/create-order", {
          //creating order which passes amount to api coming from frontend
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
            //when the payment is successful passes the data to api
            const result = await axios.post("/pay-order", {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert(result.data.msg); //alert to user that payment is successful
            // fetchOrders();                //to show new payments in the frontend
          },
          prefill: {
            //prefill section to set dummy details in razorpay window
            name: " name",
            email: "email@example.com",
            contact: "1111111111",
          },
          notes: {
            address: "example address",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options); //goes to new window of razorpay
        paymentObject.open(); // and opens
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script); // adding script after onload
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
                  <input
                    type="email"
                    placeholder="email"
                    required="true"
                  ></input>
                </div>
                <div className="form">Username</div>
                <input
                  type="text"
                  placeholder="user_name"
                  required="true"
                ></input>

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
                style={{ backgroundColor: "skyblue", color: "black" }}
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
            Did you know that about 40% of the food produced in India is wasted?
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
        </div>
      </div>
      <div images>
        <img className="images-statistics" src={image1} alt="">
          {/* <h2> How much food we waste</h2> */}
        </img>
        <img src={image2} alt=""></img>
        <img
          src={image3}
          alt=""
          style={{ width: "500px", height: "430px" }}
        ></img>
      </div>
      <li className="data-satistics">
        33% of food is wasting in the available food for us.Around one-third of
        the world’s food is lost to waste or 1.3 billion tons per year.
      </li>
      <li className="data-satistics">
        Saving even just a fourth of the total global food waste volume can feed
        all the world’s hungry.
      </li>
      <li className="data-satistics">
        Mostly the food waste is happening in storing the raw food.{" "}
      </li>
      <li className="data-satistics">
        As we can see in the graph 72% food loss is happening before it is
        reaching to anyone.
      </li>
      <li className="data-satistics">
        If we can follow the food waste cycle that is shown in the picture we
        can save food that feed atleast 70% of the people who are suffering lack
        of food.
      </li>
      <li className="data-satistics">
        Hence we encourage all people to not waste food and keep donating food.
      </li>

      <div>
        <VideoPlayer
          className="video"
          src={foodwaste}
          poster="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.e0yhGmjZ3CvTojnjpsfg6QHaE6%26pid%3DApi&f=1"
        ></VideoPlayer>
        <h3 className="videotag">
          A small Video to explain food wastage and its impacts
        </h3>
      </div>
    </div>
  );
}

export default App;
