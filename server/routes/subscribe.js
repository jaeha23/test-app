const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");

const { auth } = require("../middleware/auth");

//=================================
//             Subscriber
//=================================

router.post('/unSubscribe', (req,res)=>{
    Subscriber.findOneAndDelete({userTo: req.body.userTo,userFrom:req.body.userFrom})
    .exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true, doc})
    })
})

router.post('/subscribe', (req,res)=>{
    const subscribe = new Subscriber(req.body)

    subscribe.save((err,doc)=>{
        if(err) return res.status(400).json({success:false, err})
        res.status(200).json({success:true, doc})
    })
})


router.post('/subscriberNumber', (req,res)=>{
    Subscriber.find({ 'userTo':req.body.userTo})
    .exec((err, subscribe)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true, subscribeNumber: subscribe.length})
    })
})


router.post('/subscribed', (req,res)=>{
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom':req.body.userFrom})
    .exec((err,subscribe)=>{
        if(err) return res.status(400).send(err);
        var result = false
        if(subscribe.length !==0){
            result = true
        }
        res.status(200).json({ success:true, subscribed:result})
    })
})

module.exports = router;