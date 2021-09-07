# Serverless api

## About this Project

_"The objective of this project is to exercise some serverless concepts as part of the [Ignite program](https://rocketseat.com.br/ignite). Here, the client can use the api to generate the Ignite certificate."_

## Why?

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

Email-me: harrisonhenrisn@gmail.com

Connect with me at [LinkedIn](https://linkedin.com/in/harrison-henri-dos-santos-nascimento).

Also, you can use this Project as you wish, be for study, be for make improvements or earn money with it!

It's free!

## Install

Clone the repo using

```
$ git clone https://github.com/HarrisonHenri/serverless-api.git
```

```
$ cd serverless-api
```

Install all the required dependencies

```
$ yarn
```

Install the dynamodb locally

```
$ serverless dynamodb install
```

Then execute

```
$ yarn dev
```

and

```
$ yarn dynamo:start
```

## Built With

- [Aws API Gateway](https://aws.amazon.com/pt/api-gateway/)
- [Aws Lambda](https://aws.amazon.com/pt/lambda/)
- [Aws S3](https://aws.amazon.com/pt/s3/)
- [Serverless](https://www.serverless.com/)
- [Dynamodb](https://aws.amazon.com/pt/dynamodb/) 

## Demo

You can try out the api using:

```
curl --request POST \
  --url https://hj02ialjo0.execute-api.sa-east-1.amazonaws.com/dev/generate-certificate \
  --header 'Content-Type: application/json' \
  --data '{
	"id": "36ab7fda-2e86-4a63-983d-73492c93ac03",
	"grade": 10,
	"name": "Biruleibi"
}'
```

or to validate a certificate:

```
curl --request GET \
  --url https://hj02ialjo0.execute-api.sa-east-1.amazonaws.com/dev/verify-certificate/36ab7fda-2e86-4a63-983d-73492c93ac03
```

## Contributing

You can send how many PR's do you want, I'll be glad to analyse and accept them! I am also avaliable if you have any question about the project :).

Email-me: harrisonhenrisn@gmail.com

Connect with me at [LinkedIn](https://linkedin.com/in/harrison-henri-dos-santos-nascimento-a6ba33112).

Thank you!