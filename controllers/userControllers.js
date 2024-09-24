const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require("../models/userModels")
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');

const createUser = async(req,res) =>{
    try{
        const {username,email,password} =req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            console.log("User with this email already exists")
            res.status(500).json(existingUser);
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = await User.create({username, email, password:hashedPassword})
            console.log("User created successfully")
            res.status(200).json(newUser)
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Error creating user"})
    }
};

const getUsers = async (req,res) =>{
    try{
        console.log("Fetched users", user)
        const user = await User.find();
        res.status(200).json(user)
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Error getting users"})
    }
};

const findUser = async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            console.log("User not found")
            return res.status(404).json({error: "User not found"})
        }else{
            console.log("User found", user)
            res.status(200).json(user)
        }
    }catch(error){
        console.log("User not found", error)
        res.status(500).json({message: "Error finding user"})
    }
};

const updateUser = async(req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        if(!user){
            console.log("User not updated")
            response.status(404).json({error: error.message})
        }else{
            console.log("User updated", user)
            res.status(200).json(user)
        }
    }catch(error){
        console.log("Errro updatin user", error)

    }
};

const deleteUser = async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id, req.body)
        if(!user){
            console.log("User not deleted")
            response.status(404).json({error: error.message})
        }else{
            console.log("User deleted", user)
            res.status(200).json(user)
        }
    }catch(error){
        console.log("Error deleting user", error)
    }
};


const login =async(req,res)=>{
    try{
    const {email,passsword}= req.body;
    const user = await User.findOne({email})
    if(!user){
        console.log("User not found")
        return res.status(404).json({error: "User not found"})
    }else{
        console.log("User found")
        res.status(200).json(user)
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        console.log("Incorrect password")
        return res.status(400).json({error: "Incorrect password"})
    }
}catch(error){
    res.status(500).json({error:err.message});
    console.log('User unsuccessful', err);
}
};

module.exports = {createUser, getUsers, findUser, updateUser, deleteUser, login};