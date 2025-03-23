// ✅ Data Fetch Karne Ka Function
async function fetchRecords() {
    try {
        console.log('🟠 Fetching Records...'); // Debugging Log
        const response = await fetch('http://localhost:3000/api/records');
        if (!response.ok) throw new Error('Failed to fetch records');

        const data = await response.json();
        console.log('🟢 Fetched Data:', data);

        const tableBody = document.getElementById('recordsTableBody');
        tableBody.innerHTML = ''; // Table clear karna

        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="3">No Records Found</td></tr>`;
            return;
        }

        data.forEach(record => {
            const row = document.createElement('tr');

            const userIdCell = document.createElement('td');
            userIdCell.textContent = record.userId;
            row.appendChild(userIdCell);

            const entryTimeCell = document.createElement('td');
            entryTimeCell.textContent = record.entryTime 
                ? new Date(record.entryTime).toLocaleString() 
                : 'N/A';
            row.appendChild(entryTimeCell);

            const exitTimeCell = document.createElement('td');
            exitTimeCell.textContent = record.exitTime 
                ? new Date(record.exitTime).toLocaleString() 
                : 'N/A';
            row.appendChild(exitTimeCell);

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('❌ Error fetching records:', error);
        document.getElementById('responseMessage').innerText = 'Error fetching records.';
    }
}

// ✅ Entry Recording
async function recordEntry() {
    const userId = document.getElementById('userIdInput').value.trim();

    if (!userId) {
        document.getElementById('responseMessage').innerText = 'Please enter a valid User ID.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/records/entry', { // ✅ Correct Endpoint Path
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });

        const result = await response.json();
        document.getElementById('responseMessage').innerText = result.message;

        await fetchRecords(); // ✅ Data Table ko Refresh karne ke liye
    } catch (error) {
        console.error('❌ Error recording entry:', error);
        document.getElementById('responseMessage').innerText = 'Error recording entry.';
    }
}

// ✅ Exit Recording
async function recordExit() {
    const userId = document.getElementById('userIdInput').value.trim();

    if (!userId) {
        document.getElementById('responseMessage').innerText = 'Please enter a valid User ID.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/records/exit', { // ✅ Correct Endpoint Path
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });

        const result = await response.json();
        document.getElementById('responseMessage').innerText = result.message;

        await fetchRecords(); // ✅ Data Table ko Refresh karne ke liye
    } catch (error) {
        console.error('❌ Error recording exit:', error);
        document.getElementById('responseMessage').innerText = 'Error recording exit.';
    }
}

// ✅ Page Load Hone Par Data Auto Fetch
window.onload = () => {
    fetchRecords();

    // ✅ Ensure Button Click Events Are Attached Only Once
    document.getElementById('entryBtn').onclick = recordEntry;
    document.getElementById('exitBtn').onclick = recordExit;
};
