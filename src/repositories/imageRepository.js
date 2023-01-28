const AWS = require("aws-sdk");
const config = require("../config");
const AppError = require("../errors/appError");

class ImageRepository {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.privateAccessKey,
    });
  }

  async uploadImage(name, image, type) {
    const extension = type.split("/")[1];
    const params = {
      Bucket: config.aws.s3BucketName,
      Key: `${name}.${extension}`,
      Body: image,
      ACL: "public-read",
    };

    try {
      await this.s3
        .headObject({ Bucket: params.Bucket, Key: params.Key })
        .promise();
      await this.s3
        .deleteObject({ Bucket: params.Bucket, Key: params.Key })
        .promise();
      console.log(`Archivo previo eliminado`);
    } catch (err) {
      if (err.code !== "NotFound") {
        throw new AppError(err.message, 502);
      }
    }

    try {
      const data = await this.s3.upload(params).promise();
      console.log(`######## Image Location: ${data.Location}`);
      return data.Location;
    } catch (err) {
      throw new AppError(err.message, 502);
    }
  }

  removeImage = async (name) => {
    const decodedUrl = decodeURIComponent(name);
    const fileName = decodedUrl.split("/").pop();
    console.log("Le llega name: ", fileName);
    try {
      const params = {
        Bucket: config.aws.s3BucketName,
        Key: fileName,
      };

      await this.s3.deleteObject(params).promise();
      console.log(`Image ${fileName} removed`);
    } catch (err) {
      throw new AppError(err.message, 502);
    }
  };
}

module.exports = ImageRepository;
