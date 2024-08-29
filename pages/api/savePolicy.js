let policyData = {};
export default function handler(req, res) {

    if (req.method === 'POST') {
        const { policyType, settings } = req.body;
        policyData[policyType] = settings;
        res.status(200).json({ message: 'Settings saved successfully' });

    } else if (req.method === 'GET') {
        const { policyType } = req.query;
        const settings = policyData[policyType] || {};
        res.status(200).json(settings);
        
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}