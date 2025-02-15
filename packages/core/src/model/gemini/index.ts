// import config from "../../config";

class Gemini {
  public apiUrl: string;
  constructor(apiKey: string) {
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  }

  public async generateResponse(prompt: string) {
    const response = await fetch(this.apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });
    const data = await response.json();
    return data.candidates[0].content;
  }
}

export default Gemini;
