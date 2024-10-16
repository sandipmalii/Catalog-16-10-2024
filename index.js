// const fs = require('fs');
// const readline = require('readline');

// // Function to read the JSON file
// function readInputFile(filename) {
//     const data = fs.readFileSync(filename, 'utf-8');
//     return JSON.parse(data);
// }

// // Function to decode the y values
// function decodeYValue(base, value) {
//     return parseInt(value, base);
// }

// // Function to calculate the constant term (c) using Lagrange interpolation
// function lagrangeInterpolation(points, k) {
//     let constantTerm = 0;

//     for (let i = 0; i < k; i++) {
//         let term = points[i].y;

//         for (let j = 0; j < k; j++) {
//             if (i !== j) {
//                 term *= (-points[j].x) / (points[i].x - points[j].x);
//             }
//         }
//         constantTerm += term;
//     }

//     return constantTerm;
// }

// // Main function to execute the logic
// async function main() {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });

//     rl.question('Enter the name of your JSON input files separated by space (e.g., input.json input1.json): ', (answer) => {
//         const filenames = answer.split(' '); // Split input by spaces

//         filenames.forEach((filename) => {
//             try {
//                 const jsonData = readInputFile(filename.trim());

//                 const n = jsonData.keys.n;
//                 const k = jsonData.keys.k;

//                 const decodedValues = [];

//                 // Decode all y values
//                 for (let i = 1; i <= n; i++) {
//                     if (jsonData[i]) {
//                         const base = parseInt(jsonData[i].base, 10);
//                         const value = decodeYValue(base, jsonData[i].value);
//                         decodedValues.push({ x: i, y: value });
//                     }
//                 }

//                 // Calculate the constant term (c)
//                 const secretC = lagrangeInterpolation(decodedValues, k);
//                 console.log(`Reconstructed secret for ${filename}: ${secretC}`);
//             } catch (error) {
//                 console.error(`Error processing ${filename}:`, error.message);
//             }
//         });

//         rl.close();
//     });
// }

// // Execute the main function
// main();



const fs = require('fs');
const readline = require('readline');

// Function to read the JSON file
function readInputFile(filename) {
    const data = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(data);
}

// Function to decode the y values
function decodeYValue(base, value) {
    return parseInt(value, base);
}

// Function to calculate the constant term (c) using Lagrange interpolation
function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let term = points[i].y;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (-points[j].x) / (points[i].x - points[j].x);
            }
        }
        constantTerm += term;
    }

    return constantTerm;
}

// Function to check for wrong points
function checkWrongPoints(jsonData) {
    const n = jsonData.keys.n; // Total expected points
    const expectedKeys = Array.from({ length: n }, (_, i) => (i + 1).toString()); // Expected keys from 1 to n
    const actualKeys = Object.keys(jsonData).filter(key => !isNaN(key)); // Filter only numerical keys

    // Identify wrong points: actual keys that are not in expected keys
    const wrongPoints = actualKeys.filter(key => !expectedKeys.includes(key));

    return {
        count: wrongPoints.length,
        wrongPoints: wrongPoints
    };
}

// Main function to execute the logic
async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the name of your JSON input files separated by space (e.g., input.json input1.json): ', (answer) => {
        const filenames = answer.split(' '); // Split input by spaces

        filenames.forEach((filename) => {
            try {
                const jsonData = readInputFile(filename.trim());

                // Check for wrong points
                const { count, wrongPoints } = checkWrongPoints(jsonData);
                console.log(`Number of wrong points in ${filename}: ${count}`);
                if (count > 0) {
                    console.log(`Wrong points: ${wrongPoints.join(', ')}`);
                }

                const n = jsonData.keys.n;
                const k = jsonData.keys.k;

                const decodedValues = [];

                // Decode all y values
                for (let i = 1; i <= n; i++) {
                    if (jsonData[i]) {
                        const base = parseInt(jsonData[i].base, 10);
                        const value = decodeYValue(base, jsonData[i].value);
                        decodedValues.push({ x: i, y: value });
                    }
                }

                // Calculate the constant term (c)
                const secretC = lagrangeInterpolation(decodedValues, k);
                console.log(`Reconstructed secret for ${filename}: ${secretC}`);
            } catch (error) {
                console.error(`Error processing ${filename}:`, error.message);
            }
        });

        rl.close();
    });
}

// Execute the main function
main();
