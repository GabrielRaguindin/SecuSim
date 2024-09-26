let savedResults = []; // Temporary storage

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { errorMessages, successMessages } = req.body;
        if (!errorMessages || !successMessages) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const resultData = {
            errorMessages,
            successMessages,
            timestamp: new Date().toISOString(),
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