$(function () {
  // ****************************************
  // Google oAuth
  // ****************************************

  // coinz.init({
  //   google: process.env.Client_ID
  // },{redirect_uri:'http://localhost:7960/home/'});

  // ****************************************
  // format date in html
  //***************************************** */
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd; //   dd = "0" + (dd + 3); adding 3 days to current date.
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);
  $("#date-1").attr("value", today);
  $("#date").attr("min", today);

  // *******************************************
  // Global Variables
  // **************************************************** */
  var hold = [];


  // ******************************************
  // Account Number Format
  //******************************************************* */
  let prefix; // first three digits of bank code
  let internalCode; // six digits of account numbers
  let checkDigit; // one digit from modulus check
  let accountNumber; // prefix plus internalCode plus checkDigit

  // ******************************************
  // 
  //******************************************************* */

  
  // ******************************************
  // Show account balance on sender phone number field change
  //******************************************************* */
    // review this only one of the four below may be needed
  let setFocus = () => {    
    $("#phone-2").focus();    
  };

  setFocus()
  

  $("#balanceBtn").on("click", (e) => {
    e.preventDefault();
    $("#balanceBtn").css({"color": "green"});
    populate();
    toggle();
    
  });
  
  // let btnValue = [];
  let toggle = () => {
    if ($("#balance").is(":hidden")) {
    
      $("#balance").show();

    } else if ($("#balance").is(":visible")) {
      
      $("#balance").hide();
    }
  }

  // $("#date").on("change", (e) => {
  //   e.preventDefault();
  //   populate();
  // });

  // $("#phone-2").on("focus", (e) => {
  //   e.preventDefault();
  //   populate();
  // });



    // *********************************************************
  // Clicking transfer button to initiate transfer
  //********************************************************** */

  $("#transfer").on("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    let accept = confirm(`Are you sure you want to make this transfer`);
    // let decline = alert(`Transaction Cancelled`)
    !accept ? alert(`Transaction Cancelled`) : transferFund();
  });


  // **************************************
  // Adding additional transfer recipients
  //*************************************** */
  let buildFormClickCount = [];
  let clickCount = 0;
  $(".glyph").on("click", (e) => {
    e.preventDefault();
    clickCount += 1;
    console.log(`click count = ${clickCount}`);
    buildFormClickCount.push(clickCount);
    console.log(buildFormClickCount);
    buildForm();
  });
  //********************************************************** */

  // *********************************************************
  // Clicking transaction button to view transaction
  //********************************************************** */

  $("#transactionsSummary").on("click", (e) => {
    
    $("#transactionInfo").empty();
    // $("#summaryInfo").empty();
    e.preventDefault();
    console.log("clicked");

    $('div.row.content.info').css('display', 'flex')
    
    getTransactionSummary();
    
  });


  // ***********************************************
  // Clicking cancel button to reset form
  //************************************************ */
  let reload = () => {
    $("#date").val("");
    $("#phone-2").val("");
    $("#amt").val("");
    reload = location.reload();
  };



  $("#cancel").on("click", () => {
    reload()
  });
  // ********************************************************
  // function to transfer funds from one account to another
  //********************************************************* */

  let transferFund = () => {
    let transferDate = $("#date").val().trim();
    let transferAmount = $("#amt").val().trim();
    console.log(transferAmount);
    let phoneNumber1 = $("#phone-1").val().trim();
    let phoneNumber2 = $("#phone-2").val().trim();
    let queryUrl = "api/users/user/" + phoneNumber1;
    let queryUrl2 = "api/users/user/" + phoneNumber2;
    let queryUrl3 = "transactions/api/transactions/"
    let phone1AcctBal = [],
      phone2AcctBal = [],
      newUser1Bal = [],
      newUser2Bal = [];
    
    if (!phoneNumber2 || phoneNumber2 === "") {
      alert("Please enter recipient phone number");
      $("#phone-2").focus();
      return;
    } else {
    
    
    
    
     // Call to verify info of recipient
    $.ajax({
      url: queryUrl2,
      method: "GET",
    }).then((response) => {
      console.log(response);
      if (!response || response == null) {
        console.log({error: "Bad request"})
        alert("invalid Recipient Phone Number");
        return;
      }

    });   

    // Call to get info of user/sender
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then((response) => {
      console.log(response);
      phone1AcctBal.push(response.accountBalance);
      console.log(phone1AcctBal);
      $("#balance").text(phone1AcctBal[0]);
      
      let senderInfo = `${response.firstName} ${response.lastName} ${response.phoneNumber}`;
      // Transfer calculation
      // Phone-1
      if (transferDate === "") {
        alert(`Please select a transfer date!`);
        return;
      } else if (transferDate !== today) {
        console.log(transferDate, today);
        confirm(
          `Transfer scheduled for later date, and will be executed on ${transferDate}`
        );
        alert(
          `Future transfer capabilities will be enabled in the near "Future"!`
        );
        // add ajax and database to store pending transactions
        return;
      } else if (response.accountBalance < parseFloat(transferAmount)) {
        alert(`Insufficient funds!`);
        return;
      } else if (phoneNumber1 === phoneNumber2) {
        alert(`Unable to transfer from and into same account!`);
        return;
      } else if (phoneNumber1 === " " || phoneNumber2 === " ") {
        alert(`Please enter a valid phone Number!`);
        return;
      } else {
        let accept = confirm(
          `Are you sure you want to transfer ${transferAmount} to ${phoneNumber2} transaction may not be easily reversed`
        );
        if (!accept) {
          return alert(`Transaction cancelled`);
        } else {
          let transfer_1 = phone1AcctBal[0] - parseFloat(transferAmount);
          console.log(transfer_1);
          newUser1Bal.push(transfer_1);
          console.log(newUser1Bal);
          let change = { accountBalance: newUser1Bal[0] };
          // Call to Update Sender Account Balance
          $.ajax({
            url: "api/users/user/edit/" + phoneNumber1,
            method: "PATCH",
            contentType: "application/json",
            data: JSON.stringify(change),
          }).then((complete) => {
            console.log(complete)
            $("#balance").text(newUser1Bal[0]);
            $("#transactionDate").append("<br>" + transferDate);
            console.log(transferDate);
            // $("#transactionInfo").append(
            //   "<br>" + `Transfer to ${response.firstName} ${response.lastName}`
            // );
            // $("#transactionAmt").append("<br>" + transferAmount);

            // Call to get info of recipient
            $.ajax({
              url: queryUrl2,
              method: "GET",
              success: () => console.log("Valid Phone Number"),
              error: () => alert("Invalid Recipient")
            }).then((response) => {
              console.log(response);
              phone2AcctBal.push(parseFloat(response.accountBalance));
              console.log(phone2AcctBal);

              // verify this *************
              if (response.phoneNumber === NaN || response.phoneNumber === null) {  // changed from response.accountBalance to response.phoneNumber
                console.log("error");
                alert("invalid recipient Phone Number");
                return;
              };
              // *****************************************************

              // Transfer calculation 2
              // Phone-2
              console.log({phone2AcctBal: phone2AcctBal[0]})
              let transfer_2 = phone2AcctBal[0] + parseFloat(transferAmount);
              console.log(transfer_2);
              newUser2Bal.push(transfer_2);
              console.log(newUser2Bal);
              let change = { accountBalance: newUser2Bal[0] };
              // Call to Update Recipient Account Balance
              $.ajax({
                url: "api/users/user/edit/" + phoneNumber2,
                method: "PATCH",
                contentType: "application/json",
                data: JSON.stringify(change),
              }).then((res) => {
                console.log(res);
                console.log(response);
                $("#transactionInfo")
                  .append("<br>" + `Transfer to ${response.firstName} ${response.lastName} ${response.phoneNumber}`);
                $("#transactionAmt").append("<br>" + transferAmount);
                
                // Call to store transaction
                let transactionInfo = `Transfer to ${response.firstName} ${response.lastName} ${response.phoneNumber} ${transferAmount} on ${transferDate}.`;
                let transactionInfoOther = `Transfer from ${senderInfo} to ${response.firstName} ${response.lastName} ${response.phoneNumber} ${transferAmount} on ${transferDate}.`
                let transactionData = {
                  transactionDate: transferDate,
                  senderPhoneNumber: phoneNumber1,
                  transactionInfo: transactionInfo,
                  transactionInfoOther: transactionInfoOther,
                  recipientFirstName: response.firstName,
                  recipientLastName: response.lastName,
                  transactionAmount: transferAmount,
                  recipientPhoneNumber: phoneNumber2,
                  accountBalance: newUser1Bal[0],
                  recipientAccountBalance: newUser2Bal[0]

                };
                console.log(transactionData);
                // console.log({ acctbal: transactionData.accountBalance, recAcctBal: transactionData.recipientAccountBalance })
                
                $.ajax({
                  url: queryUrl3,
                  method: "POST",
                  contentType: "application/json",
                  data: JSON.stringify(transactionData),
                  success: (data) => console.log(data),
                  error: (err) => console.log(err)
                }).then((res) => {
                  console.log(res)
                 
                })
              })
            });
            
          });
        }
      }
    });
    }
    //  $('div#transactInfoHead').css('display', 'flex')
    //  $('div#summaryInfo').css('display', 'flex')
    $('div.row.content.info2').css('display', 'flex')
    
  };
  //*********************************************************
  // function to update balance
  //********************************************************* */
  let updateBalance = () => {
    // // Call to Update Sender Account Balance
    // $.ajax({
    //     url: queryUrl,
    //     method: "PATCH",
    //     data: data
    // }).then(response => {
    //     console.log(response);
    // });
    // // Call to Update Recipient Account Balance
    // $.ajax({
    //     url: queryUrl2,
    //     method: "PATCH",
    //     data: newUser2Bal
    // }).then(response => {
    //     console.log(response);
    // });
  };


  let controlBalance = () => {
    let queryUrl = "/api/users/controlbalance";
    let queryUrl2 = "/api/user/edit/control/type-3-controller";
    let balanceHolder = [];
    
    // Call to get Total Balance
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(response => {
      console.log(response);
      console.log(response[0].totalBalance)
      balanceHolder.push(response[0].totalBalance)
      console.log(balanceHolder)

  // Call to Update Control Account Balance with Total Balance
      // let data = { "accountBalance":  JSON.stringify(response[0].totalBalance)};
      // let data = { "accountBalance":  response[0].totalBalance};
      // let data = response[0].totalBalance;
      // let data = balanceHolder[0];
      let data = { "accountBalance":  JSON.parse(response[0].totalBalance)};
    console.log(data);
    $.ajax({
        url: queryUrl2,
        method: "PATCH",
        // contentType: "application/json", // Throws unexpected token error
        data: data
    }).then(response => {
        console.log(response);
    });

    });
};
  controlBalance() // used for testing purposes


  //*********************************************************
  // functions to get data
  //********************************************************* */
  
  let populate = () => {
    let queryUrl = "/api/users/user/" + $("#phone-1").val().trim();
    // Call to get info of user/sender
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then((response) => {
      console.log(response);
      let viewableAccountBalance = response.accountBalance
      $("#balance").text(new Intl.NumberFormat().format(parseFloat(viewableAccountBalance).toFixed(2)));
      // btnValue.push(viewableAccountBalance)
      
    });
  };

  let getTransactionSummary = () => {
    let queryUrl = "/api/users/transactions/" + $("#phone-1").val().trim();
    let queryUrl2 = "/api/users/incoming_transactions/" + $("#phone-1").val().trim();
    let see = [];
    // Call to get transaction info (outgoing)
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then((response) => {
      console.log(response);
 

      // Call to get transaction info (incoming)
      $.ajax({
        url: queryUrl2,
        method: "GET",
      }).then((res) => {
        console.log(res)

        res.slice().reverse().forEach(e => { // looping in reverse
      // res.forEach(e => {                // looping normally
          console.log(e.accountBalance);
          console.log(e.recipientAccountBalance);
        see.push(e);
        
        let preBalance = (parseFloat(e.recipientAccountBalance) - parseFloat(e.transactionAmount))

          $("#summaryInfo").append(
        // $("#summaryInfo").prepend(
          '<div class="row line">' +
        '<div class="col-md-2 content-group"><br>' +
        '<label class="lables" for="transfer date">*Transfer Date</label><br>' +
        
        e.transactionDate +
        
        "</div>" +
        '<div class="col-md-3 content-group">' +
        "<br>" +
        '<label class="lables" for="recipient info">*Recipient</label><br>' +
        
        `Transfer from ${e.senderPhoneNumber}` +
        
        "<br>" +
        "</div>" +
        '<div class="col-md-3 content-group">' +
        "<br>" +
        '<label class="lables" for="Initial Account Balance">*Initial Account Balance</label><br>' +
        
        `${new Intl.NumberFormat().format(parseFloat(preBalance).toFixed(2))}` +
        
        "<br>" +
        "</div>" +
        '<div class="col-md-2 content-group">' +
        "<br>" +
        '<label class="lables" for=" Account Balance">*Account Balance</label><br>' +
        
          `${new Intl.NumberFormat().format(parseFloat(e.recipientAccountBalance).toFixed(2))}` +
          
        "<br>" +
        "</div>" +
        '<div class="col-md-2 content-group elegant">' +
        "<br>" +
        '<label class="lables" for="Sender Account Number">*Transfer Amount</label><br>' +
        
        ` +${ new Intl.NumberFormat().format(parseFloat(e.transactionAmount).toFixed(2))}` +
        
        "<br>" +
        "</div>" +
        "</div>" +
        "</div>"
        )

           });
      



      

      
      response.slice().reverse().forEach(element => { // looping in reverse
      // response.forEach(element => {                // looping normally
        console.log(element.transactionInfo);
        see.push(element);
        
        let initialBalance = (parseFloat(element.accountBalance) + parseFloat(element.transactionAmount))

        // $("#transactInfo").append("<br>" + element.transactionInfo + "<br>");
        $("#summaryInfo").append(
        // $("#summaryInfo").prepend(
          '<div class="row line">' +
        '<div class="col-md-2 content-group"><br>' +
        '<label class="lables" for="transfer date">*Transfer Date</label><br>' +
        
        element.transactionDate +
        
        "</div>" +
        '<div class="col-md-3 content-group">' +
        "<br>" +
        '<label class="lables" for="recipient info">*Recipient</label><br>' +
        
        `Transfer to ${element.recipientPhoneNumber}` +
        
        "<br>" +
        "</div>" +
        '<div class="col-md-3 content-group">' +
        "<br>" +
        '<label class="lables" for="Initial Account Balance">*Initial Account Balance</label><br>' +
        
        `${new Intl.NumberFormat().format(parseFloat(initialBalance).toFixed(2))}` +
        
        "<br>" +
        "</div>" +
        '<div class="col-md-2 content-group">' +
        "<br>" +
        '<label class="lables" for=" Account Balance">*Account Balance</label><br>' +
        
          `${new Intl.NumberFormat().format(parseFloat(element.accountBalance).toFixed(2))}` +
          
        "<br>" +
        "</div>" +
        '<div class="col-md-2 content-group elegant2">' +
        "<br>" +
        '<label class="lables" for="Sender Account Number">*Transfer Amount</label><br>' +
        
        `-${new Intl.NumberFormat().format(parseFloat(element.transactionAmount).toFixed(2))}` +
        
        "<br>" +
        "</div>" +
        "</div>" +
        "</div>"
        )

      });
        console.log(see)

      // $(window).ready(() => {
        
        // $("#transactionSummary")
        //   .append("<br>" + `${viewableTransaction}`);
        
        // $("#transactInfo").append("<br>" + `${viewableTransaction}`);
        // $("#transactInfo").append("<br>" + viewableTransact);
      // });
        see.sort((a, b) => a.transactionDate - b.transactionDate);
        console.log(see);
        
        
        });
    });
  };


  // ********************************************************
  // function to build form fields for additional transfers
  //********************************************************* */
  let buildForm = () => {
    let tagIncrease;
    // let addId = 0;
    // let amountToTransfer = [];
    // // tagIncrease = addId += 1;
    // console.log(tagIncrease);
    // console.log(buildFormClickCount)
    buildFormClickCount.forEach((x) => {
      x;
      tagIncrease = x;
    });
    $("#content").append(
      '<div class="row line">' +
        '<div class="col-md-3 content-group"><br>' +
        '<label class="lables" for="Transfer Date">*Transfer Date</label><br>' +
        "<input id=date-" +
        tagIncrease +
        'type="date" name="transfer date" value="yyyy-MM-dd" min="2019-03-26" placeholder="">' +
        "</div>" +
        '<div class="col-md-2 content-group hiddenContent">' +
        "<br>" +
        '<label class="lables" for="Sender Account Number">*Sender Account Number</label><br>' +
        "<input id=phone-1-" +
        tagIncrease +
        ' type="text" class="inputbox space" placeholder="" name="Sender Account Number">' +
        "<br>" +
        "</div>" +
        '<div class="col-md-4 content-group">' +
        "<br>" +
        '<label class="lables" for="Sender Account Number">*Recipient Account</label><br>' +
        "<input id=phone-2-" +
        tagIncrease +
        ' type="text" class="inputbox" placeholder="" name="Recipient Account Number">' +
        "<br>" +
        "</div>" +
        '<div class="col-md-3 content-group">' +
        "<br>" +
        '<label class="lables" for="Sender Account Number">*Transfer Amount</label><br>' +
        '<input type="number" class="inputbox" id=amt-' +
        tagIncrease +
        ' placeholder="₦" name="Transfer Amount">' +
        "<br>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
  };


  //************************************************************************** */
  // Replenish
  //********************************************************************************* */

  let fillFields = () => {
    let senderBankName = $("#senderBankName").val(),
      phoneNumber1 = $("#phone-1").val(),
      phoneNumber2 = $("#phone-2").val(),
      senderBankAccountNumber = $("#senderExternalBankAccountNumber").val(),
      recipientBankName,
      recipientBankAccountNumber,
      transferAmount,
      queryUrl = "/api/users/user/" + phoneNumber1,
      queryUrl2 = "/api/users/user/" + phoneNumber2;
    
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then((response) => {
      console.log(response);
      senderBankName = $("#senderBankName").val(response.bank_name.toUpperCase());
      senderBankAccountNumber = $("#senderExternalBankAccountNumber").val(response.bank_account_number);
    })
    
    
    
  }

  fillFields();





  // // USSD payment setup

  function log(message) {
        $("#response").text(message);
        $('pre span').each( (i, block) => {
            hljs.highlightBlock(block);
        });
    }


  // //   $("#sendSms").click(() => {
  // //       let to = $("#phone").val();
  // //       if ( !to) {
  // //           log(JSON.stringify({ error: "Enter a phone number" }, null, 2));
  // //           return;
  // //       }

  // //       log("Sending SMS...");

  // //       $.ajax({
  // //           method: "POST",
  // //           url: "/sms/send",
  // //           data: {
  // //               to,
  // //               message: "Im a lumberjack, I sleep all day and I code all night"
  // //           },
  // //       })
  // //       .done(function (msg) {
  // //           console.log("message : ", msg);
  // //           log(JSON.stringify(msg, null, 2));
  // //       })
  // //       .fail(function (jqXHR, textStatus) {
  // //           console.log("jqXHR", jqXHR);
  // //           log(textStatus);
  // //       });

  // //   });

  // //   $("#airtime").click(function () {
  // //       const to = $("#phone").val();
  // //       const inputAmount = $("#amount").val();
  // //       if (!to) {
  // //           log(JSON.stringify({ error: "Enter a phone number" }, null, 2));
  // //           return;
  // //       }

  // //       if (!inputAmount) {
  // //           log(JSON.stringify({ error: "Enter an amount (with currency) e,g, KES 334" }, null, 2));
  // //           return;
  // //       }

  // //       let currencyCode, amount;
  // //       [currencyCode, amount] = inputAmount.split(" ");

  // //       log("Sending airtime.....");

  // //       $.ajax({
  // //           method: "POST",
  // //           url: "/airtime/send",
  // //           data: {
  // //               to,
  // //               currencyCode,
  // //               amount
  // //           }
  // //       })
  // //       .done(function (msg) {
  // //           log(JSON.stringify(msg, null, 2));
  // //       })
  // //       .fail(function (jqXHR, textStatus) {
  // //           log(textStatus);
  // //       });

  // //   });


// send payment

  $("#replenish").click(() => {
      console.log("clicked")
        const phoneNumber = $("#phone").val();
        const inputAmount = $("#externalTransferAmt").val();
        const productName = "Coinz";
        const accountToCharge = $("#externalBankAccountNumber").val();
        const recipientBankAccount = $("#recipientBankAccount").val();
        // let currencyCode;

        if (!phoneNumber) {
            log(JSON.stringify({ error: "Enter a phone number" }, null, 2));
            return;
        }

        if (!inputAmount) {
            log(JSON.stringify({ error: "Enter an amount (with currency) e,g, KES 334" }, null, 2));
            return;
        }
    
        if (!accountToCharge) {
            log(JSON.stringify({ error: "Enter a bank account number" }, null, 2));
            return;
        }

        let currencyCode, amount;
        [currencyCode, amount] = inputAmount.split(" ");

        log("Sending...");

        $.ajax({
            method: "POST",
            url: "/payments/mobile-checkout",
            data: {
                phoneNumber,
                currencyCode,
                amount,
                productName,
                accountToCharge
            }
        })
        .done(function (msg) {
            log(JSON.stringify(msg, null, 2));
        })
        .fail(function (jqXHR, textStatus) {
            log(textStatus);
        });

    });

  //   $("#mobileB2C").click(function () {
  //       const phoneNumber = $("#phone").val();
  //       const inputAmount = $("#mobileB2CAmount").val();
  //       if (!phoneNumber) {
  //           log(JSON.stringify({ error: "Enter a phone number" }, null, 2));
  //           return;
  //       }

  //       if (!inputAmount) {
  //           log(JSON.stringify({ error: "Enter an amount (with currency) e,g, KES 334" }, null, 2));
  //           return;
  //       }

  //       let currencyCode, amount;
  //       [currencyCode, amount] = inputAmount.split(" ");

  //       log("Sending money...");

  //       $.ajax({
  //           method: "POST",
  //           url: "/payments/mobile-b2c",
  //           data: {
  //               phoneNumber,
  //               currencyCode,
  //               amount
  //           }
  //       })
  //       .done(function (msg) {
  //           log(JSON.stringify(msg, null, 2));
  //       })
  //       .fail(function (jqXHR, textStatus) {
  //           log(textStatus);
  //       });

  //   });


});

// ******************************************
// Supplimental code to be added for future transfer
//******************************************************* */

// if (transferDate !== Date.today()) {
//   alert(`Transfer scheduled for later date, and will be executed on ${transferDate}`);
//   // add ajax and database to store pending transactions
//   return;
// }

// // add daily ajax calls to pending transfer database
// if (transferDate === Date.today() && transferAmmount <= accountBalance) {
//   // get and process transaction or transfer sender, recipient, and ammount information
//   return;
// }
