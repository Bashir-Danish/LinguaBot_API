import { OpenAIApi, Configuration } from "openai";
import { config } from "dotenv";
import Message from "../model/messages.js";
import { catchAsync } from "../middleware.js";

config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);


export const translate = catchAsync(async (req, res) => {
  const { 
    text
  } = req.body;


  const chatCompletion = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: 'user', content: text }],
  });

  res.status(200).send({
    translatedText:chatCompletion.data.choices[0].message.content,
  });
});

export const sendMsg = catchAsync(async (req, res) => {
  const { 
     userId ,
    newMessage,
    chatStory
  } = req.body;

  const chatCompletion = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: chatStory,
  });


  await Message.create({
    user: true,
    message: newMessage,
    userId: userId,
  });
  let botMsg = await Message.create({
    user: false,
    message: chatCompletion.data.choices[0].message.content,
    userId: userId,
  });
  res.status(201).send({
    botMsg,
  });
});

export const resetChat = catchAsync(async (req, res) => {
  const { userId } = req.body;
  await Message.deleteMany({ userId: userId });
  res.status(200).send({
    message:'successfully deleted'
  });
});
