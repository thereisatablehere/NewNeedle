Project Title: Needleman-Wunsch Algorithm Implementations
Authors: Dylan Bartness & Nate Courchane

Project Description: This project includes two different implementations of the Needlman-Wunsch algorithm for finding the optimal alignment of two DNA sequences. When given two DNA sequences,
the user can choose to either use the backtracking method or the pointer matrix method to find the optimal alignment. Both methods create and display a scoring matrix with highligted cells and arrows
showing the path the alignment travels. The backtracking method creates the scoring matrix and backtracks through the matrix to find the optimal alignment. The pointer matrix method creates a pointer
matrix alongside the scoring matrix, and the code backtracks through the pointer matrix instead of the scoring matrix to find the optimal alignment. The user can adjust the match, mismatch, and gap
penalties manually to customize the weights/importance of these scores.

How to Use: 
1. Download .zip file containing necessary files.
2. Open index.html
3. Enter desired DNA sequences in the two input fields under the "Enter Sequences:" tag. Sequences must contain only letters and/or '-'. (Plus and minus buttons add/remove input fields, but this functionality
   is not fully developed as it was meant for multiple sequence alignment functionality. Because we only implemented alignment methods for two sequences, these buttons are obsolete.)
5. Enter desired match, mismatch, and gap scores in their respective input fields under the "Enter Scores:" tag. Default values are already provided.
6. Once desired sequences and scores are entered, click the desired method (Backtrack or Pointer Matrix) button to create scoring matrix and optimal alignment.
7. Scoring matrix and optimal alignment will print after method button is clicked.
8. Runtime of the method can be found in the console output.
