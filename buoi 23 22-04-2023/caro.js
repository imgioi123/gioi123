let board = new Array(20);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(20).fill(null);
}

let currentPlayer = 'x';

function handleClick(event) {
    const cell = event.target;
    const row = parseInt(cell.getAttribute('data-row'));
    const col = parseInt(cell.getAttribute('data-col'));

    if (board[row][col] === null) {
        cell.classList.add(currentPlayer);
        board[row][col] = currentPlayer;

        if (checkWin()) {
            alert(currentPlayer + ' wins!');
            return;
        }

        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
}

function checkWin() {
    // check horizontal
    for (let row = 0; row < board.length; row++) {
        let count = 0;
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === currentPlayer) {
                count++;
                if (count === 5) return true;
            } else {
                count = 0;
            }
        }
    }

    // check vertical
    for (let col = 0; col < board[0].length; col++) {
        let count = 0;
        for (let row = 0; row < board.length; row++) {
            if (board[row][col] === currentPlayer) {
                count++;
                if (count === 5) return true;
            } else {
                count = 0;
            }
        }
    }

    // check diagonal
    for (let r = 0; r <= board.length - 5; r++) {
        for (let c = 0; c <= board[r].length - 5; c++) {
            let count1 = 0;
            let count2 = 0;
            for (let i = 0; i < 5; i++) {
                if (board[r + i][c + i] === currentPlayer) {
                    count1++;
                    if (count1 === 5) return true;
                } else {
                    count1 = 0;
                }

                if (board[r + i][c + 4 - i] === currentPlayer) {
                    count2++;
                    if (count2 === 5) return true;
                } else {
                    count2 = 0;
                }
            }
        }
    }

    return false;
}

const cells = document.querySelectorAll('.cell');
for (let cell of cells) {
    cell.addEventListener('click', handleClick);
}