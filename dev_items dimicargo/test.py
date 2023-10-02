import json

# Specify the filenames
file1 = 'dev_items dimicargo\\test_map.json'
file2 = 'dev_items dimicargo\data.json'
output_file = 'merged.json'

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