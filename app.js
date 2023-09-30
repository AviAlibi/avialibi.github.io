// Assuming the JSON file is available at the same level as your HTML file
fetch('map.json')
    .then(response => response.json())
    .then(data => {
        let routes = findBestRoutes(data);
        displayRoutes(routes);
    })
    .catch(err => console.error("Error loading JSON: ", err));

function findBestRoutes(data) {
    let routes = [];
    for (let source in data) {
        let sourceData = data[source];
        for (let item in sourceData.buy) {
            let buyPrice = sourceData.buy[item];
            for (let destination in data) {
                if (destination === source) continue;
                let destinationData = data[destination];
                let sellPrice = destinationData.sell ? destinationData.sell[item] || 0 : 0;
                if (sellPrice > buyPrice) {
                    routes.push({
                        item: item,
                        source: source,
                        destination: destination,
                        profit: sellPrice - buyPrice
                    });
                }
            }
        }
    }
    // Sort routes by profit in descending order
    return routes.sort((a, b) => b.profit - a.profit);
}

function displayRoutes(routes) {
    let table = document.getElementById('routes');
    for (let route of routes) {
        let row = table.insertRow();
        row.insertCell().textContent = route.item;
        row.insertCell().textContent = route.source;
        row.insertCell().textContent = route.destination;
        row.insertCell().textContent = route.profit;
    }
}
