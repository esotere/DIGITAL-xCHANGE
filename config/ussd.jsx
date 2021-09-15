// const credentials = {
//     apiKey: "API_KEY",         // put API key in the .env
//     username: "Esotere",      // use "sandbox" for development in the test environment
// };

// module.exports =  {
//     apiKey: process.env.AFRICAS_TALKING_API_KEY,         // put API key in the .env
//     username: "esotere",      // use "sandbox" for development in the test environment
//     format: "json"
// };

// module.exports = credentials => {
//     credentials = {
//         apiKey: process.env.AFRICAS_TALKING_API_KEY,         // put API key in the .env
//         username: "esotere",      // use "sandbox" for development in the test environment
//         format: "json"
//     },
//    phoneNumber = "+2547xxxxxxxx";     
// };

exports.credentials = {
    apiKey: process.env.AFRICAS_TALKING_API_KEY,         // put API key in the .env
    username: "esotere",      // use "sandbox" for development in the test environment
    format: "json"
};
// exports.phoneNumber = "+2547xxxxxxxx";


