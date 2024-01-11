import json
import os
import colorama
from colorama import Fore, Back, Style

colorama.init()

filename = 'map.json'

try:
    with open(filename, 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    data = {}

while True:
    os.system('cls' if os.name == 'nt' else 'clear')  
    
    print(Fore.GREEN + "\nMain Menu:" + Fore.RESET)
    print(Fore.BLUE + "1. Start" + Fore.RESET)
    print(Fore.BLUE + "2. Exit" + Fore.RESET)
    choice = input("Enter your choice (1/2): ")

    if choice == '2':
        print(Fore.RED + "Exiting..." + Fore.RESET)
        break
    elif choice != '1':
        print(Fore.RED + "Invalid choice. Please enter 1 to start or 2 to exit." + Fore.RESET)
        input("Press Enter to continue...")
        continue  
    
    os.system('cls' if os.name == 'nt' else 'clear')
    
    location_name = input("Enter the name of the location (e.g., Shubin Mining Facility SCD-1): ")

    if location_name in data:
        print(f"{location_name} already exists in the data.")
        update = input("Do you want to update it? (yes/no): ").lower()
        if update != 'yes':
            print("No changes made to", location_name)
            input("Press Enter to continue...")
            continue
    else:
        data[location_name] = {"location": "", "buy": {}, "sell": {}}
        data[location_name]["location"] = input(f"Enter the location for {location_name}: ")
    
    os.system('cls' if os.name == 'nt' else 'clear')

    for transaction_type in ["buy", "sell"]:
        print(Fore.MAGENTA + f"Enter items to {transaction_type} for {location_name}. Type 'done' when finished." + Fore.RESET)
        while True:
            item_name = input(f"Enter the name of the item to {transaction_type} (or 'done' to finish): ")
            if item_name.lower() == 'done':
                break
            item_price = input(f"Enter the price per unit for {item_name}: ")
            try:
                data[location_name][transaction_type][item_name] = int(item_price)
            except ValueError:
                print(Fore.RED + "Invalid price entered. Please enter a valid number." + Fore.RESET)
                continue
            os.system('cls' if os.name == 'nt' else 'clear')

    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

    print(Fore.GREEN + "Data successfully saved!" + Fore.RESET)
    input("Press Enter to continue...")
