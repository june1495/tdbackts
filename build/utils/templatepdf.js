"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const template = (product, category, ubication, price, user) => {
    const date = new Date().toISOString();
    const datereg = date.slice(0, 10);
    return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>template</title>
      <style>
        * {
            font-family: 'Courier New', Courier, monospace;
         margin: 0;
          padding: 0;
          scroll-behavior: smooth;
        }
  
        .fac_container {
            width:800px;
            height:500px;
          margin: auto;
          margin-top: 80px;
          border: 1px solid #7c4dff;
          box-shadow: 0px 10px 0px 1px rgba(124, 77, 255, 1);
          -webkit-box-shadow: 0px 10px 0px 1px rgba(124, 77, 255, 1);
          -moz-box-shadow: 0px 10px 0px 1px rgba(124, 77, 255, 1);
        }
        .fac_content {
          display: flex;
          flex-direction: column;
        }
        .fac_logo img {
          width: 180px;
          height: 90px;
          object-fit: cover;
          margin-left: 25px;
          margin-top: 25px;
        }
        .fac_logo_title {
          text-transform: uppercase;
          margin-top:15px;
          margin-left: 25px;
          font-weight: 700;
          font-size: 17px;
        }
        .fac_text_content {
          margin-top: 20px;
          margin-left: 25px;
          display: flex;
          flex-direction: row;
          width: 90%;
        }
  
        
        .fac_text_content_first {
          display: inline-block;
          width:35%;
          font-weight: 600;

        }
        .fac_text_content_second {
         display:inline-block;
          width: 65%;
          float:right;
          font-size:15px;
          font-weight: 200;
          color: #444;
        }
        .fac_text_content_second p {
            margin-top:0.8px;
        }
        /* footer */
  
        .fac_footer {
          margin-left: 25px;
          margin-top: 40px;
          color: #444;
          font-weight: 200;
          font-style: oblique;
        }
        .fac_footer p {
            margin-top:5px;
        }
      </style>
    </head>
    <body>
      <div class="fac_container">
        <div class="fac_content">
          <div class="fac_logo">
            <img src="https://i.ibb.co/7GQkH93/ftb-logo.png" alt="ftb-logo" />
            <div class="fac_logo_title">
              Proof of transfer for order 20220615GBP0002
            </div>
          </div>
          <div class="fac_text_content">
            <div class="fac_text_content_first">
              <p>Remittance</p>
              <p>Remittance date</p>
              <p>Expected payment date</p>
              <p>Ordered amount</p>
              <p>Beneficiary</p>
              <p>Beneficiary address</p>
              <p>Beneficiary bank name</p>
              <p>Beneficiary bank BIC</p>
              <p>Beneficiary account</p>
            </div>
            <div class="fac_text_content_second">
              <p>${product}</p>
              <p>${datereg}</p>
              <p>2022-06-17</p>
              <p>${price}</p>
              <p>${category}</p>
              <p>Turnoaks Business Park Chesterfield S40 2WB, GB</p>
              <p>${ubication}</p>
              <p>${user}</p>
              <p>GBXXXXXXXXXXXXXXXX8221</p>
            </div>
          </div>
          <div class="fac_footer">
            <p>Please contact ftb.pe if you have any doubts at</p>
            <p>Peru: +51 922 085 507</p>
            <p>Email: operaciones@ftb.pe</p>
            <p>Copyright © 2022 FTB HUB S.A.C.</p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
};
exports.default = template;
