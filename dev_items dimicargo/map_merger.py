import json
import tkinter as tk
from tkinter import filedialog

# Create a root window and hide it (we just want the file dialog)
root = tk.Tk()
root.withdraw()

# Ask the user to specify the filenames
file1 = filedialog.askopenfilename(title='Select the first JSON file')
if not file1:
    exit("No file selected. Exiting...")

file2 = filedialog.askopenfilename(title='Select the second JSON file')
if not file2:
    exit("No file1 selected. Exiting...")

output_file = filedialog.asksaveasfilename(defaultextension=".json", filetypes=[("JSON files", "*.json")], title='Save the merged JSON file')
if not output_file:
    exit("No file selected. Exiting...")

# Read the first file
with open(file1, 'r') as f:
    data1 = json.load(f)

# Read the second file
with open(file2, 'r') as f:
    data2 = json.load(f)

# Initialize a dictionary to store the merged data
merged_data = data1.copy()

# Check for duplicate keys and merge
for key, value in data2.items():
    if key in merged_data:
        print(f"Duplicate key found: {key}. Skipping...")
    else:
        merged_data[key] = value

# Write the merged data to a new file
with open(output_file, 'w') as f:
    json.dump(merged_data, f, indent=4)  # indent=4 for pretty print

print(f'{file1} and {file2} have been merged into {output_file}')