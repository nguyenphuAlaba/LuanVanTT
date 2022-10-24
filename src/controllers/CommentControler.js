import db from "../models/index";
import CommentService from "../Services/CommentService";

let handleGetAllCommentOfProductRate = async (request, response) => {
  try {
    let product = request.params.id;
    console.log("id: " + product);
    let Comment = await CommentService.getAllCommentOfProductRate(product);
    return response.status(200).json(Comment);
  } catch (e) {
    response.status(500).json(e);
  }
};
let handleAddComment = async (request, response) => {
  try {
    let Comment = await CommentService.addComment(request.body);
    return response.status(200).json(Comment);
  } catch (error) {
    return response.status(500).json(error);
  }
};
let handleUpdateComment = async (request, response) => {
  try {
    let Comment = await CommentService.updateComment(request.body);
    return response.status(200).json(Comment);
  } catch (error) {
    return response.status(400).json(error);
  }
};
let handleDeleteComment = async (request, response) => {
  try {
    let commentId = request.params.id;
    let comment = await CommentService.deleteComment(commentId);
    return response.status(200).json(comment);
  } catch (error) {
    return response.status(400).json(error);
  }
};
module.exports = {
  handleGetAllCommentOfProductRate,
  handleUpdateComment,
  handleAddComment,
  handleDeleteComment,
};
