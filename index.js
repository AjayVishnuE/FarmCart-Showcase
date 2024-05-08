const apiUrl = 'https://ajayvishnu.pythonanywhere.com/api/downloadcount/getpost/';
const updateUrlBase = 'https://ajayvishnu.pythonanywhere.com/api/downloadcount/download-count/';

document.addEventListener('DOMContentLoaded', () => {
    fetchDownloadCount();
});

async function fetchDownloadCount() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const downloadCount = data[0].quantity; // Assuming the API always returns an array with at least one object
        const downloadId = data[0].id;

        document.getElementById('download-count').textContent = downloadCount;
        document.getElementById('download-btn').onclick = () => downloadFile(downloadId, downloadCount);
    } catch (error) {
        console.error('Failed to fetch download count:', error);
    }
}

async function downloadFile(downloadId, currentCount) {
    const newCount = currentCount + 1;
    try {
        // Update the download count
        const response = await fetch(`${updateUrlBase}${downloadId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newCount })
        });

        if (response.ok) {
            document.getElementById('download-count').textContent = newCount;
        } else {
            throw new Error('Failed to update the download count');
        }

        // Trigger the file download
        const a = document.createElement('a');
        a.href = 'FarmCart.apk'; // Adjust the path if necessary
        a.download = 'FarmCart.apk';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    } catch (error) {
        console.error('Error during download or count update:', error);
    }
}
