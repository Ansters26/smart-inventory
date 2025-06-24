const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    sku:{
        type:String,
        unique:true
    },
    quantity : Number,
    threshold : Number,
    price : Number,
    supplier : String
},{timestamps : true});

productSchema.pre("save", function (next) {
  if (!this.sku) {
    const cleanName = this.name.toUpperCase().replace(/[^A-Z0-9 ]/g, "").replace(/\s+/g, "-");
    this.sku = `SKU-${cleanName}-${Date.now()}`;
  }
  next();
});

const product =  mongoose.model('Product',productSchema);
module.exports = product;