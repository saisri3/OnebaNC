let status = {
  1: "Pending",
  2: "Confirmed",
  3: "Expired",
  4: "Reject",
  5: "Cancel",
};

let type = {
  1: "Pay",
  2: "Collect",
};

let direction = {
  1: "Sent",
  2: "received",
};

var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

const output = document.getElementById("output");

const url =
  "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

fetch(url)
  .then((response) => response.text())
  .then((data) => {
    const info = data;
    console.log(typeof info);
    console.log(info);
    const obj = JSON.parse(info);
    console.log(obj.transactions.map((result) => console.log(result)));

    output.innerHTML = "";

    const htmlstring =
      '<img src="https://img.icons8.com/ios-filled/50/000000/circled-j.png" style="float: left;"/><h2>John Doe</h2><h3>+91 9876543210</h3><hr>';
    let outputString = document.createElement("div");
    outputString.innerHTML = htmlstring;
    output.appendChild(outputString);
    prev_date = "Nothing";
    obj.transactions.map((result) => {
      // console.log(result.direction);
      arr_prev = prev_date.split("T");
      arr_curr = result.startDate.split("T");
      //console.log("Date "+arr_prev[0]+ "Current "+arr_curr[0])
      if (arr_prev[0] != arr_curr[0]) {
        d_arr = arr_curr[0].split("-");
        date_string =
          d_arr[2] + " " + month[parseInt(d_arr[1])] + " " + d_arr[0];
        console.log(d_arr);
        const htmlstring = `<table width="100%">
  <tr>
    <td><hr /></td>
    <td style="width:1px; padding: 0 10px; white-space: nowrap;">${date_string}</td>
    <td><hr /></td>
  </tr>
</table>`;
        let outputString = document.createElement("div");
        outputString.innerHTML = htmlstring;
        output.appendChild(outputString);
      }

      if (result.direction == 1 && result.type == 1) {
        const htmlString = ` <div class="row1">
        <div class="payment"> ₹ ${result.amount}</div>
        <div class="type"> ✅  You Paid</div>
      </div>
      <div class="row2">
        <div class="transaction-id"> Transaction Id : ${result.id}</div>

        <div class="more-info">
         <img src="https://img.icons8.com/cotton/64/000000/circled-chevron-right--v1.png"/>
        </div>
      </div></div>
       <div class="date-right">${result.endDate}</div>
      `;
        let outputString = document.createElement("div");
        outputString.classList.add("right");
        outputString.innerHTML = htmlString;
        output.appendChild(outputString);
      }

      //direction 1 type 2

      if (result.direction == 1 && result.type == 2) {
        const htmlString = ` <div class="row1">
        
        <div class="payment"> ₹ ${result.amount}</div>
        <div class="type">📎 You Requested</div>
      </div>
      <div class="row2">
        <div class="transaction-id"><button class="button">Cancel</button></div>

        <div class="more-info">
          <img class="image" src="https://img.icons8.com/cotton/64/000000/circled-chevron-right--v1.png"/>
        </div>
      </div>
      <div class="date-right">${result.startDate}</div>            `;
        let outputString = document.createElement("div");
        outputString.classList.add("right");
        outputString.innerHTML = htmlString;
        output.appendChild(outputString);
      }

      //left side of
      if (result.direction == 2 && result.type == 1) {
        const htmlString = ` <div class="row1">
        
        <div class="payment"> ₹ ${result.amount}</div>
        <div class="type">✅ You Recieved</div>
      </div>
      <div class="row2">
        <div class="transaction-id">Transaction Id : ${result.id}</div>

        <div class="more-info">
          <img src="https://img.icons8.com/cotton/64/000000/circled-chevron-right--v1.png"/>
        </div>
      </div> <div class="date-left">${result.startDate}</div>
                            `;
        let outputString = document.createElement("div");
        outputString.classList.add("left");
        outputString.innerHTML = htmlString;
        output.appendChild(outputString);
      }

      if (result.direction == 2 && result.type == 2) {
        const htmlString = ` <div class="row1">
       
        <div class="payment"> ₹ ${result.amount}</div>
        <div class="type">📎 Request Recieved</div>
      </div>
      <div class="row2">
        <div class="transaction-id"><button class="pay">Pay</button> <button class="button">Decline</button></div>

        <div class="more-info">
         <img src="https://img.icons8.com/cotton/64/000000/circled-chevron-right--v1.png"/>
        </div>
        
      </div>
      <div class="date-left">${result.startDate}</div>`;
        let outputString = document.createElement("div");
        outputString.classList.add("left");
        outputString.innerHTML = htmlString;
        output.appendChild(outputString);
      }
      prev_date = result.startDate;
    });
    //prev_date=result.startDate
  })
  .catch((err) => console.log(err));

console.log([1]);
