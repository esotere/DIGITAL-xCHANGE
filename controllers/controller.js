const User = require("../models/Users.jsx");
const Transaction = require("../models/Transactions.jsx");





module.exports = app => {
    // app.get('/favicon.ico', (req, res) => res.status(204)); // (to stop favicon error)

    

    app.get('/api/test', (req, res) => {
            let data = req.body
            console.log(JSON.stringify(data));
            res.json(JSON.stringify(data));
        });

    app.get("/api/users", (req,res) => {
            console.log(req.body);
            User.find({}, (err, users) => {
                if (err) {
                    res.status(500).send({error: `Could Not Get Information Of All Users`});
                } else {
                    res.status(200).send(users);
                }
            })
        });

    app.get("/api/users/user/:phoneNumber", (req,res) => {
            console.log(req.body);
            User.findOne({"phoneNumber": req.params.phoneNumber}, (err, user) => {
                if (err) {
                    res.status(500).send({error: `Could Not Get User Information`});
                } else {
                    res.status(200).send(user);
                }
            })
        });

    app.get("/api/users/user/email/:email", (req,res) => {
            console.log(req.body);
            User.findOne({"email": req.params.email}, (err, user) => {
                if (err) {
                    res.status(500).send({error: `Could Not Get User Information`});
                } else {
                    res.status(200).send(user);
                }
            })
        });

    app.get("/api/users/user/san/:system_account_number", (req,res) => {
            console.log(req.params);
            // let objectFound = false;
            // let newListOfUsers = [];
            User.findOne({"system_account_number": req.params.system_account_number}, (err, user) => {
                if (err) {
                    res.status(500).send({error: `Account Number Not Found!`});
                    
                } else {
                    // objectFound = true;
                    res.status(200).send(user);
                }
                //  if (!objectFound) {
                    //      res.status(500).send({error: `System Account Number Not Found!`})
                    //  } else {
                        //      res.status(200).send(users)
                        //  }
                    })            
    });


    // Get controller account
     app.get("/api/users/user/control", (req,res) => {
            User.findOne({"accountType": "type-3-control"}, (err, user) => {
                if (err) {
                    res.status(500).send({error: `Controller Not Found!`});
                    
                } else {
                    // objectFound = true;
                    res.status(200).send(user);
                }
                //  if (!objectFound) {
                    //      res.status(500).send({error: `System Account Number Not Found!`})
                    //  } else {
                        //      res.status(200).send(users)
                        //  }
                    })            
     });
    
    // Patch controller balance    
    app.patch("/api/user/edit/control/:accountType", (req, res) => {
        console.log(req.body.accountBalance)
        // let change = {"accountBalance": req.body.accountBalance}
        let change = JSON.parse(req.body.accountBalance)
        console.log(change);
        if (!change || change === "") {
                res.status(500).send({error: `Cannot Update Balance!`})
            } else {
            User.updateOne({ "accountType": "type-3-controller" }, { $set: { "accountBalance": change } }, (err, balance) => {
                if (err) {
                    res.status(500).send({ error: `Controller Not Found!` });
                    
                } else {
                    
                    res.status(200).send(balance);
                }
            })
               
                    }            
                });
    


                
    // Get sum of all users account balance 
    app.get("/api/users/total", (req,res) => {
        User.aggregate([{
            $group: {
                 
                    _id: "$id",
                    // accountType: '$accountType',
                    totalBalance: { $sum: "$accountBalance" },
                    count: { $sum: 1 }
                
            }
        }]).exec((err, total) => {
                    if (err) {
                        res.status(500).send(err);

                        // res.status(500).send({error: `Could Not Get Total Balance`});
                    } else {
                        res.status(200).send(total);
                    }            
            })
    // }
});



    app.get("/api/users/totalbal", (req,res) => {
        // console.log(req.params);
        // let totalBalance = req.body.totalBalance;
        // let accountBalance = req.body.accountBalance
        // console.log(accountBalance);
        // if (!accountBalance || accountBalance === "") {
            //     res.status(500).send({error: `Cannot Get Balance!`})
            // } else {
        User.aggregate([{
            $group: {
                _id: {
                    accountType: '$accountType',
                    totalBalance: { $sum: "$accountBalance" },
                    count: { $sum: 1 }
                }
            }
        }]).exec((err, total) => {
                    if (err) {
                        res.status(500).send(err);

                        // res.status(500).send({error: `Could Not Get Total Balance`});
                    } else {
                        res.status(200).send(total);
                    }            
            })
    // }
    });


     // Get sum of all users and merchant account balance 
    app.get("/api/users/controlbalance", (req,res) => {
        User.aggregate([{
              $match: { accountType: "type-1-individual", accountType: "type-2-merchant" } },
            { $group: {
                 
                    _id: "$id",
                    // accountType: '$accountType',
                    totalBalance: { $sum: "$accountBalance" },
                    count: { $sum: 1 }
                
            }
        }]).exec((err, total) => {
                    if (err) {
                        res.status(500).send(err);

                        // res.status(500).send({error: `Could Not Get Total Balance`});
                    } else {
                        // console.log(total);
                        res.status(200).send(total);
                    }            
            })
    // }
});

    




    // ******Adding users through registeration in routes
    // app.post("users/api/users/", async (req,res) => {
    //             try {
    //                 const salt = await bcrypt.genSalt();
    //                 const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //                 console.log(salt);
    //                 console.log(hashedPassword);
    //                 let user =  new User({
    //                     accountType: req.body.accountType,
    //                     title: req.body.title,
    //                     userName: req.body.userName,
    //                     firstName: req.body.firstName,
    //                     lastName: req.body.lastName, 
    //                     address: req.body.address,
    //                     countryCode: req.body.countryCode, 
    //                     phoneNumber: req.body.phoneNumber, 
    //                     email: req.body.email,
    //                     bank_name: req.body.bank_name,
    //                     bank_account_number: req.body.bank_account_number, 
    //                     bvn: req.body.bvn,
    //                     system_account_number: req.body.system_account_number, 
    //                     // accountBalance: req.body.accountBalance,
    //                     password: hashedPassword,
    //                     // creation_date: req.body.creation_date
    //             });
    //             console.log(user)
    //             user.save({user},(err,savedUser) => {
    //                 if (err) {
    //                 return res.status(500).send(err);
    //                 } else {
    //                     res.status(200).send(`successfully saved, ${savedUser}`);
    //                     // res.redirect("../public/signIn.html");
    //                 }
    //             })
    //         } catch {
    //             res.status(500).send(`something went wrong`);
    //             //  return res.redirect("../public/signIn.html");

    //         }
    //     });

        
        
        // Added 'san' System Account Number
    app.put("/api/users/user/san/:system_account_number", (req,res) => {
            let changable = {
                title: req.body.title,
                firstName: req.body.firstName,
                lastName: req.body.lastName, 
                address: req.body.address,
                countryCode: req.body.countryCode, 
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                bank_name: req.body.bank_name,
                bank_account_number: req.body.bank_account_number, 
            bvn: req.body.bvn,
            accountBalance: req.body.accountBalance
            
        };
        if (!changable || changable === "") {
            res.status(500).send({error: `Cannot Update User!`});
            return;
        } else {
            // let objectFound = false;
            User.updateOne({"system_account_number": req.params.system_account_number}, {$set:{title: req.body.title,
                firstName: req.body.firstName,
                lastName: req.body.lastName, 
                address: req.body.address,
                countryCode: req.body.countryCode, 
                phoneNumber: req.body.phoneNumber, 
                email: req.body.email,
                bank_name: req.body.bank_name,
                bank_account_number: req.body.bank_account_number, 
                bvn: req.body.bvn,
                accountBalance: req.body.accountBalance}}, (err, balance) => {
                if (err) {
                    res.status(500).send({error: `Unable to update!`});
                    
                } else {
                    // objectFound = true;
                    res.status(200).send(balance);
                }
            })
        }
    });

    app.patch("/api/users/user/edit/:phoneNumber", (req, res) => {
        console.log(req.params);
        let newBalance = req.body.accountBalance
        
        console.log(newBalance);
        if (!newBalance || newBalance === "") {
                res.status(500).send({error: `Cannot Update Balance!`})
            } else {
                User.updateOne({"phoneNumber": req.params.phoneNumber}, {$set:{"accountBalance": newBalance}}, (err, balance) => {
                        if (err) {
                            res.status(500).send({error: `Unable to update!`});
                            
                        } else {
                            // objectFound = true;
                            res.status(200).send(balance);
                        }
                    })
                    }
                })

    app.delete("/api/users/user/del/:phoneNumber", (req,res) => {
            console.log(req.params);
            // let objectFound = false;
            // let newListOfUsers = [];
            User.deleteOne({"phoneNumber": req.params.phoneNumber}, (err, users) => {
                if (err) {
                    res.status(500).send({error: `Unable to update!`});
                    
                } else {
                    // objectFound = true;
                    res.status(200).send(users);
                }
            })            
    });
    



    // ******Adding transactions to Transactions database **********************
    app.post("/transactions/api/transactions/", (req,res) => {
                
                    const transaction =  new Transaction({
                        transactionDate: req.body.transactionDate,
                        senderPhoneNumber: req.body.senderPhoneNumber,
                        transactionInfo: req.body.transactionInfo,
                        transactionInfoOther: req.body.transactionInfoOther,
                        recipientFirstName: req.body.recipientFirstName,
                        recipientLastName: req.body.recipientLastName, 
                        transactionAmount: req.body.transactionAmount,
                        recipientPhoneNumber: req.body.recipientPhoneNumber, 
                        accountBalance: req.body.accountBalance,
                        recipientAccountBalance: req.body.recipientAccountBalance,
                        creation_date: req.body.creation_date
                });
                console.log(transaction)
                transaction.save({transaction}, (err,savedtransaction) => {
                    if (err) {
                    return res.status(500).send(err, {error:"SNAFU"});
                    } else {
                        res.status(200).send(`successfully saved, ${savedtransaction}`);
                    }
                })
    });
    
    // Get all transactions
    app.get("/api/users/transactions", (req,res) => {
            console.log(req.body);
            Transaction.find({}, (err, transactions) => {
                if (err) {
                    res.status(500).send({error: `Could Not Get Information Of All transactions`});
                } else {
                    res.status(200).send(transactions);
                }
            })
        });

    // Get one user's transaction by phone number
    app.get("/api/users/transactions/:senderPhoneNumber", (req,res) => {
            console.log(req.body);
            Transaction.find({"senderPhoneNumber": req.params.senderPhoneNumber}, (err, transactions) => {
                if (err) {
                    res.status(500).send({error: `Could Not Get User Transaction Information`});
                } else {
                    return res.status(200).send(transactions);
                }
            })
    });
    
    // Get one user's incoming transaction by phone number
    app.get("/api/users/incoming_transactions/:recipientPhoneNumber", (req,res) => {
            console.log(req.body);
            Transaction.find({"recipientPhoneNumber": req.params.recipientPhoneNumber}, (err, transactions) => {
                if (err) {
                    res.status(500).send({error: `Could Not Get User Transaction Information`});
                } else {
                    return res.status(200).send(transactions);
                }
            })
        });
};





//     //  Routes for USSD
//     app.post("/replenish", (req, res) => {
//         let { sessionId, serviceCode, phoneNumber, test } = req.body;
//         if (text == '') {
//     // This is the first request. Note how we start the response with CON
//     let response = `CON What would you want to check
//     1. My Account
//     2. My phone number`
//     res.send(response)
//   } else if (text == '1') {
//     // Business logic for first level response
//     let response = `CON Choose account information you want to view
//     1. Account number
//     2. Account balance`
//     res.send(response)
//   } else if (text == '2') {
//     // Business logic for first level response
//     let response = `END Your phone number is ${phoneNumber}`
//     res.send(response)
//   } else if (text == '1*1') {
//     // Business logic for first level response
//     let accountNumber = 'ACC1001'
//     // This is a terminal request. Note how we start the response with END
//     let response = `END Your account number is ${accountNumber}`
//     res.send(response)
//   } else if (text == '1*2') {
//     // This is a second level response where the user selected 1 in the first instance
//     let balance = 'NGN 10,000'
//     // This is a terminal request. Note how we start the response with END
//     let response = `END Your balance is ${balance}`
//     res.send(response)
//   } else {
//     res.status(400).send('Bad request!')
//   }
//     })





        // // test **************************
        // app.post("/api/users/login/:firstName", async (req,res) => {
        //   try {
        //       let data = {
        //           firstName: req.params.firstName,
        //           password: req.body.password
        //       };
        //     let user = await User.findOne({"firstName": data.firstName}).exec();
        //             if (!user) {
        //             return res.send({error: "Could NOT find user information!"});
        //         }
        //         if (!bcrypt.compare(data.password, user.password)) {
        //             res.send({message:`Unsuccessful, incorrect username and/or password combination`});
        //                 // res.send("Success!");
        //             } 
        //             res.send({ message: `Welcome ${user.firstName}, Successfully logged in correct password!`});
        //             // res.redirect("../public/index.html")
        //         } catch (error){
        //             res.status(500).send(`aweful stuff ${error}`);
                    
        //         }
        //     });
        
        //     app.post("/api/users/login/username/:userName", async (req,res) => {
        //         try {
        //             let data = {
        //                 userName: req.params.userName,
        //                 password: req.body.password
        //             };
        //             let user = await User.findOne({"userName": data.userName}).exec();
        //                  if (!user) {
        //                      return res.status(400).send({error: `Could Not Get User Information`});
        //                  }
        //                 if (!bcrypt.compare(data.password, user.password)) {
        //                     return res.status(400).send({message:`Unsuccessful, incorrect username and password combination`});
        //                     // res.send("Success!");
        //                 } 
        //                 res.send({ message: `Welcome ${user.firstName}, Successfully logged in correct password!`});
        //                 // res.redirect("../public/index.html")
        //             } catch (error){
        //                 // res.status(500).redirect(`../public/signUp`);
        //                 res.status(500).send(`aweful stuff ${error}`);                    
        //             }            
        //         });
        
        //         app.post("/api/users/login/phonenumber/:phoneNumber", async (req,res) => {
        //             try {
        //                 let data = {
        //                     phoneNumber: req.params.phoneNumber,
        //                     password: req.body.password
        //                 };
        //                 let user = await User.findOne({"phoneNumber": data.phoneNumber}).exec();
        //                      if (!user) {
        //                          return res.status(400).send({error: `Could Not Get User Information`});
        //                      }
        //                     if (!bcrypt.compare(data.password, user.password)) {
        //                         return res.status(400).send({message:`Unsuccessful, incorrect phoneNumber and password combination`});
        //                         // res.send("Success!");
        //                     } 
        //                     res.send({ message: `Welcome ${user.firstName}, Successfully logged in correct password!`});
        //                     // res.redirect("../public/index.html")
        //                 } catch (error){
        //                     res.status(500).send(`aweful stuff ${error}`);                        
        //                 }            
        //             });
        
        
        
        //     //     app.post("/api/users/login/phonenumber/:phoneNumber", passport.authenticate("local", {
        //     //        successRedirect: "../index",
        //     //        failureRedirect: "../signIn.html",
        //     //        failureFlash: true         
        //     //   }));
        
                
        
        //     app.post("/api/users/login/email/:email", async (req,res) => {
        //         try {
        //             let data = {
        //                 email: req.params.email,
        //                 password: req.body.password
        //             };
        //             let user = await User.findOne({"email": data.email}).exec();
        //                  if (!user) {
        //                      return res.status(400).send({error: `Could Not Get User Information`});
        //                  }
        //                 if (!bcrypt.compare(data.password, user.password)) {
        //                     return res.status(400).send({message:`Unsuccessful, incorrect username and password combination`});
        //                     // res.send("Success!");
        //                 } 
        //                 res.send({ message: `Welcome ${user.firstName}, Successfully logged in correct password!`});
        //                 // res.redirect("../public/index.html")
        //             } catch (error){
        //                 res.status(500).send(`aweful stuff ${error}`);
                        
        //             }            
        //         });
        
        
        
            // *********************************
        
        // app.post("/api/users/user/email/:email", async (req,res) => {
        //     console.log(req.body);
        //     User.findOne({"email": req.params.email}, async (err, user) => {
        //         if (err) {
        //             return res.status(400).send({error: `Could Not Get User Information`});
        //         // } else {
        //         //     res.send(user);
        //         }
        //         try {
        //             if (await bcrypt.compare(req.body.password, User.password)) {
        //                 res.send(`successfully signed in, ${user}`);
        //                 // res.send("Success!");
        //             } else {
        //                res.send("Incorrect password! Access Denied!");
        //             }
        //         } catch {
        //             res.status(500).send("aweful stuff forbidden");
        //             return;
        //         }
        //     })
        // });
        
        // app.post("/api/users/login", async (req,res) => {
        //     try {
        //     let user = await User.findOne({"firstName": req.body.firstName, "lastName": req.body.lastName}).exec();
        //             if (!user) {
        //             return res.status(400).send({error: "Could NOT find user information!"});
        //         }
        //         if (!bcrypt.compare(req.body.password, user.password)) {
        //             return res.status(400).send({message:`Unsuccessful, incorrect username and password combination`});
        //                 // res.send("Success!");
        //             } 
        //             res.send({ message: `Welcome ${user.firstName} Successfully logged in correct password!`});
                   
        //         } catch (error){
        //             res.status(500).send(`aweful stuff ${error}`);
                    
        //         }
        //     });
        
        // app.post("/api/users/login", async (req,res) => {
        //    try {
        //    let user = await User.findOne({"firstName": req.body.firstName, "lastName": req.body.lastName}, (err,savedUser) => {
        //         console.log(req.body.firstName);
        //         console.log(req.body.lastName);
        //         console.log(req.body.password);
        //             if (err || req.body.firstName === null) {
        //                 return res.status(400).send({error: "Could NOT find user information!"});
        //             }
        //              if ( bcrypt.compare(req.body.password, user.password)) {
        //                     res.send(`successfully found, ${savedUser}`);
        //                     // res.send("Success!");
        //                 } else {
        //                     res.send("Incorrect password!");
        //                 }
        //             })
        //             } catch (error) {
        //                 res.status(500).send("aweful stuff");
        //                 return;
        //             }
                  
        //         })
        
        
        // Login Handle
        // app.post("/login", (req, res, next) => {
        //     passport.authenticate("local", {
        //         successRedirect: "/index.html",
        //         failureRedirect: "/",
        //         failureFlash: true
        //     })(req, res, next);
        // });
        
        // // Logout Handle
        // app.get("/logout", (req, res) => {
        //     req.logOut();
        //     req.flash("success_msg", "You are logged out")
        //     res.redirect("/");
        //     });
        // // login Handle
        // app.post("/api/users/login/:firstName", (req, res, next) => {
        //     passport.authenticate("local", {
        //     successRedirect: "/",
        //     failureRedirect: "/signin",
        //     failureFlash: true 
        //   })(req, res, next);
        // });
        
        // app.post("/api/users/login/phonenumber/:phoneNumber", (req, res, next) => {
        //     passport.authenticate("local", {
        //     successRedirect: "/",
        //     failureRedirect: "/signin",
        //     failureFlash: true 
        //   })(req, res, next);
        // });
        
        // app.post("/api/users/login/email/:email", (req, res, next) => {
        //     passport.authenticate("local", {
        //     successRedirect: "/",
        //     failureRedirect: "/signin",
        //     failureFlash: true 
        //   })(req, res, next);
        // });
        
        // app.post("/api/users/login/username/:userName", (req, res, next) => {
        //     passport.authenticate("local", {
        //     successRedirect: "/",
        //     failureRedirect: "/signin",
        //     failureFlash: true 
        //   })(req, res, next);
        // });
        //     // Register
        // app.post("/api/users/", (req, res, next) => {
        //     passport.authenticate("local", {
        //     successRedirect: "/signin",
        //     failureRedirect: "/signup",
        //     failureFlash: true 
        //     })(req, res, next);
        // });
        //   // Login Handle  
        // app.post("/api/users/login", (req, res, next) => {
        //     passport.authenticate("local", {
        //     successRedirect: "/",
        //     failureRedirect: "/signin",
        //     failureFlash: true 
        //   })(req, res, next);
        // });
        
        // // Logout Handle
        // app.get("/logout", (req, res) => {
        // req.logOut();
        // req.flash("success_msg", "You are logged out")
        // res.redirect("/signin");
        // });