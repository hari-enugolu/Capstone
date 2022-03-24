import React from "react";
import emailjs from "emailjs-com";

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
<form className="form">
  <div>
    <div className="form">Email</div>
    <input type="email" name="email"></input>
  </div>
  <div className="form">Username</div>
  <input type="text" name="user_name"></input>

  <div className="form">
    Phone
    <span>(optional)</span>
  </div>
  <input type="number" name="number"></input>
  <div className="form">Amount</div>
  <div>
    <button onClick={sendEmail}>send</button>
  </div>
</form>;

export default emailjs;
