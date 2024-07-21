import { speechToText } from '../utils/apiGoogleSTT.mjs';
import { openAICompletion } from '../utils/apiOpenAI.mjs';
import { parseMessageFromCompletion } from '../utils/jsonParser.mjs';

let audioChunks = [];

export const createRecordrNote = async (req, res) => {
    try {
        const { audio, isLastChunk } = req.body;
        
        if (!audio) {
          return res.status(400).json({ error: 'No audio data provided' });
        }

        audioChunks.push(Buffer.from(audio, 'base64'));
        
        const fullAudio = Buffer.concat(audioChunks);
        const transcription = await speechToText(fullAudio);
        const response = await openAICompletion(transcription);

        audioChunks = [];
            
        res.json({ response });

    } catch (error) {
        console.error('Error recording:', error);
        res.status(500).json({ error: 'Failed to record' });
    }
};
