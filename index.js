import {Client as Client} from '@notionhq/client'; 
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer';

const NOTION_CLIENT = new Client({auth:process.env.NOTION_KEY})
const DATABASE_ID = process.env.NOTION_DATABASE_ID

async function getDatabaseData(client,databaseId){
  try{
    let results = []
    const response = await client.databases.query({
      database_id: databaseId,
    })
    console.log(response)
    results = [...results, ...response.results]
  
    let hasMore = response.has_more
    let nextCursor = response.next_cursor
  
    while(hasMore){
      const reaction = await client.databases.query
      ({
        database_id: databaseId,
        start_cursor: nextCursor,
      })
      results = [...results, ...reaction.results]
      hasMore = reaction.has_more
      nextCursor = reaction.next_cursor
    }
    return results
  } catch (error){
    console.error(error)
  }
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
      user: 'MYEMAIL',
      pass: 'MYAPPPWD',
  },
});

transporter.sendMail({
from: '"MYFIRSTMAIL" ',
to: "MYSECONDMAIL",
subject: "test 30.01.23",
text: "test test ",
html: "<b>test test </b>" + getDatabaseData(quote) + "<b>end</b>",
}).then(info=>{
  console.log({info});
}).catch(console.error);

    
