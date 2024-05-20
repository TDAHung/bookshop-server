import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AwsService {
    private readonly s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        }
    });

    async uploadFileToPublicBucket(
        path: string,
        { file, file_name }: { file: Express.Multer.File; file_name: string },
    ) {
        const bucket_name = process.env.AWS_S3_BUCKET_NAME;
        const key = `${path}/${Date.now().toString()}-${file_name}`;
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: bucket_name,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
                ContentLength: file.size,
            }),
        );

        return `https://${bucket_name}.s3.amazonaws.com/${key}`;
    }

    async deleteFileFromPublicBucket(key: string): Promise<void> {
        await this.s3Client.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
            }),
        );
    }
}
