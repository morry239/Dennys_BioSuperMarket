import {Client as Client} from '@notionhq/client'; 
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer';

const NOTION_CLIENT = new Client({auth:process.env.NOTION_KEY})
const DATABASE_ID = process.env.NOTION_DATABASE_ID

async function getDatabaseData(client,databaseId){
  const response = await client.databases.query({
    database_id: databaseId,
  })
  console.log(response)
  const results = response.results;
  const { id } = results[Math.floor(Math.random() * results.length)];

  const quoteResponse = await NOTION_CLIENT.pages.retrieve({
    page_id: id,
  });

  const quote = quoteResponse.properties.Quote.title[0].plain_text;
  const url = quoteResponse.url;

}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
      user: 'madrefiumevillaggio2984@gmail.com',
      pass: 'iushsqxrobwwvzqd',
  },
});

transporter.sendMail({
from: '"madrefiumevillaggio2984@gmail.com" ',
to: "katedrala.sv.vitafvltava4512@gmail.com",
subject: "test 30.01.23",
text: "test test ",
html: "<b>test test </b>" + getDatabaseData(quote) + "<b>end</b>",
}).then(info=>{
  console.log({info});
}).catch(console.error);

    
//iushsqxrobwwvzqd -- app pwd
//database 40802897fefc469f8f9e17db48239321
//token secret_4sbIAcIS0qkJInBhIiKpzyZ6g3ebdKOHzV4uFLbBd1I
