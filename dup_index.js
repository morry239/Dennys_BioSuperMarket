import {Client as Client} from '@notionhq/client'; 
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import Handlebars from "Handlebars";
import express from "express";
const app = express();
import http from 'http';

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

Handlebars.registerHelper('json', function (content) {
  return JSON.stringify(content);
});

const mailContent = `<p><i>${quote}</i></p>`;


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
      user: 'MYEMAIL',
      pass: 'MYAPPPWD',
  },
});

transporter.verify((error, success) => {
  if (error) console.error(error);
  console.log("Server is ready to take our messages");
});

transporter.use('compile',hbs({
  viewEngine: {
    extname: '.hbs',
    layoutsDir: 'views/',
    defaultLayout: false,
    partialsDir: 'views/'},
  viewPath: './views/',
  extName:'.hbs'
}));


const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${4000}`);
});

app.post('/send-email', async(req,res) => {
  const quoted = [{msg: quote}]
  try{
    transporter.sendMail({
    from: '"MYEMAIL" ',
    to: "MYSECONDEMAIL",
    subject: "test Carnival",
    text: "test test ",
    template: 'email_template',
    context: {
      name: 'Elsa Morante', quoted: quoted,
      }
    }, () => {
       res.status(200).send('Email sent')
    })
  } catch {
    return res.status(400).send('Email bounced')
  }
})

















    
