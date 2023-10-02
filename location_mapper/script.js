let data = {};

function loadData() {
    const jsonDataElement = document.getElementById('jsonData');
    jsonDataElement.value = JSON.stringify(data, null, 4);
}

function addItem() {
    const poiName = document.getElementById('poiName').value;
    const location = document.getElementById('location').value;
    const key = document.getElementById('key').value;
    const itemName = document.getElementById('itemName').value;
    const itemValue = Number(document.getElementById('itemValue').value);
    const contributorsInput = document.getElementById('contributors');
    const contributorsStr = contributorsInput.value; // Get contributors string

    // Save the contributor string to local storage
    localStorage.setItem('contributors', contributorsStr);

    if (!data[poiName]) {
        data[poiName] = { location: location, buy: {}, sell: {}, contributors: [] };
    }

    data[poiName][key][itemName] = itemValue;

    // If contributorsStr is not empty, split it into an array and set it to the data object
    if (contributorsStr.trim() !== "") {
        // Update to keep all contributor items in one list within the contributor list
        data[poiName].contributors = [contributorsStr.split(', ')];
    }

    if (itemValue === 0) {
        delete data[poiName][key][itemName];
    }

    loadData();
}

document.addEventListener('DOMContentLoaded', (event) => {
    // … your existing code

    // Load the contributor input from local storage and set it to the input field
    const contributorsStr = localStorage.getItem('contributors') || '';
    document.getElementById('contributors').value = contributorsStr;

    // … your existing code
});

function exportJSON() {
    const jsonDataElement = document.getElementById('jsonData');
    jsonDataElement.select();
    document.execCommand('copy');
    alert("JSON data copied to clipboard!");
}

function removePOI() {
    const poiNameToRemove = document.getElementById('removePOIName').value;
    if (data[poiNameToRemove]) {
        delete data[poiNameToRemove];
        loadData(); // Reloads the JSON in the textarea
        alert(`${poiNameToRemove} removed successfully!`);
    } else {
        alert(`${poiNameToRemove} does not exist!`);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    let modal = document.getElementById('myModal');
    let span = document.getElementsByClassName('close')[0];

    // Open the modal
    modal.style.display = 'block';

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});

// function exportJSON() {
//     const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = 'data.json';
//     a.click();
// }

// Load data when the page loads
loadData();
