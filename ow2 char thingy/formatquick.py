while True:
    def format_string(s):
        # Split the string at commas and strip any whitespace
        names = [name.strip() for name in s.split(',')]
        
        # Join the names back together with ', ' and surround each name with single quotes
        formatted = "', '".join(names)
        
        # Return the formatted string surrounded with single quotes
        return f"'{formatted}'"

    # Test the function
    input_string = input('Input string: ')
    formatted_string = format_string(input_string)
    print(formatted_string)