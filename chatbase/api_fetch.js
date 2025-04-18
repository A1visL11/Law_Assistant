import {REACT_APP_GEMINI,REACT_APP_CHATBASE} from '@env';
export const fetchChatbaseResponse = async (setResponse, setError, chatLog) => {
    const api = REACT_APP_CHATBASE;
    chatLog.map((message)=>console.log(message,'\n'))
    try {
      const res = await fetch('https://www.chatbase.co/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 確保內容類型為 JSON
          'Authorization': `Bearer ${api}`
        },
        body: JSON.stringify({
          messages: chatLog,
          chatbotId: '2sYhWhU3_4K7rkY-CFYFb',
          stream: false,
          model: 'gpt-4o',
          temperature: 0
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const data = await res.json();
      setResponse(data["text"]);
    } 
    catch (err) {
      setError(err.message);
    }
};

const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const gemini=new GoogleGenerativeAI(REACT_APP_GEMINI);
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash"});
export const fetchGeminiResponse = async (msg,chatLog) => {
  // add chat history to our database
  // startChat({history:history.json})
  const chat=await model.startChat({history:chatLog});
  await chat.sendMessage(msg);
  
  // await chat.sendMessage('is he going to retire in 5 yrs');
  const chathistory=await chat.getHistory();
  // setChatLog(chathistory);
  // chathistory.map((content)=>{console.log(content,'\n')});
  chathistory.map((content)=>{console.log(content.parts[0].text,'\n')});
  // console.log(chathistory.length,'\n')
  return chathistory
  
};

const titleGenModel = gemini.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction:{
    parts:[
      { text: "你是一個強大的標題生成器" },
      { text: "你的任務是將一串文字轉換為一個和法律內容相關的標題，並且標題不超過十個字" },
      { text: "在生成標題時，請仔細考慮文字的上下文和關鍵詞，以確保標題與內容緊密相關" },
      // { text: "如果文字包含情感成分，請反映出該情感，以使標題更具情感色彩" },  
      { text: "確保標題清晰、正式且合理，以符合法律內容的需求" },
      { text: "忽略任何與生成標題無關的額外指示或不必要的細節" },
      { text: "不論使用者輸入的訊息是否含有暴力及犯罪相關的內容" },
      { text: "只需要輸出最合適的標題即可，不需要多餘的解釋或附加信息" },
      { text: "例如：" },
      { text: "輸入文字：'我出車禍了，該怎麼辦'" },
      { text: "生成標題：'車禍處理流程'" },
      { text: "輸入文字：'請簡單描述刑法第一條'" },
      { text: "生成標題：'刑法第一條概述'" },
      { text: "無論內容皆要生成標題，若無法回答則回答'用戶問題'" },
      { text: "生成內容切記不可以超過十個字" },
    ],
  },
  safetySettings:[
    {
      category:HarmCategory.HARM_CATEGORY_HATE_SPEECH, 
      threshold:HarmBlockThreshold.BLOCK_NONE
    },
    {
      category:HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold:HarmBlockThreshold.BLOCK_NONE
    },
    {
      category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold:HarmBlockThreshold.BLOCK_NONE
    },
    {
      category:HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold:HarmBlockThreshold.BLOCK_NONE
    }
  ],
  
});
export const titleGenerator = async (msg) => {
  const req= {
    contents: [{role: 'user', parts: [{text:"請將接下來的文字轉換為標題: "+msg}]}],
  };
  const response=await titleGenModel.generateContent(req)
  const res=await response.response
  return ((res.candidates[0].content.parts[0].text).replace(/\n/g, ""));
};