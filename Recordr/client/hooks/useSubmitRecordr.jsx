import { useState } from 'react';
import { useSuccess } from '../utils/SuccessContext';


const useSubmitRecordr = async ({ transcription }) => {
    const { setSuccess } = useSuccess();
    const [loading, setLoading] = useState(false);

    const submitTranscription = async (transcription) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/createNewNote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transcription }),
            });

            if (!response.ok) {
                throw new Error('Failed to save note');
            }

            const data = await response.json();
            setLoading(false);
            return data;

        } catch (error) {
            console.error('Error saving note:', error);
        }
    }

export default useSubmitRecordr;