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

    if (!data[poiName]) {
        data[poiName] = { location: location, buy: {}, sell: {} };
    }


    data[poiName][key][itemName] = itemValue;

    // if the item is sold or bought for nothing, remove it, this is impossible
    if (itemValue === 0) {
        delete data[poiName][key][itemName];
    }
    loadData();
}


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

// function exportJSON() {
//     const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = 'data.json';
//     a.click();
// }

// Load data when the page loads
loadData();

