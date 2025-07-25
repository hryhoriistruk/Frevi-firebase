export const sendHelpRequest = async (userId, message) => {
    const response = await fetch('/api/assistance/send', {
        method: 'POST',
        body: JSON.stringify({ userId, message }),
    });
    return response.json();
};