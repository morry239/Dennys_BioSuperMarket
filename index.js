import {Client as Client} from '@notionhq/client'; 
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

const NOTION_CLIENT = new Client({auth:process.env.NOTION_TOKEN})
const DATABASE_ID = process.env.NOTION_DATABASE_ID

const dbResponse = await NOTION_CLIENT.databases.query({
  database_id: DATABASE_ID,
});

let tasks = dbResponse.results;
let task = tasks[Math.floor(Math.random() * tasks.length)];

const quotePage = await NOTION_CLIENT.pages.retrieve({
  page_id:task.id,
});

const quote = quotePage.properties.Quote.title[0].plain_text;

console.log(quote);

const mailContent = `<p><i>${quote}</i></p>`;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
      user: 'madrefiumevillaggio2984@gmail.com',
      pass: 'imfexragjrlibpuh',
  },
});

transporter.use('compile',hbs({
  viewEngine: {
    extname: '.handlebars',
    layoutsDir: 'views/',
    defaultLayout: false,
    partialsDir: 'views/'},
  viewPath: './views/',
  extName:'.handlebars'
}));

transporter.sendMail({
from: '"madrefiumevillaggio2984@gmail.com" ',
to: "katedrala.sv.vitafvltava4512@gmail.com",
subject: "test Carnival",
text: "test test ",
template: 'test_confirmation',
html: "<b>test test </b>" + mailContent + "<b>end</b>", 
}).then(info=>{
  console.log({info});
}).catch(console.error);
















    
