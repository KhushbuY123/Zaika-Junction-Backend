import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { key, contentType } = req.body;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Expires: 60,
    ContentType: contentType,
  };

  try {
    const url = await s3.getSignedUrlPromise('putObject', params);
    return res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not generate URL' });
  }
}
