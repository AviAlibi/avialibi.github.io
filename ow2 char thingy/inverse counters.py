import os
counters = {
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

inverted_counters = {}

for hero, counter_list in counters.items():
    for counter in counter_list:
        if counter not in inverted_counters:
            inverted_counters[counter] = []
        inverted_counters[counter].append(hero)

for hero, countered_by in inverted_counters.items():
    print(hero, "is countered by:", countered_by)

input('Press enter when ready: ')

os.system('cls')

print(inverted_counters)

with open("inverted_counters.txt", "w") as f:
    f.write(str(inverted_counters))