// Service for Admin
export async function addAdminData(formData) {
    try {
        const response = await fetch(`/api/admin/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error adding data: ${errorData.message || 'Unknown error'}`);
            return { success: false, message: errorData.message || 'Unknown error' };
        }

        const result = await response.json();
        return result;
    } catch (e) {
        console.error(`Error in addData: ${e.message}`);
        return { success: false, message: e.message };
    }
}

export async function getAdminData() {
    try {
        const response = await fetch(`/api/admin/get`, {
            method: 'GET'
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error getting data: ${errorData.message || 'Unknown error'}`);
            return { success: false, message: errorData.message || 'Unknown error' };
        }

        const result = await response.json();
        return result;
    } catch (e) {
        console.error(`Error in getAdminData: ${e.message}`);
        return { success: false, message: e.message };
    }
}

// Service for Registration
export async function addRegistrationData(formData) {
    try {
        const response = await fetch(`/api/registration/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error adding data: ${errorData.message || 'Unknown error'}`);
            return { success: false, message: errorData.message || 'Unknown error' };
        }

        const result = await response.json();
        return result;
    } catch (e) {
        console.error(`Error in addData: ${e.message}`);
        return { success: false, message: e.message };
    }
}

export async function getRegistrationData() {
    try {
        const response = await fetch(`/api/registration/get`, {
            method: 'GET'
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error getting data: ${errorData.message || 'Unknown error'}`);
            return { success: false, message: errorData.message || 'Unknown error' };
        }

        const result = await response.json();
        return result;
    } catch (e) {
        console.error(`Error in getRegistrationData: ${e.message}`);
        return { success: false, message: e.message };
    }
}


// Service for Payments

export async function addPaymentData(formData) {
    try {
        const response = await fetch(`/api/payment/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error adding data: ${errorData.message || 'Unknown error'}`);
            return { success: false, message: errorData.message || 'Unknown error' };
        }

        const result = await response.json();
        return result;
    } catch (e) {
        console.error(`Error in addData: ${e.message}`);
        return { success: false, message: e.message };
    }
}

