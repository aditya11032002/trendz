import express from "express";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import createError from "../error.js";




export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id }); // Change userid to userId
    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (err) {
        next(err);
    }
};


export const deleteComment = async(req, res, next) =>{
    try{
        const comment = await Comment.findById(res.params.id)
        const video = await Video.findById(res.param.id)
        if(req.userid === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("The comment has been deleted")
        } else{
            return next(createError(403, "You can delete only your comment"));
        }
    }catch(err){
        next(err)
    }
}


export const getComments = async(req, res, next) =>{
    try{
        const comments = await Comment.find({videoId: req.params.videoId})
        res.status(200).json(comments)
        console.log(comments)
    }catch(err){
        next(err)
    }
}


export const upadteComment = async(req, res, next) =>{
    try{

    }catch(err){
        next(err)
    }
}

const router = express.Router();


export default router;