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
            return {
                status: 'success',
                message: `${data.message}`
            }
        } else {
            return {
                status: 'failed',
                message: 'Saving Policy Failed'
            }
        }
        } catch (error) {
            return {
            status: 'error',
            message: `error ${error.message}`
            }
        }
    }