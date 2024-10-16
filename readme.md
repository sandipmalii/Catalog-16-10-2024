# Catalog Placements Assignment

**Duration:** 70 mins  
**Testing Environment/IDE:** Use any IDE or environment you are comfortable with  
**Language:** Any language except **Python** is allowed  
**Submission:** Verify the submission with us manually.

## Problem Statement

In this assignment, you will work on a simplified version of **Shamir's Secret Sharing** algorithm.

Consider an unknown polynomial of degree `m`. You will require `m+1` roots of the polynomial to solve for the coefficients, represented as `k = m + 1`.

An unknown polynomial of degree `m` can be represented as:


f(x) = a_m * x^m + a_{m-1} * x^{m-1} + ... + a_1 * x + c


Where:
- `f(x)` is the polynomial function
- `m` is the degree of the polynomial
- `a_m, a_{m-1}, ..., a_1, c` are coefficients (real numbers)
- `a_m ≠ 0` (since it's the highest degree term, ensuring the polynomial is of degree `m`)

The task is to find the constant term, i.e., `c`, of the polynomial with the given roots. However, the points are not provided directly but in a specific format. You need to read the input from the test cases provided in **JSON** format.

### Sample Test Case

```json
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}

n: Number of roots provided in the given JSON
k: Minimum number of roots required to solve for the coefficients of the polynomial (k = m + 1, where m is the degree of the polynomial)

**Root Format Example** 
"2": {
    "base": "2",
    "value": "111"
}


Consider the above root as (x, y):

x is the key of the object (in this case, x = 2)
y value is encoded with a given base
Decode the y value: 111 in base 2 is 7
Therefore, x = 2 and y = 7
You can use any known method to find the coefficients of the polynomial, such as:

Lagrange interpolation
Matrix method
Gauss elimination
Your task is to solve for the constant term c of the polynomial.

Assignment Checkpoints
Read the Test Case from a JSON File

Parse and read the input provided in JSON format from a separate file that contains a series of polynomial roots.
Decode the Y Values

Correctly decode the Y values that are encoded using different bases.
Find the Secret (C)

Calculate the secret c using the decoded Y values and any known method.

**Output**
Print the secret for both test cases simultaneously.

Hint: Although you can't test your code against the test case in a testing environment, you can double-check it manually by solving the polynomial on paper and comparing the outputs.

**Second Test Case**
{
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
}

