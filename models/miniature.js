"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const miniSchema=new Schema({
    id:String,
    nombre:String,
    faccion:String,
    cantidad:String,
    foto:String,

});

const Miniature = mongoose.model('miniature',miniSchema);

module.exports=Miniature;