const tank = ['D.Va', 'Doomfist', 'Orisa', 'Reinhardt', 'Roadhog', 'Sigma', 'Winston', 'Wrecking Ball', 'Zarya', 'Junker Queen', 'Rammatra'];
const dps = ['Ashe', 'Bastion', 'Cassidy', 'Echo', 'Genji', 'Hanzo', 'Junkrat', 'Mei', 'Pharah', 'Reaper', 'Sojourn', 'Soldier: 76', 'Sombra', 'Symmetra', 'Torbjorn', 'Tracer', 'Widowmaker'];
const support = ['Ana', 'Baptiste', 'Brigitte', 'Lucio', 'Mercy', 'Moira', 'Zenyatta', 'Kiriko', 'Illari', 'Lifeweaver'];

const countered_by = {
    'D.Va': ['Brigitte', 'Doomfist', 'Moira', 'Reaper', 'Roadhog', 'Sigma', 'Symmetra', 'Winston', 'Zarya'],
    'Doomfist': ['Ana', 'Ashe', 'Brigitte', 'Cassidy', 'Mei', 'Pharah', 'Roadhog'],
    'Junker Queen': ['Ana', 'Ashe', 'Baptiste', 'Cassidy', 'Pharah', 'Soldier: 76', 'Widowmaker', 'Zenyatta'],
    'Orisa': ['Ana', 'Ashe', 'Baptiste', 'D.Va', 'Echo', 'Hanzo', 'Kiriko', 'Pharah', 'Reaper', 'Sojourn', 'Sombra', 'Soldier: 76', 'Widowmaker', 'Zenyatta'],
    'Rammatra': ['Ana', 'Bastion', 'D.Va', 'Kiriko', 'Orisa', 'Roadhog', 'Symmetra', 'Tracer', 'Zenyatta'],
    'Reinhardt': ['Ana', 'Brigitte', 'Junkrat', 'Mei', 'Pharah', 'Reaper', 'Sombra', 'Tracer'],
    'Roadhog': ['Ana', 'Genji', 'Echo', 'Junkrat', 'Pharah', 'Reaper', 'Sombra', 'Tracer', 'Widowmaker'],
    'Sigma': ['Genji', 'Lucio', 'Moira', 'Sombra', 'Symmetra', 'Tracer', 'Zarya'],
    'Winston': ['Ana', 'Brigitte', 'Mei', 'Roadhog'],
    'Wrecking Ball': ['Ana', 'Brigitte', 'Mei', 'Roadhog', 'Torbjorn'],
    'Zarya': ['Ashe', 'Bastion', 'D.Va', 'Echo', 'Pharah', 'Widowmaker'],
    'Ashe': ['Doomfist', 'Echo', 'Genji', 'Reaper', 'Roadhog', 'Soldier: 76', 'Sombra', 'Tracer'],
    'Bastion': ['Ana', 'Genji', 'Junkrat', 'Pharah', 'Roadhog', 'Sombra', 'Tracer', 'Zarya'],
    'Cassidy': ['Ana', 'Ashe', 'Bastion', 'Genji', 'Hanzo', 'Widowmaker'],
    'Echo': ['Ana', 'Ashe', 'Baptiste', 'Cassidy', 'D.Va', 'Junker Queen', 'Moira', 'Reaper', 'Soldier: 76', 'Widowmaker', 'Zarya'],
    'Genji': ['Brigitte', 'Mei', 'Moira', 'Symmetra', 'Winston', 'Zarya'],
    'Hanzo': ['D.Va', 'Genji', 'Lucio', 'Moira', 'Pharah', 'Sombra', 'Tracer', 'Wrecking Ball'],
    'Junkrat': ['Ashe', 'D.Va', 'Cassidy', 'Echo', 'Genji', 'Lucio', 'Pharah', 'Reaper', 'Roadhog', 'Soldier: 76', 'Sombra', 'Tracer', 'Wrecking Ball'],
    'Mei': ['Echo', 'Pharah', 'Reaper', 'Sombra', 'Tracer'],
    'Pharah': ['Ana', 'Ashe', 'Baptiste', 'Cassidy', 'D.Va', 'Soldier: 76', 'Sombra', 'Widowmaker'],
    'Reaper': ['Ana', 'Ashe', 'Echo', 'Junkrat', 'Pharah', 'Rammatra', 'Widowmaker'],
    'Sojourn': ['D.Va', 'Lucio', 'Orisa', 'Reaper', 'Tracer', 'Sigma', 'Sombra', 'Zarya'],
    'Soldier: 76': ['Ana', 'Cassidy', 'D.Va', 'Junkrat', 'Reaper', 'Roadhog', 'Widowmaker'],
    'Sombra': ['Ana', 'Brigitte', 'Junkrat', 'Mei', 'Moira', 'Pharah', 'Winston', 'Zarya'],
    'Symmetra': ['Echo', 'Junkrat', 'Pharah', 'Reaper', 'Sombra', 'Tracer', 'Winston'],
    'Torbjorn': ['Ana', 'Bastion', 'Junkrat', 'Pharah', 'Sombra', 'Widowmaker'],
    'Tracer': ['Ana', 'Junkrat', 'Pharah', 'Sombra', 'Widowmaker'],
    'Widowmaker': ['D.Va', 'Genji', 'Sombra', 'Tracer', 'Winston'],
    'Ana': ['Echo', 'Genji', 'Lucio', 'Moira', 'Pharah', 'Sombra', 'Tracer'],
    'Baptiste': ['Ana', 'Echo', 'Genji', 'Hanzo', 'Lucio', 'Pharah', 'Reaper', 'Roadhog', 'Sombra', 'Tracer'],
    'Brigitte': ['Cassidy', 'Bastion', 'D.Va', 'Echo', 'Genji', 'Junkrat', 'Moira', 'Pharah', 'Sombra', 'Tracer', 'Widowmaker'],
    'Illari': ['Baptiste', 'D.Va', 'Genji', 'Lifeweaver', 'Orisa', 'Sombra'],
    'Kiriko': ['Ana', 'Ashe', 'Baptiste', 'Cassidy', 'Doomfist', 'Genji', 'Moira', 'Reaper', 'Sojourn', 'Tracer', 'Widowmaker', 'Wrecking Ball'],
    'Lifeweaver': ['Mercy', 'Moira', 'Rammatra', 'Roadhog', 'Sombra', 'Widowmaker'],
    'Lucio': ['Ashe', 'Cassidy', 'Moira', 'Soldier: 76', 'Symmetra', 'Torbjorn', 'Winston', 'Zarya'],
    'Mercy': ['Ana', 'Ashe', 'Baptiste', 'Cassidy', 'Genji', 'Moira', 'Reaper', 'Roadhog', 'Soldier: 76', 'Winston', 'Wrecking Ball'],
    'Moira': ['Ana', 'Ashe', 'Echo', 'Genji', 'Pharah', 'Reaper', 'Sojourn', 'Sombra', 'Soldier: 76', 'Widowmaker'],
    'Zenyatta': ['D.Va', 'Echo', 'Genji', 'Pharah', 'Reaper', 'Sigma', 'Tracer', 'Widowmaker'],
}

const pre_counters = {
    'Brigitte': ['D.Va', 'Doomfist', 'Reinhardt', 'Winston', 'Wrecking Ball', 'Genji', 'Sombra'],
    'Doomfist': ['D.Va', 'Ashe', 'Kiriko'],
    'Moira': ['D.Va', 'Sigma', 'Echo', 'Genji', 'Hanzo', 'Sombra', 'Ana', 'Brigitte', 'Kiriko', 'Lifeweaver', 'Lucio', 'Mercy'],
    'Reaper': ['D.Va', 'Orisa', 'Reinhardt', 'Roadhog', 'Ashe', 'Echo', 'Junkrat', 'Mei', 'Sojourn', 'Soldier: 76', 'Symmetra', 'Baptiste', 'Kiriko', 'Mercy', 'Moira', 'Zenyatta'],
    'Roadhog': ['D.Va', 'Doomfist', 'Rammatra', 'Winston', 'Wrecking Ball', 'Ashe', 'Bastion', 'Junkrat', 'Soldier: 76', 'Baptiste', 'Lifeweaver', 'Mercy'],
    'Sigma': ['D.Va', 'Sojourn', 'Zenyatta'],
    'Symmetra': ['D.Va', 'Rammatra', 'Sigma', 'Genji', 'Lucio'],
    'Winston': ['D.Va', 'Genji', 'Sombra', 'Symmetra', 'Widowmaker', 'Lucio', 'Mercy'],
    'Zarya': ['D.Va', 'Sigma', 'Bastion', 'Echo', 'Genji', 'Sojourn', 'Sombra', 'Lucio'],
    'Ana': ['Doomfist', 'Junker Queen', 'Orisa', 'Rammatra', 'Reinhardt', 'Roadhog', 'Winston', 'Wrecking Ball', 'Bastion', 'Cassidy', 'Echo', 'Pharah', 'Reaper', 'Soldier: 76', 'Sombra', 'Torbjorn', 'Tracer', 'Baptiste', 'Kiriko', 'Mercy', 'Moira'],
    'Ashe': ['Doomfist', 'Junker Queen', 'Orisa', 'Zarya', 'Cassidy', 'Echo', 'Junkrat', 'Pharah', 'Reaper', 'Kiriko', 'Lucio', 'Mercy', 'Moira'],
    'Cassidy': ['Doomfist', 'Junker Queen', 'Echo', 'Junkrat', 'Pharah', 'Soldier: 76', 'Brigitte', 'Kiriko', 'Lucio', 'Mercy'],
    'Mei': ['Doomfist', 'Reinhardt', 'Winston', 'Wrecking Ball', 'Genji', 'Sombra'],
    'Pharah': ['Doomfist', 'Junker Queen', 'Orisa', 'Reinhardt', 'Roadhog', 'Zarya', 'Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Reaper', 'Sombra', 'Symmetra', 'Torbjorn', 'Tracer', 'Ana', 'Baptiste', 'Brigitte', 'Moira', 'Zenyatta'],
    'Baptiste': ['Junker Queen', 'Orisa', 'Echo', 'Pharah', 'Illari', 'Kiriko', 'Mercy'],
    'Soldier: 76': ['Junker Queen', 'Orisa', 'Ashe', 'Echo', 'Junkrat', 'Pharah', 'Lucio', 'Mercy', 'Moira'],
    'Widowmaker': ['Junker Queen', 'Orisa', 'Roadhog', 'Zarya', 'Cassidy', 'Echo', 'Pharah', 'Reaper', 'Soldier: 76', 'Torbjorn', 'Tracer', 'Brigitte', 'Kiriko', 'Lifeweaver', 'Moira', 'Zenyatta'],
    'Zenyatta': ['Junker Queen', 'Orisa', 'Rammatra'],
    'D.Va': ['Orisa', 'Rammatra', 'Zarya', 'Echo', 'Hanzo', 'Junkrat', 'Pharah', 'Sojourn', 'Soldier: 76', 'Widowmaker', 'Brigitte', 'Illari', 'Zenyatta'],
    'Echo': ['Orisa', 'Roadhog', 'Zarya', 'Ashe', 'Junkrat', 'Mei', 'Reaper', 'Symmetra', 'Ana', 'Baptiste', 'Brigitte', 'Moira', 'Zenyatta'],
    'Hanzo': ['Orisa', 'Cassidy', 'Baptiste'], 'Kiriko': ['Orisa', 'Rammatra'],
    'Sojourn': ['Orisa', 'Kiriko', 'Moira'],
    'Sombra': ['Orisa', 'Reinhardt', 'Roadhog', 'Sigma', 'Ashe', 'Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Pharah', 'Sojourn', 'Symmetra', 'Torbjorn', 'Tracer', 'Widowmaker', 'Ana', 'Baptiste', 'Brigitte', 'Illari', 'Lifeweaver', 'Moira'],
    'Bastion': ['Rammatra', 'Zarya', 'Cassidy', 'Torbjorn', 'Brigitte'], 'Orisa': ['Rammatra', 'Sojourn', 'Illari'],
    'Tracer': ['Rammatra', 'Reinhardt', 'Roadhog', 'Sigma', 'Ashe', 'Bastion', 'Hanzo', 'Junkrat', 'Mei', 'Sojourn', 'Symmetra', 'Widowmaker', 'Ana', 'Baptiste', 'Brigitte', 'Kiriko', 'Zenyatta'],
    'Junkrat': ['Reinhardt', 'Roadhog', 'Bastion', 'Reaper', 'Soldier: 76', 'Sombra', 'Symmetra', 'Torbjorn', 'Tracer', 'Brigitte'],
    'Genji': ['Roadhog', 'Sigma', 'Ashe', 'Bastion', 'Cassidy', 'Hanzo', 'Junkrat', 'Widowmaker', 'Ana', 'Baptiste', 'Brigitte', 'Illari', 'Kiriko', 'Mercy', 'Moira', 'Zenyatta'],
    'Lucio': ['Sigma', 'Hanzo', 'Junkrat', 'Sojourn', 'Ana', 'Baptiste'],
    'Torbjorn': ['Wrecking Ball', 'Lucio'],
    'Junker Queen': ['Echo'],
    'Wrecking Ball': ['Hanzo', 'Junkrat', 'Kiriko', 'Mercy'],
    'Rammatra': ['Reaper', 'Lifeweaver'],
    'Lifeweaver': ['Illari'],
    'Mercy': ['Lifeweaver'],
    'Reinhardt': ['Sigma']
}

const example_scorecard = {
    'D.Va': 0,
    'Doomfist': 0,
    'Junker Queen': 0,
    'Orisa': 0,
    'Rammatra': 0,
    'Reinhardt': 0,
    'Roadhog': 0,
    'Sigma': 0,
    'Winston': 0,
    'Wrecking Ball': 0,
    'Zarya': 0,
    'Ashe': 0,
    'Bastion': 0,
    'Cassidy': 0,
    'Echo': 0,
    'Genji': 0,
    'Hanzo': 0,
    'Junkrat': 0,
    'Mei': 0,
    'Pharah': 0,
    'Reaper': 0,
    'Sojourn': 0,
    'Soldier: 76': 0,
    'Sombra': 0,
    'Symmetra': 0,
    'Torbjorn': 0,
    'Tracer': 0,
    'Widowmaker': 0,
    'Ana': 0,
    'Baptiste': 0,
    'Brigitte': 0,
    'Illari': 0,
    'Kiriko': 0,
    'Lifeweaver': 0,
    'Lucio': 0,
    'Mercy': 0,
    'Moira': 0,
    'Zenyatta': 0,
}

const image_location = {
    'D.Va': 'characterImages/tanks/dva.png',
    'Doomfist': 'characterImages/tanks/doomfist.png',
    'Junker Queen': 'characterImages/tanks/junkerqueen.png',
    'Orisa': 'characterImages/tanks/orisa.png',
    'Rammatra': 'characterImages/tanks/rammatra.png',
    'Reinhardt': 'characterImages/tanks/reinhardt.png',
    'Roadhog': 'characterImages/tanks/roadhog.png',
    'Sigma': 'characterImages/tanks/sigma.png',
    'Winston': 'characterImages/tanks/winston.png',
    'Wrecking Ball': 'characterImages/tanks/wreckingball.png',
    'Zarya': 'characterImages/tanks/zarya.png',
    'Ashe': 'characterImages/dps/ashe.png',
    'Bastion': 'characterImages/dps/bastion.png',
    'Cassidy': 'characterImages/dps/cassidy.png',
    'Echo': 'characterImages/dps/echo.png',
    'Genji': 'characterImages/dps/genji.png',
    'Hanzo': 'characterImages/dps/hanzo.png',
    'Junkrat': 'characterImages/dps/junkrat.png',
    'Mei': 'characterImages/dps/mei.png',
    'Pharah': 'characterImages/dps/pharah.png',
    'Reaper': 'characterImages/dps/reaper.png',
    'Sojourn': 'characterImages/dps/sojourn.png',
    'Soldier: 76': 'characterImages/dps/soldier76.png',
    'Sombra': 'characterImages/dps/sombra.png',
    'Symmetra': 'characterImages/dps/symmetra.png',
    'Torbjorn': 'characterImages/dps/torbjorn.png',
    'Tracer': 'characterImages/dps/tracer.png',
    'Widowmaker': 'characterImages/dps/widowmaker.png',
    'Ana': 'characterImages/supports/ana.png',
    'Baptiste': 'characterImages/supports/baptiste.png',
    'Brigitte': 'characterImages/supports/brigitte.png',
    'Illari': 'characterImages/supports/illari.png',
    'Kiriko': 'characterImages/supports/kiriko.png',
    'Lifeweaver': 'characterImages/supports/lifeweaver.png',
    'Lucio': 'characterImages/supports/lucio.png',
    'Mercy': 'characterImages/supports/mercy.png',
    'Moira': 'characterImages/supports/moira.png',
    'Zenyatta': 'characterImages/supports/zenyatta.png',
}

function sortAndFormat(scorecard) {
    // Sort the scorecard based on the counters from highest to lowest
    let sortedScorecard = Object.entries(scorecard).sort((a, b) => b[1] - a[1]);

    return sortedScorecard
};

function topHeroes(scorecard) {
    // Make sure scorecard is defined and is an array
    if (!scorecard || !Array.isArray(scorecard)) return;

    const tankScores = scorecard.filter(([hero]) => tank.includes(hero)).sort((a, b) => b[1] - a[1]);
    const dpsScores = scorecard.filter(([hero]) => dps.includes(hero)).sort((a, b) => b[1] - a[1]);
    const supportScores = scorecard.filter(([hero]) => support.includes(hero)).sort((a, b) => b[1] - a[1]);

    // Assuming that each list has at least one hero
    const topTank = tankScores[0];
    const topDPS1 = dpsScores[0];
    const topDPS2 = dpsScores.length > 1 ? dpsScores[1] : null; // check if there is a second DPS
    const topSupport1 = supportScores[0];
    const topSupport2 = supportScores.length > 1 ? supportScores[1] : null; // check if there is a second Support

    return {
        topTank,
        topDPS1,
        topDPS2,
        topSupport1,
        topSupport2
    };
}

function selectCharacter(category) {
    let characters;
    switch (category) {
        case 'tank':
            characters = tank;
            break;
        case 'dps':
            characters = dps;
            break;
        case 'support':
            characters = support;
            break;
    }

    const selectedIndex = Math.floor(Math.random() * characters.length);
    const selectedCharacter = characters[selectedIndex];

    document.getElementById("result").innerText = `${selectedCharacter}`;
}

function selectCharacterWholeTeam() {
    let selection = [...tank]
    const selectedTank = tank[Math.floor(Math.random() * selection.length)];
    selection = [...dps]
    let num = Math.floor(Math.random() * selection.length);
    const selectedDps1 = selection[num]
    selection.splice(num, 1)
    const selectedDps2 = selection[Math.floor(Math.random() * selection.length)]
    selection = [...support]
    num = Math.floor(Math.random() * selection.length);
    const selectedSupport1 = selection[num]
    selection.splice(num, 1)
    const selectedSupport2 = selection[Math.floor(Math.random() * selection.length)]

    document.getElementById("result").innerText = `${selectedTank}; ${selectedDps1}, ${selectedDps2}; ${selectedSupport1}, ${selectedSupport2}`
}

document.addEventListener("DOMContentLoaded", function () {
    const dps1 = document.getElementById('enemy-dps-1');
    const dps2 = document.getElementById('enemy-dps-2');

    // Initialization: disable initially selected options
    disableOption(dps2.value, dps1);
    disableOption(dps1.value, dps2);

    dps1.addEventListener('change', function () {
        resetDisabledOptions(dps2);
        disableOption(this.value, dps2);
    });

    dps2.addEventListener('change', function () {
        resetDisabledOptions(dps1);
        disableOption(this.value, dps1);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const support1 = document.getElementById('enemy-support-1');
    const support2 = document.getElementById('enemy-support-2');

    // Initialization: disable initially selected options
    disableOption(support2.value, support1);
    disableOption(support1.value, support2);

    support1.addEventListener('change', function () {
        resetDisabledOptions(support2);
        disableOption(this.value, support2);
    });

    support2.addEventListener('change', function () {
        resetDisabledOptions(support1);
        disableOption(this.value, support1);
    });
});


function disableOption(value, selectElement) {
    const optionToDisable = selectElement.querySelector(`option[value="${value}"]`);
    if (optionToDisable) {
        optionToDisable.disabled = true;
    }
}

function resetDisabledOptions(selectElement) {
    const allOptions = selectElement.querySelectorAll('option');
    allOptions.forEach(opt => opt.disabled = false);
}
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('#enemy-tank, #enemy-dps-1, #enemy-dps-2, #enemy-support-1, #enemy-support-2');

    let counters = { ...pre_counters }

    onDropdownChange();

    function onDropdownChange() {
        // Get the selected value
        const tankDropdown = document.getElementById('enemy-tank');
        const dpsDropdown1 = document.getElementById('enemy-dps-1');
        const dpsDropdown2 = document.getElementById('enemy-dps-2');
        const supportDropdown1 = document.getElementById('enemy-support-1');
        const supportDropdown2 = document.getElementById('enemy-support-2');

        console.log(`Enemy Team: ${tankDropdown.value} | ${dpsDropdown1.value}, ${dpsDropdown2.value} | ${supportDropdown1.value}, ${supportDropdown2.value}`)

        let enemyteam = [tankDropdown.value, dpsDropdown1.value, dpsDropdown2.value, supportDropdown1.value, supportDropdown2.value]

        let counter_card = { ...example_scorecard }
        enemyteam.forEach(function (value) {
            if (!counters[value]) {
                console.error("No counters found for:", value);
                return;  // skip this iteration
            }
            counters[value].forEach(function (counter_hero) {
                counter_card[counter_hero] += 1
            });
        });

        let sortedCard = sortAndFormat(counter_card)
        // console.log(sortedCard)
        let bestOptions = topHeroes(sortedCard)
        console.log(bestOptions)

        document.getElementById("friendly-char-tank-img").src = image_location[bestOptions.topTank[0]]
        document.getElementById("friendly-char-tank-name").innerHTML = bestOptions.topTank[0]
        document.getElementById("friendly-char-dps1-img").src = image_location[bestOptions.topDPS1[0]]
        document.getElementById("friendly-char-dps1-name").innerHTML = bestOptions.topDPS1[0]
        document.getElementById("friendly-char-dps2-img").src = image_location[bestOptions.topDPS2[0]]
        document.getElementById("friendly-char-dps2-name").innerHTML = bestOptions.topDPS2[0]
        document.getElementById("friendly-char-support1-img").src = image_location[bestOptions.topSupport1[0]]
        document.getElementById("friendly-char-support1-name").innerHTML = bestOptions.topSupport1[0]
        document.getElementById("friendly-char-support2-img").src = image_location[bestOptions.topSupport2[0]]
        document.getElementById("friendly-char-support2-name").innerHTML = bestOptions.topSupport2[0]

    }

    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener('change', onDropdownChange);
    });
});

