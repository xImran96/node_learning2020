const path = require('path');
module.exports = {

    uploadDirProduct: path.join(__dirname, '../public/upload/products/'),
    uploadDirBrands: path.join(__dirname, '../public/upload/brands/'),

    isEmpty: function(obj){
        for(let key in obj){
                if(obj.hasOwnProperty(key)){;
                return false;
                }
        }
        return true;
    }

};