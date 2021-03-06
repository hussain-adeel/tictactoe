const player1_selection = document.getElementById("selection1");
const player2_selection = document.getElementById("selection2");
const start = document.getElementById("startbtn");

let player1_is = "", player2_is = "";
let player1, player2, gameController, gameBoard;
let currPlayer;

/* --- Player Object Factory --- */
const pFactory = (type) => 
{
    const getType = () =>
    {
        return type;
    }

    return { getType }
}

/* --- Board Module --- */
const board = (() => 
{

    let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // => 0 = empty, 1 = X, 2 = O

    const genBoard = () => 
    {
        let title = document.getElementById('title');
        let newContainer = document.createElement('div');
        newContainer.id = "gameContainer";
        newContainer.classList.add('gameContainer')

        title.parentNode.insertBefore(newContainer, title.nextSibling);

        let j = 0;

        gameBoard.forEach(element => 
        {
            let newItem = document.createElement('button');
            newItem.classList.add('gameItem');
            newItem.id = j;
            newItem.addEventListener('click', function (e) { gameController.select(e.target.id); })
            newItem.value = element;
            if (element == 0)
                newItem.innerHTML = "";
            else if (element == 1)
            {
                newItem.innerHTML = "X";
                newItem.classList.add('gameSelected');
                newItem.classList.remove('gameItem');
                newItem.disabled = true;
            }
            else
            {
                newItem.innerHTML = "O";
                newItem.classList.add('gameSelected');
                newItem.classList.remove('gameItem');
                newItem.disabled = true;
            }
            
            newContainer.appendChild(newItem);
            j++;
        })

        let turnText = document.createElement('h4');
        turnText.id = "text";
        turnText.classList.add('turnText');
        turnText.innerHTML = currPlayer + "'s turn!"
        newContainer.parentNode.insertBefore(turnText, newContainer.nextSibling);
    }

    const updateBoard = (value, index) =>
    {
        if (gameBoard[index] !== 0)
        {
            return false;
        }

        gameBoard[index] = value;
        
        document.getElementById('gameContainer').remove();
        document.getElementById('text').remove();
        gameController.nextPlayer();

        genBoard();

        return true;
    }

    const hasEmptySpace = () =>
    {
        return gameBoard.includes(0);
    }

    const checkPlayerWin = () =>
    {
        if (!hasEmptySpace())
        {
            return "tie";
        }
        
        for (let i = 0; i < 3; i++)
        {
            if (gameBoard[i] == 0)
            {
                continue;
            }

            console.log(gameBoard[i]);

            if (gameBoard[i] == gameBoard[i+3] &&
                gameBoard[i + 3] == gameBoard[i+6])
                {
                    if (gameBoard[i] == 1)
                        return "player1";
                    else
                        return "player2";
                }
        }

        for (let i = 0; i < 9; i+=3)
        {
            if (gameBoard[i] == 0)
            {
                continue;
            }
            if (gameBoard[i] == gameBoard[i+1] &&
                gameBoard[i + 1] == gameBoard[i+2])
                {
                    if (gameBoard[i] == 1)
                        return "player1";
                    else
                        return "player2";
                }
        }

        if (gameBoard[0] != 0)
        {
            if (gameBoard[0] == gameBoard[4] &&
                gameBoard[4] == gameBoard[8])
                {
                    if (gameBoard[0] == 1)
                        return "player1";
                    else
                        return "player2";
                }
        }

        if (gameBoard[2] != 0)
        {
            if (gameBoard[2] == gameBoard[4] &&
                gameBoard[4] == gameBoard[6])
                {
                    if (gameBoard[0] == 1)
                        return "player1";
                    else
                        return "player2";
                }
        }


        return "none";
    }

    const playerWin = (type) =>
    {

        document.getElementById('text').remove();

        
        let winDiv = document.createElement('div');
        winDiv.id = "winContainer";
        winDiv.classList.add('winContainer');

        let winTitle = document.createElement('h1');
        winTitle.id = "winText";
        winTitle.classList.add('win');

        winDiv.appendChild(winTitle);
        let title = document.getElementById('title');
        let gameContainer = document.getElementById('gameContainer');
        gameContainer.parentNode.insertBefore(winDiv, gameContainer.nextSibling);

        if (type === "tie")
        {
            document.getElementById('winText').innerHTML = "it is a tie!";
            document.getElementById('winText').classList.add('tie');
        }
        else if (type === "player1")
        {
            document.getElementById('winText').innerHTML = "Player 1 wins!";
            document.getElementById('winText').classList.add('pWin');
        }
        else if (type === "player2")
        {
            document.getElementById('winText').innerHTML = "Player 2 wins!";
            document.getElementById('winText').classList.add('pWin');
        }

        let playAgain = document.createElement('button');
        playAgain.innerHTML = "Play Again";
        playAgain.id = "paBtn";
        playAgain.classList.add('paBtn');
        playAgain.onclick = function() { window.location.reload(); }
        winDiv.appendChild(playAgain);


        for (let i = 0; i < 9; i++)
        {
            document.getElementById(i).disabled = true;
        }


    }

    return {
        genBoard,
        updateBoard,
        hasEmptySpace,
        playerWin,
        checkPlayerWin,
    };
})

/* --- Game Module --- */
const game = ((player1, player2) => 
{
    const startGame = () => 
    {
        currPlayer = 'Player 1';
        gameBoard.genBoard();
        playGame();
    }

    const nextPlayer = () =>
    {
        if (currPlayer === 'Player 1')
        {
            currPlayer = 'Player 2';
        }
        else
        {
            currPlayer = 'Player 1';
        }

        return;
    }

    const doAIturn = () =>
    {
        let randChoice;
        if (currPlayer === 'Player 1')
        {
            do
            {
                randChoice = Math.floor(Math.random() * 9);
            }
            while (!gameBoard.updateBoard(1, randChoice));
        }
        else if (currPlayer === 'Player 2')
        {
            do
            {
                randChoice = Math.floor(Math.random() * 9);
            }
            while (!gameBoard.updateBoard(2, randChoice));
        }

        playGame();
    }

    const playGame = () =>
    {
        let check = gameBoard.checkPlayerWin();
        console.log(check);
        if (check !== 'none')
        {
            gameBoard.playerWin(check);
            return;
        }

        if (currPlayer === 'Player 1' && player1.getType() === 'ai')
        {
            doAIturn();
        }
        else if (currPlayer === 'Player 2' && player2.getType() === 'ai')
        {
            doAIturn();
        }


    }

    const select = (j) =>
    {
        let value;

        if (currPlayer === 'Player 1')
            value = 1;
        else
            value = 2;


        gameBoard.updateBoard(value, j);

        playGame();
    }
    
    return {
        startGame,
        select,
        nextPlayer,
    };
})

/* --- Player 1 Human/AI Selector Event Listener --- */
player1_selection.addEventListener('click', (event) =>
{
    /* --- Ensure Player Clicking on Button --- */
    if (event.target.nodeName !== 'BUTTON')
    {
        return;
    }


    let target = event.target;
    let buttons = player1_selection.getElementsByClassName('select');

    /* --- Check If Button Is Already Active --- */
    if (target.classList.contains('active'))
    {
        target.classList.remove('active');
        player1_is = "";
        return;
    }
    /* --- Otherwise Deselect Other Button (If Active) --- */
    else
    {
        for (let element of buttons)
        {
            if (element.classList.contains('active'))
                element.classList.remove('active');
        }

        target.classList.add('active');

        player1_is = target.value;
    }
})

/* --- Player 2 Human/AI Selector Event Listener --- */
player2_selection.addEventListener('click', (event) =>
{
    /* --- Ensure Player Clicking on Button --- */
    if (event.target.nodeName !== 'BUTTON')
    {
        return;
    }

    let target = event.target;
    let buttons = player2_selection.getElementsByClassName('select');

    /* --- Check If Button Is Already Active --- */
    if (target.classList.contains('active'))
    {
        target.classList.remove('active');
        player2_is = "";
        return;
    }
    /* --- Otherwise Deselect Other Button (If Active) --- */
    else
    {
        for (let element of buttons)
        {
            if (element.classList.contains('active'))
                element.classList.remove('active');
        }
        
        target.classList.add('active');

        player2_is = target.value;
    }
})

/* --- 'Start Game' Button Event Listener --- */
start.addEventListener('click', (event) =>
{
    /* --- Ensure At Least One Player Is Human --- */
    if (player1_is == "ai" && player2_is == "ai")
    {
        if (!document.getElementById('warning2').classList.contains('hide'))
            document.getElementById('warning2').classList.add('hide');

        document.getElementById('warning').classList.remove('hide');
        return;
    }
    else if (player1_is == "" || player2_is == "")
    {
        if (!document.getElementById('warning').classList.contains('hide'))
            document.getElementById('warning').classList.add('hide');

        document.getElementById('warning2').classList.remove('hide');
        return;
    }
    
    /* --- Create Players --- */
    player1 = pFactory(player1_is);
    player2 = pFactory(player2_is);

    /* --- Create Game Controller --- */
    gameController = game(player1, player2);
    
    /* --- Create Game Board --- */
    gameBoard = board();


    /* --- CLEAR CURRENT PAGE CONTENT --- */
    document.getElementById('playerdiv').remove();
    document.getElementById('startdiv').remove();
    document.getElementById('warning').remove();
    document.getElementById('warning2').remove();

    /* --- Start Game --- */
    gameController.startGame();

})