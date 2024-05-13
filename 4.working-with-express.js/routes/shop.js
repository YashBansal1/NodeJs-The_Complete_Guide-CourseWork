const express = require("express");

const router = express.Router();

const rootDir = require("../util/path");

const path = require("path"); //we can use the path module, it allows us to get the name of current directory and also provide method like join that we can use to generate absolute path without needing to hard code them which will be specific to one system.

//This router is like a mini express app tied to other express app or pluggable into other express app.


// router.use('/', (req, res, next) => {
//     console.log("In another middleware");
//     res.send("<h1>Hello from express Again</h1>");
// });
//this will look for any endpoint that start with the /, so as a result we can't use it before other specific endpoints. But if we use the get or post method it will match to that specific endpoint only which have / not any other and that way we don't need to care about the order in which our request handler are called.

router.get('/', (req, res, next) => {
    console.log("In another middleware");
    //res.send("<h1>Hello from express Again</h1>");

    // res.sendFile(`/Users/yashbansal/Wissen_Courses/NodeJs-The-Complete-Guide/4.working-with-express.js/views/shop.html`);
    //we can set the html page by sending the html file using sendFile method on response but the sendFile method need an absolute path not an relative path to find the file

    res.sendFile(path.join(rootDir, 'views', 'shop.html')); //_dirname will give the current directory which is routes and ../ will give the parent directory where the views is present, then in view we get shop.html. We don't need to give / as the join method will generate the absolute path in such way that it will work for both the linux and windows system.
});

module.exports = router;