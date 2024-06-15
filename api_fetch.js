// Chatbase API: 924177b4-7b18-4a13-ad11-eff8b7b4ff7b
export const fetchChatbaseResponse = async (setResponse, setError, msg) => {
    const api = "924177b4-7b18-4a13-ad11-eff8b7b4ff7b";
    try {
      const res = await fetch('https://www.chatbase.co/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 確保內容類型為 JSON
          'Authorization': `Bearer ${api}`
        },
        body: JSON.stringify({
          messages: [
            { content: msg, role: 'user' }
          ],
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
    } catch (err) {
      setError(err.message);
    }
};
  