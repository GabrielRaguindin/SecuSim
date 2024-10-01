let savedResults = []; // Temporary storage

const EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

function cleanExpiredResults() {
    const now = Date.now();
    savedResults = savedResults.filter(result => now - result.timestamp < EXPIRATION_TIME);
}

function generateRandomId() {
    return Math.random().toString(36).slice(2, 11);
}

export default function handler(req, res) {
    cleanExpiredResults()

    if (req.method === 'POST') {
        const { errorMessages, successMessages } = req.body;
        if (!errorMessages || !successMessages) {
            return res.status(400).json({ message: 'Invalid data' });
        }

    let lastResultNumber = 0;
    if (savedResults.length > 0) {
        lastResultNumber = savedResults[savedResults.length - 1].resultNumber;
    }

        const resultData = {
            id: generateRandomId(),
            errorMessages,
            successMessages,
            timestamp: Date.now(),
            resultNumber: lastResultNumber + 1,
        };

        savedResults.push(resultData);
        return res.status(200).json({ message: 'Results saved successfully' });

    } else if (req.method === 'GET') {
        return res.status(200).json(savedResults);
        
    } else if (req.method === 'DELETE'){
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const initialLength = savedResults.length;
        savedResults = savedResults.filter(result => result.id !== id);

        if (savedResults.length === initialLength) {
            return res.status(404).json({ message: 'Result not found' });
        }

        return res.status(200).json({ message: 'Result deleted successfully' });
    }else {
        res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}