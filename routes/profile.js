const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../models/Profile')
const User = require('../models/User')

//create or update profile
router.post('/', [ auth , [
    check('bio', 'biography is required').not().isEmpty(),
    check('aboutme', 'aboutme is required').not().isEmpty()
]], async (req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { bio, aboutme } = req.body
    const profileFields = {
        user: req.user.id,
        bio,
        aboutme
    }
    try {
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true }
        )
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//get profile
router.get('/me', auth, async (req, res)=> {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name'])
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
          }
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//get all profiles
router.get('/', auth, async (req, res)=> {
    try {
        const profiles = await Profile.find().populate('user', ['name'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//delete profile, user
router.delete('/', auth, async(req, res)=> {
    try {
        //delete profile
        await Profile.findOneAndRemove({ user: req.user.id })
        //delete user
        await User.findByIdAndRemove({ _id: req.user.id })
        res.json({ msg: 'User deleted'})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})



module.exports = router