import { useState } from 'react';
import { useSuccess } from '../utils/SuccessContext';


const useSubmitRecordr = async ({ transcription }) => {
    const { setSuccess } = useSuccess();
    const { setLoading } = useLoading();

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
            setSuccess(true);
            return data;

        } catch (error) {
            console.error('Error saving note:', error);
            setLoading(false);
        }
    }
    return { submitTranscription, loading, error };
};

export default useSubmitRecordr;