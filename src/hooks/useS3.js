import AWS from 'aws-sdk';
import {s3Config} from '../services/config/s3.config';
import {decode} from 'base64-arraybuffer';
import {S3} from 'aws-sdk';
// import {showMessage} from 'react-native-flash-message';

var fs = require('react-native-fs');
// upload to s3

const awsConfig = {
  accessKeyId: s3Config.ACCESS_KEY,
  secretAccessKey: s3Config.SECRET_KEY,
  region: s3Config.REGION,
  signatureVersion: 'v4',
  Bucket: s3Config.BUCKET_NAME,
};

const useS3 = () => {
  const uploadImageOnS3 = async (file, onSuccessCallBack) => {
    let fileName = new Date().getTime().toString();
    const s3bucket = new S3(awsConfig);
    let contentType = 'image/jpeg';
    let contentDeposition = 'inline;filename="' + fileName + '"';
    const base64 = await fs.readFile(file.path, 'base64');
    const arrayBuffer = decode(base64);
    s3bucket.createBucket(async () => {
      const params = {
        Bucket: awsConfig.Bucket,
        Key: fileName,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: contentType,
      };
      await s3bucket
        .upload(params)
        .promise()
        .then(data => {
          console.log(data.Location);
          onSuccessCallBack(data.Location);
        })
        .catch(err => {
          console.log(err);
          onSuccessCallBack(null);
        });
    });
  };

  return {
    uploadImageOnS3,
  };
};

export default useS3;
