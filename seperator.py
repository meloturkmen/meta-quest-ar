# Define the input and output file names
input_file_name = 'input.txt'
output_file_name = 'output.txt'

try:
    # Open the input file and read all lines
    with open(input_file_name, 'r') as input_file:
        # Read words from the file, assuming words are separated by whitespace
        words = input_file.read().split()
    
    # Open the output file and write the words separated by commas
    with open(output_file_name, 'w') as output_file:
        # Join the words with commas and write to the output file
        output_file.write(','.join(words))
    
    print(f"Words have been successfully written to {output_file_name}")

except Exception as e:
    print(f"An error occurred: {e}")
