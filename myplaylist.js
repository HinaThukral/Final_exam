const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynObj = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
var myarray = [];
var mytype = [];

module.exports.myplaylist = function(event, context, callback){
  let params = {
    TableName : "minibox"
  };
  
  dynObj.scan(params, function(err, data){
    if (err) 
       callback(err, null);
    else
       callback(null, data);
    for(let i = 0; i < data.Items.length; i++)
    {
      myarray.push(data.Items[i].fileName);
      mytype.push(data.Items[i].Type);
      callback(myarray.indexOf(data.Items[i].fileName));

    }
    console.log(mytype);
  });
  
  if(myarray.indexOf(event.fileName) > -1){

  	if(mytype[myarray.indexOf(event.fileName)] == "ObjectCreated:Put"){

    let params = {
      TableName : "mysongs",
      Item : {
        "fileName" : event.fileName
      }
      
    };
    dynObj.put(params, function(err, data){
      callback(err, "added");
    });
  }
 }
}