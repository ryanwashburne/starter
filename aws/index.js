const AWS = require("aws-sdk");

class AWSClient {
  s3;
  bucketName;
  constructor({ region, accessKeyId, secretAccessKey, bucketName }) {
    this.bucketName = bucketName;
    this.s3 = new AWS.S3({
      region,
      accessKeyId,
      secretAccessKey,
    });
  }

  async getObject(key) {
    return await this.s3
      .getObject({
        Bucket: this.bucketName,
        Key: key,
      })
      .promise();
  }
}

module.exports = AWSClient;
