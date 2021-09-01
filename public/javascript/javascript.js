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
  // Signup
  //******************************************************* */

  // COMMENTED CODE NO LONGER REQUIRED. ACHIEVED USING EJS
  // FOR SIGNUP AND SIGN IN AND PASSPORT FOR VALIDATION
  // FROM LINES 51 THROUGH 416

  // $("#signUp").on("click", (e) => {
  //   e.preventDefault();
  //   console.log("clicked");
  //       let queryUrl = "/api/users";
  //       // let queryUrl = "/api/users";
  //       let title = $("#title").val().trim().toLowerCase();
  //       userName = $("#username").val().trim().toLowerCase();      
  //       firstName = $("#firstName").val().trim().toLowerCase();
  //       lastName = $("#lastName").val().trim().toLowerCase();
  //       address = $("#address").val().trim().toLowerCase();
  //       countryCode = $("#cCode").val().trim().toLowerCase();        
  //       phoneNumber = $("#phoneNumber").val().trim().toLowerCase();
  //       email = $("#email").val().trim().toLowerCase();      
  //       bank_name = $("#bankName").val().trim().toLowerCase();
  //       bank_account_number = $("#ban").val().trim().toLowerCase();
  //       bvn = $("#bvn").val().trim().toLowerCase();    
  //       system_account_number = $("#san").val().trim().toLowerCase();
  //       password = $("#password").val().trim();
        
  //   let data = {
  //               title: title,
  //               userName: userName,
  //               firstName: firstName,
  //               lastName: lastName,
  //               address: address,
  //               countryCode: countryCode,
  //               phoneNumber: phoneNumber,
  //               email: email,
  //               bank_name: bank_name,
  //               bank_account_number: bank_account_number,
  //               bvn: bvn,
  //               system_account_number: system_account_number,
  //               password: password,
  //       };
  //           console.log(data);
  //   // Call to store user info
  //   $.ajax({
  //     url: queryUrl,
  //     method: "POST",
  //     data: data,
  //     success: (res) => {
  //       console.log(res);
  //       console.log("Successfully registered")
  //       // window.location.replace("../signIn.html");
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // });

  // // ******************************************
  // // Signin using first name
  // //******************************************************* */
  // // var hold = [];
  // // setValue(hold[0]) // delete this
  
  // $("#signIn").on("click", (e) => {
  //   e.preventDefault();
  //   console.log("clicked");
  //   let password = $("#pword").val().trim();
  //   let firstName = $("#uname").val().trim().toLowerCase();
  //   // let queryUrl2 = "/api/users/user/" + firstName;
  //   let queryUrl2 = "/api/users/login/" + firstName;
  //   let data = {
  //                 firstName: firstName,
  //                 password: password
  //               }
  //   console.log(data)
  //   console.log(firstName);
  //   console.log(password);

  //   // let unameCheck
  //   // let check

  //   $.ajax({
  //     url: queryUrl2,
  //     method: "POST",
  //     data: data,
  //     success: (res) => {
  //       console.log(res);
  //       console.log("Success")
  //       // window.location.replace("../index.html");
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //     // // data: userInfo
  //   }).then((data) => {
  //     console.log(data);
  //     console.log(data.firstName);
  //     console.log(data.email);
      
     
  //     setValue(hold[0]);

  //     // res.redirect("../public/index.html")
      
  //     // if (
  //     //   JSON.stringify(response.phoneNumber) === phoneNumber &&
  //     //   response.email === password
  //     // ) {
  //     //   //  for testing purposes should not be email
  //     //   window.location.href = "../index.html";
  //     //   console.log(`Welcome ${response.firstName}!`);
  //     // } else {
  //     //   alert(
  //     //     `Invalid Username and/or Password. Please confirm and try again.`
  //     //   );
  //     //   window.location.href = "/";
  //     // }
  //   });
  // });



  // ******************************************
  // Signin using email
  //******************************************************* */

//   $("#signIn").on("click", (e) => {
//     e.preventDefault();
//     console.log("clicked");
//     let phoneNumber = $("#uname").val().trim();
//     let password = $("#pword").val().trim();
//     let myHold = window.localStorage
//     let queryUrl2 = "/api/users/login/phonenumber/" + phoneNumber;
//     console.log(phoneNumber);
//     console.log(password);
//     hold.push(phoneNumber);

//     let data = {
//       phoneNumber: phoneNumber,
//       password: password
//     }
//     console.log(data)
//     console.log(phoneNumber);
//     console.log(password);
    
//     // hold.push(phoneNumber);
//     // console.log(hold);

//     // Store phoneNumber to be used on window redirect************************8 */ */
//         myHold.setItem("phoneNumber", hold[0]);
//         console.log(myHold.phoneNumber);

//     // let unameCheck
//     // let check
//     //*********************************** */
//     // httpRequest
//     //******************************************* */

// //     let httpRequest;
// //     function makeRequest() {
// //     httpRequest = new XMLHttpRequest();

// //     if (!httpRequest) {
// //       alert('Giving up :( Cannot create an XMLHTTP instance');
// //       return false;
// //     }

// //     httpRequest.onreadystatechange = displayContents;
// //       // Process the server response here.
// //       httpRequest.open('GET', queryUrl2, true);
// //       httpRequest.send();
// //   }
  
// //   function displayContents() {
// //     // let email = $("#uname").val().trim();
// //     // let password = $("#pword").val().trim();
// //   if (httpRequest.readyState === XMLHttpRequest.DONE) {
// //     // Everything is good, the response was received.
// //     if (httpRequest.status === 200) {
// //       console.log("Perfect!")
// //       console.log(httpRequest)
// //       console.log(httpRequest.responseText)
// //       let jsonResponse = JSON.parse(httpRequest.responseText)
// //       let verifyEmail = jsonResponse["email"]
// //       let verifyPhone = jsonResponse["phoneNumber"]
// //       console.log(jsonResponse)
// //       console.log(jsonResponse["email"])
// //       console.log(verifyEmail)
// //       console.log(email)
// //       console.log(jsonResponse["phoneNumber"])
// //       console.log(verifyPhone)
// //       console.log(password)
// //         if (
// //       email === verifyEmail &&
// //       password === JSON.stringify(verifyPhone)
// //       ) {

// //       hold.push(JSON.stringify(jsonResponse["phoneNumber"]));
// //       storeLocal(hold)

// //       function storeLocal(data){
// //           localStorage.setItem('userData', data);
// //       }
// //       console.log(hold[0]);
// //       // setValue(hold[0])
// //     //         hold.push(JSON.stringify(response.phoneNumber).trim());
// //             console.log("pushed")
// //     //       //   console.log(`This is the hold variable: ${hold[0]}`);
// //           window.location.replace("../index.html");
// //           // return hold[0]
// //     } else {
// //       // There was a problem with the request.
// //       // For example, the response may have a 404 (Not Found)
// //       // or 500 (Internal Server Error) response code.
// //       console.log(`error: there was a problem`)
// //     }
// //     // Not ready yet.
// //       }
// //     }
// //   }
// // // }
// // makeRequest();
// //********************************************** */
    
// // if (httpRequest.readyState === XMLHttpRequest.DONE) {
//   // window.onload = function windowLoad(event) {
//   //       event.preventDefault()
//       $.ajax({
//         url: queryUrl2,
//         method: "POST",
//         data: data,
//         success: function (response) {
//           console.log("Success")
//           // window.location.replace("../index.html");
//           // setValue(JSON.stringify(response.phoneNumber))
//       //     if (
//       //       email === response.email &&
//       //       password === JSON.stringify(response.phoneNumber)
//       //       ) {
//       //         console.log(JSON.stringify(response.phoneNumber));
//       //           hold.push(JSON.stringify(response.phoneNumber).trim());
//       //           console.log("pushed")
//       //         //   console.log(`This is the hold variable: ${hold[0]}`);
//       //         // window.location.replace("../index.html");
//       //         // return hold[0];
//       //         function makeRequest() {
//       //         httpRequest = new XMLHttpRequest();
            
//       //         if (!httpRequest) {
//       //           alert('Giving up :( Cannot create an XMLHTTP instance');
//       //           return false;
//       //         }
            
//       //         httpRequest.onreadystatechange = displayContents;
//       //           // Process the server response here.
//       //           httpRequest.open('GET', "../index.html", true);
//       //           httpRequest.send();
//       //       }
            
//       //       function displayContents() {
//       //       if (httpRequest.readyState === XMLHttpRequest.DONE) {
//       //         // Everything is good, the response was received.
//       //         if (httpRequest.status === 200) {
//       //           // Perfect!
//       //           console.log(httpRequest);
//       //           window.location.replace(httpRequest.responseURL);
//       //           setValue(hold[0])
//       //       } else {
//       //           // There was a problem with the request.
//       //           // For example, the response may have a 404 (Not Found)
//       //           // or 500 (Internal Server Error) response code.
//       //           console.log(`error: there was a problem`)
//       //         }
//       //         // Not ready yet.
//       //         // }
//       //       }
//       //       }
//       //       makeRequest();
//       // } else {
//       //   alert(
//       //     `Invalid Username and/or Password. Please confirm and try again.`
//       //   );
//       //   window.location.href = "/";
//       // }
//       },
//       error: function () {
//         console.log("Something went wrong!")
//       //   alert("Something went wrong!");
//       },
//       // // data: userInfo
//     }).then((response) => {
//       console.log(response);
//       console.log(response.phoneNumber);
//       console.log(response.email); 

//       setValue(phoneNumber);
//       // window.redirect("../index.html")
//       window.location.href="../index.html"
      
//       // if (
//       //   email === response.email &&
//       //   password === JSON.stringify(response.phoneNumber)
//       // ) {
//       //   console.log(JSON.stringify(response.phoneNumber));
//       //   hold.push(JSON.stringify(response.phoneNumber).trim());
//       //   console.log(`This is the hold variable: ${hold[0]}`);
//       //   // window.location.replace("../index.html");
//       //   // $(window).ready(() => {
//       //   // $("input #phone-1").val(hold);
//       //   //   let setNum = () => {
//       //   //      console.log(hold)
//       //   //      // setValues(hold)
//       //   //      $("#date").val(today);
//       //   //      $("input #phone-1").val(hold);
//       //   //      $("#phone-2").focus();
//       //   //      };
//       //   //      setNum();
//       //   //  }); 


//       //   $(window).ready(() => {
//       // //   //   setTimeout(() => {
//       //   setValue(hold[0]);
//       // //   //   console.log(`This is the lost hold variable: ${hold}`);
//       // //   //   }, 1000)
//       //   });

//       //     window.onload = (event) => {
//       //       // this.location.href="../index.html";
//       //   setNum(hold[0]);
//       //       console.log('The page has fully loaded');
//         // };

//       //   // if ( window.location.href="../index.html") {
//       //   //     // asyncCall()
//       //   //    hold = $("#phone-1").val(response.phoneNumber)
//       //   // }
//       //   return hold[0];
//       // } else {
//       //   alert(
//       //     `Invalid Username and/or Password. Please confirm and try again.`
//       //   );
//       //   window.location.href = "/";
//       // }
//       // console.log(`This is the hold variable again: ${hold[0]}`);
//       //  setValues(hold[0])
//       //  return hold;
//     });


  //   // $(window).ready(() => {
  //   //   $.ajax({
  //   //     url: queryUrl2,
  //   //     method: "GET",
  //   //     success: function (response) {
  //   //       setValue(JSON.stringify(response.phoneNumber))
  //   //     }
  //   //   }).then((response) => {
  //   //     console.log(response);
  //   //     console.log(response.phoneNumber);
  //   //     console.log(response.email);

  //   //     hold.push(JSON.stringify(response.phoneNumber).trim());
  //   //     setValue(hold[0])

  //   //   }) 
  //   // });

  //     // }
  // });


  
  // $(window).ready(() => {
  //   $.ajax({
  //     url: queryUrl2,
  //     method: "GET",
  //     success: function (response) {
  //       setValue(JSON.stringify(response.phoneNumber))
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //     console.log(response.phoneNumber);
  //     console.log(response.email);
  //   }) 
  // });

  
  // *********************************************************
  // Set phone number value function after successful sign in
  // **********************************************************
  // let setValues = (x) => {
  //   $("#phone-1").empty();
  //   $("#phone-1").val(x);
  // };

  // let setNum = () => {
  //   $("#date").val(today);
  //   $("#phone-1").val(hold);
  //   $("#phone-2").focus();
  // };
  
  // let setValue = (x) => {
  //   $(window).on("load", () => {
  //   let checkVal = $("#phone-1").val();
  //   x = x;
  //   console.log(x);
  //   // setValues(hold)
  //   $("#sphone-1").text(x);
  //   $("#phone-1").val(x);
  //   console.log($("#phone-1").val());
  //   console.log(checkVal)
  //   $("#phone-2").focus();
    // })
  // };


// Come bact to this setValue works*******

//   $("#date").on("change", number => {
//     let phoneNumber = number 
//     console.log(phoneNumber);
//     setValue(phoneNumber);
// });

  // let storedValue = localStorage.getItem("phoneNumber");
  // console.log(storedValue);

  // setValue(storedValue);

  // localStorage.removeItem("phoneNumber"); 

  //******************************************** */

  
  //  let setValues = (x) => {
    //   //  $(function() {
      //   //  $("../index.html").load( e => {
        //   //    e.preventDefault()
        //     // window.document.$("#phone-1").val(x);
        //     // setValue(JSON.stringify(response.phoneNumber));
        //     window.location.href = "../index.html";
        //     $("#phone-1").val(JSON.stringify(x));
        //     $("#phone-2").focus()
        //     // $("#phone-1").prev('input').val(response.phoneNumber)
        //     // })
        //   // })
        //  }
        
  //       let resolveAfter2Seconds = () => {
  //         return new Promise((resolve) => {
  //           setTimeout(() => {
  //             console.log(hold[0])
  //             resolve($("#phone-1").val(hold[0]));
  //           }, 2000);
  //         });
  //       };
        
  //       let asyncCall = async () => {
  //         console.log("calling");
  //   const result = await resolveAfter2Seconds();
  //   $("#phone-2").focus();
  //   console.log(result);
  //   // expected output: "resolve()"
  // };
  
  // asyncCall();
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
    populate();
  });

  // $("#date").on("change", (e) => {
  //   e.preventDefault();
  //   populate();
  // });

  // $("#phone-2").on("focus", (e) => {
  //   e.preventDefault();
  //   populate();
  // });

  let toggle = (button) => {
  if( $("#balanceBtn").val() == "OFF"){
    $("#balanceBtn").val() =" ON";}

  else if( $("#balanceBtn").val() == "ON"){
    $("#balanceBtn").val() = "OFF";}
}

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
    $("#transactionInfo").empty()
    e.preventDefault();
    console.log("clicked");
    // $("#transactSummaryInfo").append(
    //     '<div class="row line">' +
    //     '<div class="col-md-2 content-group"><br>' +
    //     '<p class="lables" for="transfer date">*Transfer Date</p><br>' +
        
        
        
    //     "</div>" +
    //     '<div class="col-md-3 content-group">' +
    //     "<br>" +
    //     '<p class="lables" for="recipient info">*Recipient</p><br>' +
        
        
        
    //     "<br>" +
    //     "</div>" +
    //     '<div class="col-md-3 content-group">' +
    //     "<br>" +
    //     '<p class="lables" for="Initial Account Balance">*Initial Account Balance</p><br>' +
        
        
        
    //     "<br>" +
    //     "</div>" +
    //     '<div class="col-md-2 content-group">' +
    //     "<br>" +
    //     '<p class="lables" for=" Account Balance">*Account Balance</p><br>' +
        
        
          
    //     "<br>" +
    //     "</div>" +
    //     '<div class="col-md-2 content-group">' +
    //     "<br>" +
    //     '<p class="lables" for="Sender Account Number">*Transfer Amount</p><br>' +
        
        
        
    //     "<br>" +
    //     "</div>" +
    //     "</div>" +
    //     "</div>"
    //   )
    getTransactionSummary();
    
  });

  // $("#displayTransact").on("click", (e) => {
  //   e.preventDefault();
  //   console.log("clicked");
  //   getTransactionSummary();
  //   // $("#transactionInfo").append("<br>" + `Transfer to ${response.firstName} ${response.lastName} ${response.phoneNumber}`);
  //   // $("#transactionAmt").append("<br>" + transferAmount);
    
  // });


  // ***********************************************
  // Clicking cancel button to reset form
  //************************************************ */
  $("#cancel").on("click", () => {});
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
              phone2AcctBal.push(response.accountBalance);
              console.log(phone2AcctBal);

              // verify this *************
              if (response.accountBalance === NaN || response.accountBalance === null) {
                console.log("error");
                alert("invalid recipient Phone Number");
                return;
              };
              // *****************************************************

              // Transfer calculation 2
              // Phone-2
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
                console.log(response);
                $("#transactionInfo")
                  .append("<br>" + `Transfer to ${response.firstName} ${response.lastName} ${response.phoneNumber}`);
                $("#transactionAmt").append("<br>" + transferAmount);
                
                // Call to store transaction
                let transactionInfo = `Transfer to ${response.firstName} ${response.lastName} ${response.phoneNumber} ${transferAmount} on ${transferDate}.`;
                let transactionData = {
                  transactionDate: transferDate,
                  senderPhoneNumber: phoneNumber1,
                  transactionInfo: transactionInfo,
                  recipientFirstName: response.firstName,
                  recipientLastName: response.lastName,
                  transactionAmount: transferAmount,
                  recipientPhoneNumber: phoneNumber2,
                  accountBalance: newUser1Bal[0],
                };
                console.log(transactionData)
                $.ajax({
                  url: queryUrl3,
                  method: "POST",
                  contentType: "application/json",
                  data: JSON.stringify(transactionData),
                  success: (data) => console.log(data),
                  error: (err) => console.log(err)
                }).then((res) => {
                  console.log(res)
                  //  $("#transactionSummary")
                  // .append("<br>" + `${res.transactionInfo}`);

                  //  $("#transactionSummary")
                  // .append("<br>" + `Transfer to ${response.firstName} ${response.lastName} ${response.phoneNumber}`);

                })

              })
            });

          });
        }
      }
    });
  };
  //*********************************************************
  // function to update balance
  //********************************************************* */
  let updateBalance = () => {
    // // Call to Update Sender Account Balance
    // $.ajax({
    //     url: queryUrl,
    //     method: "PUT",
    //     data: data
    // }).then(response => {
    //     console.log(response);
    // });
    // // Call to Update Recipient Account Balance
    // $.ajax({
    //     url: queryUrl2,
    //     method: "PUT",
    //     data: newUser2Bal
    // }).then(response => {
    //     console.log(response);
    // });
  };
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
      $("#balance").text(response.accountBalance);
    });
  };

  let getTransactionSummary = () => {
    let queryUrl = "/api/users/transactions/" + $("#phone-1").val().trim();
    // Call to get transaction info
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then((response) => {
      console.log(response);
      // console.log([response].transactionInfo)
      // let [{ transactionInfo }] = response
      // let viewableTransaction = JSON.stringify(response.transactionInfo)
      //       let viewableTransaction2 =JSON.stringify(response)
      

      let see = [];
      response.slice().reverse().forEach(element => { // looping in reverse
      // response.forEach(element => {                // looping normally
        console.log(element.transactionInfo)
        see.push(element)
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
        
        `${(parseFloat(element.accountBalance) + parseFloat(element.transactionAmount))}` +
        
        "<br>" +
        "</div>" +
        '<div class="col-md-2 content-group">' +
        "<br>" +
        '<label class="lables" for=" Account Balance">*Account Balance</label><br>' +
        
          `${element.accountBalance}` +
          
        "<br>" +
        "</div>" +
        '<div class="col-md-2 content-group">' +
        "<br>" +
        '<label class="lables" for="Sender Account Number">*Transfer Amount</label><br>' +
        
        element.transactionAmount +
        
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
