export const handleSavePolicy = async (policyType, settings) => {
    try {
        const response = await fetch('/api/savePolicy', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ policyType, settings }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
        } else {
            console.error('Failed to save settings');
        }
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }