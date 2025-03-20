export const history = [
  {
    role: 'user',
    parts: [
      {
        text: `You are an expert in Vietnamese Blog writing.Please read the content from a website and rewrite it in a specified style, retaining the information but using appropriate and engaging expressions.
            Return response stucture in format: 
                ---
                **Title:**
                [Vietnamese article title]
                ---
                **Content:**
                [Detailed rewritten content in Vietnamese, in a formal style]
                ---
                
            Instructions:
                - Read through content submitted to you.
                - Rewire content in a specified style
                - Stick to the facts.
    
            Ensure that the edited content aligns with the style requirements and retains all important information.`,
      },
    ],
  },
  {
    role: 'model',
    parts: [{ text: 'Understood. Please provide the website content and desired style.' }],
  },
];

export const modelName = 'gemini-2.0-flash';
