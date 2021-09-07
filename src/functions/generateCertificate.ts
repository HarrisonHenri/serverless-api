import chromium from "chrome-aws-lambda"
import { APIGatewayProxyHandler } from "aws-lambda"
import path from "path"
import {readFileSync} from "fs"
import handlebars from 'handlebars'
import {S3} from 'aws-sdk'

import {document} from '../utils/dynamodbClient'
import dayjs from "dayjs"

interface ITemplate {
  id: string;
  name: string;
  grade: string;
  date: string;
  medal: string;
}

const compile = async (data:ITemplate) => {
  
  const filePath = path.join(process.cwd(), "src", "templates", "certificate.hbs");

  const html = readFileSync(filePath, "utf-8");

  return handlebars.compile(html)(data)
}

const generateCertificate = async (content:string) => {
  
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath
  })

  const page = await browser.newPage()
  await page.setContent(content)
   
  const pdf = await page.pdf({
    format: "a4",
    landscape: true,
    path: process.env.IS_OFFLINE ? "certificate.pdf": null,
    printBackground: true,
    preferCSSPageSize: true
  })

  await browser.close()

  return pdf
}


export const handle: APIGatewayProxyHandler = async (event) => {
  const { id, name, grade } = JSON.parse(event.body);

  const userAlreadyExists = await document.query({
    TableName: "users_certificates",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {":id": id}
  }).promise();

  if (!userAlreadyExists.Items[0]){
    await document.put({
      TableName: "users_certificates",
      Item: {
        id,
        name,
        grade
      }
    }).promise();
  }


  const medalPath = path.join(process.cwd(), "src", "templates", "selo.png");
  const medal = readFileSync(medalPath, "base64");

  const content = await compile({ id, name, grade, date: dayjs().format("DD/MM/YYYY"), medal})

  const pdf = await generateCertificate(content)

  const s3 = new S3()

  await s3.putObject({
    Bucket: "myserverlessapi",
    Key: `${id}.pdf`,
    ACL: "public-read",
    Body: pdf,
    ContentType: "application/pdf"
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificate successfully added",
      url: `https://myserverlessapi.s3.amazonaws.com/${id}.pdf`
    }),
    headers: {
      "Content-type": "application/json"
    }
  }
}