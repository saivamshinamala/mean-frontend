const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const authCheck = require('../auth-check/auth-check');

const Post = require('../models/post');
const User = require('../models/user');
const { Mongoose } = require('mongoose');

const router = express.Router();

router.use("/posts", authCheck, (req, res, next) => {
    const postFind = Post.find({
        creator: req.userData.userId
    });
    const currentpage = +req.query.currentpage;
    const pagesize = +req.query.pagesize
    let fetchedPosts;

    if(currentpage && pagesize) {
        postFind
            .skip(pagesize * (currentpage - 1))
            .limit(pagesize);
    }

    postFind.then(docs => {
        fetchedPosts = docs;
        return Post.countDocuments({creator: req.userData.userId});
    })
    .then((count) => {
        return res.status(200).json({
            message: "Reterived posts successfully from Server",
            posts: fetchedPosts,
            maxposts: count
        });
    });
});

router.post("/add-post",authCheck, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        creator: req.userData.userId
    });

    post.save();
    res.status(201).json({
        message: "Posted Successfully"
    })
});

router.put("/update-post/:id",authCheck, (req, res, next) => {
    const newPost = new Post({
        _id: req.body._id,
        title: req.body.title
    });
    Post.updateOne({_id: req.params.id}, newPost)
    .then((result) => {
        res.status(201).json({
            message: "Posted Successfully"
        })
    });
})

router.delete("/delete-post/:id",authCheck, (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(res => {
        res.status(200);
    });
});

router.post("/login", (req, res, next) => {
    let userData;
    User.findOne({ email: req.body.email }).then((user) => {
        userData = user;
        if(!user) {
            return res.status(401).json({
                // message: "broke in user"
                message: "Invalid email or password"
            });
        }
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result) {
            return res.status(401).json({
                // message: "broke in result"
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign({ email: userData.email, id: userData._id }, "!@#$%^&*()OIUYTrfghjHTYUIJHGFD$%^&**UYTRH78984er5ssdd4dsf5f66eg212@#$%^TGsdcftyh", { expiresIn: "1h" });
        return res.status(200).json({ 
            token: token,
            id: userData._id,
            expiresIn: 3600
        });
    })
    .catch(err => {
        res.status(400).json({
            message: "error occurred"
        })
    });
    

});

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
            _id: new mongoose.Types.ObjectId().toHexString(),
            username: req.body.username,
            mypas: req.body.password
        });
        user.save()
        .then((result) => {
            return res.status(201).json({
                message: "User created successfully",
                result: result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: "Unsuccessful"
            });
        });
    })
    // let curUser;
    // bcrypt.hash(req.body.password, 10)
    // .then((hash) => {
    //     const user = new User({
    //         username: req.body.username,
    //         email: req.body.email,
    //         password: hash
    //     });
    //     curUser = user
    // });
    // curUser.save()
    // .then(result => {
    //     res.status(201).json({
    //         message: "User created",
    //         resu: result
    //     })
    //     .catch(() => {
    //         res.status(500).json({
    //             message: "Error occurred" ,
    //         });
    //     });
    // })
});


module.exports = router;