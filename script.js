const tank = ['D.Va', 'Doomfist', 'Orisa', 'Reinhardt', 'Roadhog', 'Sigma', 'Winston', 'Wrecking Ball', 'Zarya', 'Junker Queen', 'Rammatra'];
const dps = ['Ashe', 'Bastion', 'Cassidy', 'Echo', 'Genji', 'Hanzo', 'Junkrat', 'Mei', 'Pharah', 'Reaper', 'Sojourn', 'Soldier: 76', 'Sombra', 'Symmetra', 'Torbjörn', 'Tracer', 'Widowmaker'];
const support = ['Ana', 'Baptiste', 'Brigitte', 'Lúcio', 'Mercy', 'Moira', 'Zenyatta', 'Kiriko', 'Illari'];

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