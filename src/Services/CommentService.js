import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
require("dotenv").config();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

var salt = bcrypt.genSaltSync(10);
var cloudinary = require("cloudinary").v2;

let getAllCommentOfProductRate = (Product) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(Product);
      let Comment = await db.Comment.findAll({
        include: [
          { model: db.Product, as: "CommentProduct", where: { id: Product } },
          { model: db.User, as: "commentUser", attributes: ["fullname"] },
        ],
        raw: false,
        nest: true,
      });
      resolve(Comment);
    } catch (error) {
      reject(error);
    }
  });
};
let addComment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Comment.create({
        user_id: data.user_id,
        product_id: data.product_id,
        description: data.description,
        rate: data.rate,
        status: data.status,
      });
      resolve({
        errCode: 0,
        errMessage: "Has been add Comment",
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let updateComment = (comment) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fcomment = await db.Comment.findOne({
        where: { id: comment.id, user_id: comment.user_id },
        raw: false,
        nest: true,
      });
      if (fcomment) {
        fcomment.description = comment.description;
        fcomment.status = 1;
        fcomment.rate = comment.rate;

        await fcomment.save();
        resolve({
          errCode: 0,
          errMessage: "Update Comment Successfully",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Update comment failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteComment = (comment) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!comment) {
        resolve({
          errCode: 1,
          errMessage: "Missing id",
        });
      } else {
        let fcomment = await db.Comment.findOne({
          where: { id: comment },
        });
        if (!fcomment) {
          resolve({ errCode: 2, errMessage: "Cannot find Comment id" });
        } else {
          await db.Comment.destroy({
            where: { id: comment },
          });
          resolve({
            errCode: 0,
            errMessage: "Delete Comment Successfully",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAllCommentOfProductRate,
  addComment,
  updateComment,
  deleteComment,
};
