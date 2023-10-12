document.addEventListener("DOMContentLoaded", function() {
    
    // Attach event listener to the buy button
    document.getElementById('add_buy_item').addEventListener('click', function() {
        addItemToContainer('buy_container');
    });

    // Attach event listener to the sell button
    document.getElementById('add_sell_item').addEventListener('click', function() {
        addItemToContainer('sell_container');
    });

    document.getElementById('copy_to_clipboard').addEventListener('click', function() {
        const jsonData = compileDataToJson();
        copyToClipboard(jsonData);
    });
    
    document.getElementById('save_as_file').addEventListener('click', function() {
        const locationName = document.getElementById('location_name').value || 'location';
        const jsonData = compileDataToJson();
        saveToFile(`${locationName}.json`, jsonData);
    });
});

function addItemToContainer(containerId) {
    const container = document.getElementById(containerId);

    // Check and log the container in the console for debugging purposes
    console.log("Selected container:", container);

    // Create the div container for the commodity item
    const commodityDiv = document.createElement('div');
    commodityDiv.className = 'commodity-item';

    // Create the input for the commodity name
    const commodityNameInput = document.createElement('input');
    commodityNameInput.placeholder = 'commodity-name';
    
    // Create the input for the aUEC per unit
    const aUECInput = document.createElement('input');
    aUECInput.placeholder = 'aUEC-per-unit';
    aUECInput.type = 'number';

    const remove_item = document.createElement('button');
    remove_item.innerText = 'Remove';

    remove_item.addEventListener('click', function() {
        commodityDiv.remove();  // Remove the parent commodityDiv
    });

    // Append the inputs to the commodityDiv
    commodityDiv.appendChild(commodityNameInput);
    commodityDiv.appendChild(aUECInput);
    commodityDiv.appendChild(remove_item);

    // Insert the commodityDiv right after the container
    container.appendChild(commodityDiv, container.nextSibling);
}

function extractCommodities(containerId) {
    const container = document.getElementById(containerId);
    const items = container.querySelectorAll('.commodity-item');
    const data = {};

    items.forEach(item => {
        const name = item.querySelector('input[placeholder="commodity-name"]').value;
        const price = parseInt(item.querySelector('input[placeholder="aUEC-per-unit"]').value, 10);
        if (name && !isNaN(price)) {
            data[name] = price;
        }
    });

    return data;
}

function compileDataToJson() {
    const locationName = document.getElementById('location_name').value;
    const planet = document.getElementById('location_planet').value;
    const moon = document.getElementById('location_moon').value;

    let locationString;
    if (moon) { 
        locationString = `${planet} > ${moon} > ${locationName}`;
    } else {
        locationString = `${planet} > ${locationName}`;
    }
    
    const buyData = extractCommodities('buy_container');
    const sellData = extractCommodities('sell_container');

    const jsonData = {
        [locationName]: {
            location: locationString,
            buy: buyData,
            sell: sellData
        }
    };

    return JSON.stringify(jsonData, null, 4); // Beautified JSON string
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function saveToFile(filename, text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}