const player1_selection = document.getElementById("selection1");
const player2_selection = document.getElementById("selection2");
const start = document.getElementById("startbtn");

let player1_is = "", player2_is = "";
let player1, player2, gameController, gameBoard;

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

    let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // logic => 0 = empty, 1 = X, 2 = O

    const genBoard = () => 
    {
        let title = document.getElementById('title');
        let newContainer = document.createElement('div');
        newContainer.id = "gameContainer";
        newContainer.classList.add('gameContainer')

        title.parentNode.insertBefore(newContainer, title.nextSibling);

        gameBoard.forEach(element => 
        {
            let newItem = document.createElement('button');
            newItem.classList.add('gameItem');
            newItem.id = 'grid-item';
            newItem.value = element;
            if (element == 0)
                newItem.innerHTML = "";
            else if (element == 1)
                newItem.innerHTML = "X";
            else
                newItem.innerHTML = "O";
            
            newContainer.appendChild(newItem);
        })

        let turnText = document.createElement('h4');
        turnText.id = "text";
        turnText.classList.add('turnText');
        turnText.innerHTML = "Test Test Test Test";
        newContainer.parentNode.insertBefore(turnText, newContainer.nextSibling);
    }

    const updateBoard = (value, index) =>
    {
        gameBoard[index] = value;
        document.getElementById('gameContainer').remove();
        genBoard();

        return;
    }

    return {
        genBoard,
        updateBoard,

    };
})

const test = () =>
{
    gameBoard.updateBoard(1, 0);
    gameBoard.updateBoard(1, 1);
    gameBoard.updateBoard(1, 2);
}

/* --- Game Module --- */
const game = ((player1, player2) => 
{
    const startGame = () => 
    {
        
    }
    
    return {
        startGame,

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

    /* --- Generate Game Board --- */
    gameBoard.genBoard();

    /* --- Start Game --- */
    gameController.startGame();

})