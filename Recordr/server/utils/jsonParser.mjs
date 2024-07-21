export function parseMessageFromCompletion(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        if (typeof data === 'object' && data !== null) {
            return data;
        } else {
            throw new Error('Parsed data is not an object');
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw error;
    }
}