let savedResults = []; // Temporary storage

const EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

function cleanExpiredResults() {
    const now = Date.now();
    savedResults = savedResults.filter(result => now - result.timestamp < EXPIRATION_TIME);
}

export default function handler(req, res) {
    cleanExpiredResults()

    if (req.method === 'POST') {
        const { errorMessages, successMessages } = req.body;
        if (!errorMessages || !successMessages) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const resultData = {
            errorMessages,
            successMessages,
            timestamp: Date.now(),
        };

        savedResults.push(resultData); // Add to the in-memory storage
        return res.status(200).json({ message: 'Results saved successfully' });

    } else if (req.method === 'GET') {
        return res.status(200).json(savedResults); // Return the saved results
        
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}