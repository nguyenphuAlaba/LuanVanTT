import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
require("dotenv").config();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

var salt = bcrypt.genSaltSync(10);
var cloudinary = require("cloudinary").v2;

let createAtribute = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        let checkProduct = await db.Product.findAll({
          where: { id: data.product_id },
          raw: false,
          nest: true,
        });
        if (checkProduct) {
          let checkAttribute = await db.Attribute.findOne({
            where: { name: data.name, product_id: data.product_id },
            raw: false,
            nest: true,
          });
          if (checkAttribute) {
            resolve({
              errCode: 1,
              errMessage: "Your Attribute has already been",
            });
          } else {
            await db.Attribute.create({
              name: data.name,
              product_id: data.product_id,
            });
            resolve({
              errCode: 0,
              errMessage: "Attribute has been created",
            });
          }
        } else {
          resolve({
            errCode: 2,
            errMessage: "Cann't find your product",
          });
        }
      } else {
        resolve({
          errCode: 3,
          errMessage: "Missing required attribute",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
// let updateAttribute = (data) => {
//   return new Promise(async( resolve, reject) => {
//     try{
//       if(data)
//       {
//       let attribute = await db.Attribute.findAll({
//         where:{product_id: data.product_id},
//         raw: false,
//         nest:true,
//       })
//       if(attribute){

//       }
//       else{

//       }
//       }
//     }
//     catch (error){
//       reject(error)
//     }
//   }
// }
module.exports = {
  createAtribute,
};
