import { GoogleGenerativeAI } from '@google/generative-ai';

import { history, modelName } from '../../../constants/ai.constants';
import { GOOGLE_API_KEY } from '../config';

type contentResponse = {
  title: string | null;
  content: string | null;
};

export const splitContextTitle = (textResponse: string): contentResponse => {
  try {
    const parts = textResponse.split('---');

    if (parts.length < 3) {
      console.error('Invalid response format:', textResponse);
      return { title: null, content: null };
    }

    let title = parts[1].replace('Title: [', '').replace(']', '') || null;
    let content = parts[2].replace('Content: [', '').replace(']', '') || null;

    title = title.replace(/Title:\s*/i, '');
    content = content.replace(/Content:\s*/i, '');

    return { title: title, content: content };
  } catch (error) {
    console.error('Split content and title errors :', error);
    return { title: null, content: null };
  }
};

// Ham lay reponse cua AI
export const getAIResponse = async (content: string, style: string): Promise<contentResponse> => {
  try {
    const API_KEY: string = GOOGLE_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });

    // Thiết lập chat
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 1000, // Sl toekn tối đa
        temperature: 0.7, // Độ sáng tao của model
      },
    });

    const message = `Website Content: ${content}, Style: ${style}`;
    const result = await chat.sendMessage(message);

    // Tra về obj: {title, content}
    return splitContextTitle(result.response.text());
  } catch (error) {
    throw error;
  }
};
