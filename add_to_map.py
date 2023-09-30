import json
import os

# Path to your JSON file
filename = 'map.json'

# Load existing data
try:
    with open(filename, 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    data = {}

while True:
    os.system('cls' if os.name == 'nt' else 'clear')  # Clear the console screen

    print("\nMain Menu:")
    print("1. Start")
    print("2. Exit")
    choice = input("Enter your choice (1/2): ")

    if choice == '2':
        print("Exiting...")
        break
    elif choice != '1':
        print("Invalid choice. Please enter 1 to start or 2 to exit.")
        input("Press Enter to continue...")
        continue  # Clear the screen again before reprinting the menu

    os.system('cls' if os.name == 'nt' else 'clear')  # Clear the console screen before asking for location name

    # Ask the user for the location name
    location_name = input("Enter the name of the location (e.g., Shubin Mining Facility SCD-1): ")

    # Check if location already exists
    if location_name in data:
        print(f"{location_name} already exists in the data.")
        update = input("Do you want to update it? (yes/no): ").lower()
        if update != 'yes':
            print("No changes made to", location_name)
            input("Press Enter to continue...")
            continue
    else:
        # If location does not exist, create it
        data[location_name] = {"location": "", "buy": {}, "sell": {}}
        data[location_name]["location"] = input(f"Enter the location for {location_name}: ")
    
    os.system('cls' if os.name == 'nt' else 'clear')

    # Fill in the buy and sell dictionaries
    for transaction_type in ["buy", "sell"]:
        print(f"Enter items to {transaction_type} for {location_name}. Type 'done' when finished.")
        while True:
            item_name = input(f"Enter the name of the item to {transaction_type} (or 'done' to finish): ")
            if item_name.lower() == 'done':
                break
            item_price = input(f"Enter the price per unit for {item_name}: ")
            try:
                data[location_name][transaction_type][item_name] = int(item_price)
            except ValueError:
                print("Invalid price entered. Please enter a valid number.")
                continue
            os.system('cls' if os.name == 'nt' else 'clear')

    # Save the updated data back to the JSON file
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

    print("Data successfully saved!")
    input("Press Enter to continue...")
