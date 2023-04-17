const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Contact = require('../models/contactModel')

// access contact
const getContact = asyncHandler (async (req,res) =>{

    try {
        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found')
        }

        const total = await Contact.countDocuments({user:req.user.id})
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit)  || total;
        const search = req.query.search || '';
        const contacts = await Contact.find({user:req.user.id,name:{$regex:search,$options:"i"}})
        .skip(page*limit)
        .limit(limit);

        const response = {
            error:false,
            total,
            page: page + 1,
            limit,
            contacts,
        }
        res.status(200).json(response)

        
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error('Internal Server Error')
        
    }
  })


  const createContact = asyncHandler (async (req,res) =>{
    const {name,number,email,countryCode,address} = req.body

    if(!number || !name || !countryCode){
        res.status(400)
        throw new Error('Mandatory Fields are missing!')
    }
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const contact = await Contact.create({
        name,
        number,
        user: req.user.id,
        email,
        countryCode,
        address
    })
    
    res.status(201).json(contact)
 })

 const updateContact = asyncHandler (async (req,res) => {
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(400)
        throw new Error('Contact not found')
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json(updatedContact)
 })

 const deleteContact = asyncHandler (async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(400)
        throw new Error('Contact not found')
    }

    await contact.remove()
    res.status(200).json({ id: req.params.id })
 })

 const getContactById = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(400)
        throw new Error('Contact not found')
    }
    res.status(200).json(contact)
 })

module.exports ={
    getContact,
    createContact,
    updateContact,
    deleteContact,
    getContactById
}