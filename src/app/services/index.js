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

// CRUD Operation for get, add, update and delete for Admin

export async function login(formData) {
    try {
        const response = await fetch(`/api/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error logging in: ${errorData.message || 'Unknown error'}`);
            return { success: false, message: errorData.message || 'Unknown error' };
        }

        const result = await response.json();
        return result;
    } catch (e) {
        console.error(`Error in login: ${e.message}`);
        return { success: false, message: e.message };
    }
}

export async function addData(currentTab, formData) {
    try {
        const response = await fetch(`/api/${currentTab}/add`, {
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
        console.log(result)
        return result;
    } catch (e) {
        console.error(`Error in addData: ${e.message}`);
        return { success: false, message: e.message };
    }
}

export async function getData(currentTab) {
    try {
        const response = await fetch(`/${currentTab}/get`, {
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
        console.error(`Error in getData: ${e.message}`);
        return { success: false, message: e.message };
    }
}

export async function updateData(currentTab, formData) {
    try {
        const response = await fetch(`/api/${currentTab}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error updating data: ${errorData.message || 'Unknown error'}`);
            return { success: false, message: errorData.message || 'Unknown error' };
        }

        const result = await response.json();
        return result;
    } catch (e) {
        console.error(`Error in updateData: ${e.message}`);
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

