import { NextResponse, NextRequest } from 'next/server'
import chalk from 'chalk'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '@/utils/r2'

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    console.log(chalk.yellow(`Generating an upload URL!`))
    const fileName = request.nextUrl.searchParams.get('file') || ''
    const fileType = request.nextUrl.searchParams.get('fileType') || ''

    const signedUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
      }),
      { expiresIn: 60 }
    )

    console.log(chalk.green(`Success generating upload URL!`, signedUrl))

    return NextResponse.json({ url: signedUrl })
  } catch (err) {
    console.log('error')
  }
}