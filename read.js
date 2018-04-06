const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynObj = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();


module.exports.read = function(event, context, callback){
  let params = {
    TableName : 'minibox'
  };
  dynObj.scan(params, function(err, data){
    if(err){
        callback(err, null);
    }else{
        callback(null, data);
    }
  });
}
