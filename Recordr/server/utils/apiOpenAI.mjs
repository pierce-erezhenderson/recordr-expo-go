import OpenAI from 'openai';
import 'dotenv/config';

// const transcription = "on Friday the 13th I picked up the knobs and helped them research rugs 1.5 hours who's that"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function openAICompletion(transcription) {
    try{
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    "role": "system",
                    "content": `You are a helpful assistant designed to process text input for creating an invoice note. When given a text description of an invoice entry, extract the relevant information and respond in the following JSON format:
                    
                        date: "YYYY-MM-DD",
                        hours: X.XX,
                        client: "Client Name",
                        details: "Task details"

                    Clients may be individuals or companies. If no client provided, return the following for the client key:
                    
                        client: ""

                    The time now is ${currentDate}. Unless it is obvious or noted by the user that the invoice note is documenting before 2024, please default to 2024. If "yesterday" is mentioned, assume it is the day before the current date.
                    Details should be a brief description of the task, please do not include articles (e.g. "the", "a", "an") or first-person pronouns (e.g. "I", "me"). You should always use commas to separate details. If a location is mentioned, always mention it first in the details.
                    
                    Ensure the JSON is correctly structured and includes all necessary information without any additional characters or variations.`
                },
                { 
                    "role": "user", 
                    "content": transcription
                },
            ],
            model: "gpt-4o-mini",
        });
        // console.log("OpenAI response:", JSON.stringify(chatCompletion.choices[0].message, null, 2));
        let content = chatCompletion.choices[0].message.content;
        
        // content = content.replace(/^["']|["']$/g, '').replace(/\\/g, ''); // Remove any surrounding quotes and escape characters
        
        console.log("Processed OpenAI response:", content);
        return content;
        
        // Attempt to parse the JSON to ensure it's valid
        // try {
        //     JSON.parse(content);
        //     return content;
        // } catch (parseError) {
        //     console.error("Failed to parse OpenAI response as JSON:", parseError);
        //     throw new Error("Invalid JSON response from OpenAI");
        // }

    } catch (error) {
        console.error('Error connecting to OpenAI:', error.message);
        throw error; // Re-throw the error for proper handling
    }
};


// openAICompletion(transcription);
// console.log("transcription:", transcription);