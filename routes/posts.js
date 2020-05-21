const express = require('express')
//const request = require('request')
const config = require('config')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../models/Profile')
const User = require('../models/User')
const Post = require('../models/Post')

//add post
router.post('/', [auth, [
    check('text', 'text is required').not().isEmpty()
]], async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            user: req.user.id
        })
        const post = await newPost.save()
        res.json(post)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//get posts
router.get('/', auth, async(req, res)=>{
    try {
        const posts = await Post.find()
        const povrat = posts.filter(post => post.user == req.user.id)
        res.json(povrat)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//delete post
router.delete('/', auth, async(req, res)=>{
    try {
        await Post.findByIdAndRemove({ _id: req.body.id })
        const posts = await Post.find()
        const povrat = posts.filter(post => post.user == req.user.id)
        res.json(povrat)
    } catch (err) {
        
    }
})

//updat post
router.put('/', auth, async(req, res)=> {
    try {
        await Post.findByIdAndUpdate(
            { _id: req.body.id},
            {text: req.body.text}
             )
        const posts = await Post.find()
        const povrat = posts.filter(post => post.user == req.user.id)
        res.json(povrat)
    } catch (err) {
        
    }
})

//get all posts
router.get('/all', auth, async(req, res)=>{
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//add comment
router.post('/comment', auth, async(req, res)=> {
    try {
        const user = await User.findById(req.user.id)
        const post = await Post.findById(req.body.id)
        const newComment= {
            text: req.body.comment,
            name: user.name,
            user: req.user.id
        }
        post.comments.unshift(newComment)
        await post.save()
        
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


module.exports = router