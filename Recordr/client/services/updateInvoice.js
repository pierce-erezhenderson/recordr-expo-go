import { useState } from 'react';
import { useSuccess } from '../utils/SuccessContext';
import { useLoading } from '../utils/LoadingContext';

const useSubmitRecordr = () => {
    const { setSuccess } = useSuccess();
    const { setLoading } = useLoading();
    const [error, setError] = useState(null);

    const submitTranscription = async (transcription) => {
        setLoading(true);
        setError(null);
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
            setSuccess(true);
            return data;
        } catch (error) {
            console.error('Error saving note:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { submitTranscription, error };
};

export default useSubmitRecordr;