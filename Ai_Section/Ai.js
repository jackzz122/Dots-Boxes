const rowsValue = document.getElementById('rows');
const colsValue = document.getElementById('columns');
const ConfirmBtn = document.querySelector('.ConfirmBtn');
const settings = document.querySelector('.setting-btn');
settings.addEventListener('click', e => {
    showMode.classList.toggle('hidden')
})
let flag = false;
if (flag === false) {
    var rows = 8;
    var columns = 12;
}
ConfirmBtn.addEventListener('click', e => {
    if (rowsValue.value === "") {
        alert("Please enter your rows");
    }
    if (colsValue.value === "") {
        alert("Please enter your columns");
    }
    rows = parseInt(rowsValue.value);
    columns = parseInt(colsValue.value);
    flag = true;
    startGame();
    showMode.classList.add('hidden')
})
rowsValue.addEventListener('change', e => {
    if (e.target.value >= 12) {
        e.target.value = 12;
    }

})
colsValue.addEventListener('change', e => {
    if (e.target.value >= 12) {
        e.target.value = 12;
    }


})

// !Game Dots and Boxes
const my2DArrays = [];
//Chỉnh sửa rows and columns để tester nhé, thanks <3
const containerElements = document.createElement('div');
const DELAY_TIME = 0;
let indexLine = 0, indexVertical = 0;
let playerRole = 1;
let squareArray = [];
let squareResults = [];
let maxLength = rows * columns;
let floatIndex = 0.0;
let incr_double = 0.2;
let incr_single = 0.1;
let incr_square_dbl = 0.2;
let incr_square_single = 0.1;
let round_number = 1;
let interNumber, interSquareIndex;
let playerTemp;
let flagPlayer = false;
let TwoSideArray = [];
let scorePlayer1 = 0, scorePlayer2 = 0;
//Hàm bắt đầu game
startGame();
// Document.body: toàn bộ trang web, containElement: sẽ là nơi chứa ma trận và các thuật toán do đó sẽ được lưu trữ trong này
document.querySelector('.game').append(containerElements);
// console.log(my2DArrays);

function startGame() {
    for (let i = 0; i <= rows; i++) {
        my2DArrays[i] = [];

        //Div Element: chứa các chữ số với thanh ngang
        let divElement = document.createElement('div');

        //Square Element: Chứa các ô vuông với thanh dọc
        let squareElements = document.createElement('div');

        //Cái này chỉ để trang trí cho dễ hiểu
        divElement.classList.add('flexBTN');
        squareElements.classList.add('flexBTN');
        squareElements.style.marginLeft = "2px";
        for (let j = 0; j <= columns; j++) {
            let index = floatIndex;
            floatIndex += incr_double;
            //Tạo element cho các chấm
            let element = document.createElement('span');

            //Tạo ra các thanh ngang đóng vai trò là nối các chấm
            let lineElement = document.createElement('div');

            // Cái dòng dưới chỉ tạo kiểu cho thanh, ko quan trọng
            element.classList.add('desgin');
            lineElement.classList.add('line');

            element.id = parseFloat(index).toFixed(round_number);
            lineElement.id = (parseFloat(index += incr_single).toFixed(round_number));
            lineElement.addEventListener('click', lineClickListener);

            my2DArrays[i][j] = j;
            element.classList.add('desginSquare');
            divElement.append(element);
            //Kiểm tra điều kiện, nếu như giá trị bằng j - 1 thì bỏ thanh thừa đi
            if (j !== columns) {
                divElement.append(lineElement);

            }

            if (parseFloat((index % 1).toFixed(round_number)) % 1 >= 0.9) {
                let currentIndex = Math.round(index);
                let pastIndex = roundFixedNumber(index);

                floatIndex = parseFloat(roundFixedNumber(interNumber + currentIndex - pastIndex).toFixed(round_number));
                incr_double /= 10;
                incr_single /= 10;

                round_number++;
            }
            //Lấy ra phần nguyên của số hiện tại: ví dụ 0.9 thì sẽ là 0, 1.9 sẽ là 1
            interNumber = Math.floor(floatIndex);
        }
        //Xong vòng lặp thì cập nhập lại cho các thằng sau còn dùng , ko thì nó làm tròn lên 3, 4 chữ số ko mất: ví dụ 0.10000, 0.120000
        round_number = 1;
        let squareValueIndex = Math.ceil(parseFloat(floatIndex).toFixed(1));
        //Sử dụng vòng lặp để tạo các thanh dọc với hình vuông
        for (let a = 0; a <= columns; a++) {
            let index = squareValueIndex;
            squareValueIndex += incr_square_dbl;
            //Tạo ô vuông(cell) 
            let square = document.createElement('div');
            //Tạo các thanh dọc
            let vertical = document.createElement('div');
            //Trang trí
            square.classList.add('square');
            square.classList.add('squareHidden');
            vertical.classList.add('vertical');
            //Tạo index cho các thanh dọc
            vertical.id = parseFloat(index).toFixed(round_number);
            square.id = parseFloat(index += incr_square_single).toFixed(round_number);

            vertical.addEventListener('click', lineClickListener);
            squareElements.append(vertical);
            //Tạo các đối tượng squareArray để lưu các trạng thái lại
            if (a !== columns) {
                squareElements.append(square);
                if (squareArray.length < maxLength) {
                    squareArray.push({
                        id: square.id,
                        Top: '',
                        Left: '',
                        Right: '',
                        Bottom: '',
                        filled: false,
                    })
                    squareResults.push({
                        id: square.id,
                        Top: ((parseFloat(square.id) - 1).toFixed(round_number)),
                        Left: ((parseFloat(square.id) - incrementDecimal(square.id)).toFixed(round_number)),
                        Right: parseFloat((square.id % 1).toFixed(1)) % 1 >= 0.9 ? (Math.ceil(square.id) + (Math.floor(square.id) - square.id)).toFixed(2) : ((parseFloat(square.id) + incrementDecimal(square.id)).toFixed(round_number)),
                        Bottom: ((parseFloat(square.id) + 1).toFixed(round_number)),
                    })
                }
            }
            //Tương tự đã giải thích như trên
            if (parseFloat((index % 1).toFixed(round_number)) % 1 >= 0.9) {
                let currentIndex = Math.round(index);
                let pastIndex = roundFixedNumber(index);
                squareValueIndex = parseFloat(roundFixedNumber(interSquareIndex + currentIndex - pastIndex).toFixed(round_number));
                incr_square_dbl /= 10;
                incr_square_single /= 10;
                round_number++;
            }

            interSquareIndex = Math.floor(squareValueIndex);
        }
        floatIndex = Math.ceil(parseFloat(squareValueIndex).toFixed(1));
        //Kết thúc vòng lặp các thứ thì cập nhập lại hết , để tránh tình trạng tôi ns như trên
        incr_double = incr_square_dbl = 0.2;
        incr_single = incr_square_single = 0.1;
        round_number = 1;
        containerElements.append(divElement);
        //Loại đi 1 dòng thừa
        if (i !== rows) {
            containerElements.append(squareElements);
        }
    }

    console.log("Startgame: ", squareArray);
}

function hasThreeValue(obj) {
    let count = 0;
    for (let key in obj) {
        if (obj[key] !== '') count++;
    }
    if (count === 5) return true;
    return false;
}
function hasTwoValue(obj) {
    let count = 0;
    for (let key in obj) {
        if (obj[key] != '') count++;
    }
    if (count === 3) return true;
    return false;
}
function getAllMovesId() {
    let lineArray = document.querySelectorAll('.line');
    let verticalArray = document.querySelectorAll('.vertical');

    let arrayVer_Line = [...lineArray, ...verticalArray];
    let array_without_active = arrayVer_Line.filter(items => !items.classList.contains('active'));
    return array_without_active.map(items => items.id);
}
function goAiwithDepthEquals1() {
    console.log('Ai move');
    let checkSquare3Edge = false;
    let chooseIndex = "";
    console.log("Square Array", squareArray);
    console.log("Square Results", squareResults);
    squareArray.forEach(items => {
        if (hasThreeValue(items)) {
            let showResults = squareResults.filter(res => res.id === items.id);
            if (items.Top === '') {
                chooseIndex = showResults[0].Top;
            }
            else if (items.Left === '') {
                chooseIndex = showResults[0].Left;
            }
            else if (items.Bottom === '') {
                chooseIndex = showResults[0].Bottom;
            }
            else if (items.Right === '') {
                chooseIndex = showResults[0].Right;
            }
            checkSquare3Edge = true;
        }

    }
    )
    squareArray.forEach(square => {
        if (hasTwoValue(square)) {
            let showResults = squareResults.filter(res => res.id === square.id);
            if (square.Top === '') {
                !TwoSideArray.includes(showResults[0].Top) && TwoSideArray.push(showResults[0].Top);
            }
            if (square.Left === '') {
                !TwoSideArray.includes(showResults[0].Left) && TwoSideArray.push(showResults[0].Left);
            }
            if (square.Bottom === '') {
                !TwoSideArray.includes(showResults[0].Bottom) && TwoSideArray.push(showResults[0].Bottom);
            }
            if (square.Right === '') {
                !TwoSideArray.includes(showResults[0].Right) && TwoSideArray.push(showResults[0].Right);
            }
        }
    })
    let lineArray = document.querySelectorAll('.line');
    let verticalArray = document.querySelectorAll('.vertical');

    let arrayVer_Line = [...lineArray, ...verticalArray];
    let array_without_active = arrayVer_Line.filter(items => !items.classList.contains('active'));
    let tranFArrayWithoutActive = array_without_active.map(items => {
        return items.id;
    })
    let arrayUpdatesTwoSide = [];
    if (TwoSideArray.length !== 0) {
        arrayUpdatesTwoSide = tranFArrayWithoutActive.filter(values => !TwoSideArray.includes(values));
    }
    if (array_without_active.length === 0) return ' ';


    // chooseIndex = document.getElementById(squareArray[i].id);
    //         chooseIndex.classList.add('active');
    //         chooseIndex.classList.add('red');
    console.log("arrayUpdatesTwoSide", arrayUpdatesTwoSide);
    if (checkSquare3Edge === true) {
        var chooseElement = document.getElementById(chooseIndex);
    }
    else {
        let randomIndex = Math.floor(Math.random() * (arrayUpdatesTwoSide.length === 0 ? tranFArrayWithoutActive.length : arrayUpdatesTwoSide.length));
        // var chooseElement = document.getElementById(arrayUpdatesTwoSide[randomIndex].id);
        var chooseElement = document.getElementById((arrayUpdatesTwoSide.length === 0 ? tranFArrayWithoutActive[randomIndex] : arrayUpdatesTwoSide[randomIndex]));
        var indexRandom = (arrayUpdatesTwoSide.length === 0 ? tranFArrayWithoutActive[randomIndex] : arrayUpdatesTwoSide[randomIndex]);
        console.log("indexRandom", indexRandom);
    }

    chooseElement.classList.add('active');
    chooseElement.classList.add('red');
    array_without_active = arrayVer_Line.filter(items => !items.classList.contains('active'));

    playerRole = 1;
    playerTemp = 0;
    if (checkSquare3Edge === true) {
        checkSquare3Edge = false;
        return chooseIndex
    };
    return indexRandom;
}

function finishSquare(id) {
    for (let i = 0; i < squareArray.length; i++) {
        if (hasThreeValue(squareArray[i])) {
            let showResults = squareResults.filter(res => res.id === squareArray[i].id);
            if (showResults[0].Top === id) {
                return true;
            }
            else if (showResults[0].Left === id) {
                return true;
            }
            else if (showResults[0].Right === id) {
                return true;
            }
            else if (showResults[0].Bottom === id) {
                return true;
            }
            else return false;
        }
    }

}

function goAi() {
    if (rows <= 5 && columns <= 5) {
        let scoreArray = [];
        let bestMove;
        let moves = getAllMovesId();
        console.log(squareArray);
        for (let i = 0; i < moves.length; i++) {
            let index = moves[i];
            if (finishSquare(index)) {
                scoreArray.push({
                    id: index,
                    eval: 3
                })
            }
            else {
                scoreArray.push({
                    id: index,
                    eval: 2
                })
            }
        }
        const maxIndex = scoreArray.reduce((accumulate, currentIndex) => {
            if (accumulate.eval < currentIndex.eval) {
                accumulate = currentIndex;
            }
            return accumulate;
        }, {
            id: "",
            eval: 0,
        });
        bestMove = maxIndex.id;
        playerRole = 1;
        playerTemp = 0;
        return bestMove;
    }
    let result = goAiwithDepthEquals1();
    return result;
}

const scores = {
    bestMove: 1,
    worstMove: -1,
}


function checkMove(ArraySquare) {
    console.log("CheckMove", (ArraySquare));
    let check = ArraySquare.some(items => {
        return hasThreeValue(items);
    })
    return check ? "worstMove" : "bestMove";
}


function randomChooseLine(id) {
    let Top = parseFloat((parseFloat(id) - 1).toFixed(5));
    let Bottom = parseFloat((parseFloat(id) + 1).toFixed(5));
    if (parseFloat((id % 1).toFixed(1)) % 1 >= 0.9) {
        var checkRight = Math.ceil(id) + (Math.floor(id) - id);
        var checkLeft = parseFloat((parseFloat(id) - incrementDecimal(id)).toFixed(5));
    }
    else {

        var checkRight = parseFloat((parseFloat(id) + incrementDecimal(id)).toFixed(5));
        var checkLeft = parseFloat((parseFloat(id) - incrementDecimal(id)).toFixed(5));
    }
    let Random = Math.floor(Math.random() * 4);
    if (Random === 0) return Top;
    else if (Random === 1) return Bottom;
    else if (Random === 2) return checkRight;
    else return checkLeft;
}

function minimax(board, depth, isMaximizing) {
    let winner = checkMove(board);
    if (depth === 0 && winner !== null) {
        console.log(scores[winner]);
        return scores[winner];
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        board.forEach(items => {
            if (items.filled === false) {
                let squareTemp = updateSquare(randomChooseLine(items.id), items.id);
                let score = minimax(squareTemp, depth - 1, false);
                console.log("squareTemp", squareTemp);
                bestScore = Math.max(score, bestScore);
            }
        })
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        board.forEach(items => {
            if (items.filled === false) {
                let squareTemp = updateSquare(randomChooseLine(items.id), items.id);
                let score = minimax(squareTemp, depth - 1, true);
                bestScore = Math.min(score, bestScore);
            }
        });
        return bestScore;
    }
}



//Hàm lấy 2 chữ số sau dấu thập phân
function roundFixedNumber(number) {
    return parseFloat(parseFloat(number).toFixed(2));
}


var initalSquare = squareArray;
console.log(initalSquare);


//Hàm chuyển đổi vai trò
function playerRoleSwitch(event) {
    if (playerRole == 1) {
        event.target.classList.add('active');
        event.target.classList.add('blue');
        playerRole = 0;
        playerTemp = 1;
    }
}



function countDecimals(value) {
    return value.toString().split(".")[1].length || 0;
}



function incrementDecimal(value) {
    if (countDecimals(value) === 1) {
        return 0.1;
    }
    else {
        return 1 / Math.pow(10, countDecimals(value));
    }
}

function aiMove() {
    setTimeout(() => {
        var indexAi = goAi();
        document.getElementById(indexAi).classList.add('disabled');
        document.getElementById(indexAi).classList.add('animate');
        if (rows <= 5 && columns <= 5) {
            document.getElementById(indexAi).classList.add('active');
            document.getElementById(indexAi).classList.add('red');
        }
        if (indexAi !== ' ') {
            var indexLine = parseFloat(parseFloat(indexAi).toFixed(5));
            var countIndex = indexAi;

            squareArray = updateSquare(indexLine, countIndex);
            isSquareFilled(squareArray);
        }
        else {
            alert("End game");
        }

    }, DELAY_TIME)
}

function lineClickListener(event) {
    playerRoleSwitch(event);
    var indexLine = parseFloat(parseFloat(event.target.id).toFixed(5));
    var countIndex = event.target.id;
    event.target.classList.add('animate');
    (event.target).classList.add('disabled');
    squareArray = updateSquare(indexLine, countIndex);
    isSquareFilled(squareArray);
    if (flagPlayer === false) {
        aiMove();
    }
    flagPlayer = false;
}

function updateSquare(indexLine, countIndex) {
    let updateSquareList = squareArray.reduce((accumulate, currentValue) => {
        let checkTop = parseFloat((parseFloat(currentValue.id) - 1).toFixed(5));
        if (parseFloat((currentValue.id % 1).toFixed(1)) % 1 >= 0.9) {
            var checkRight = Math.ceil(currentValue.id) + (Math.floor(currentValue.id) - currentValue.id);
            var checkLeft = parseFloat((parseFloat(currentValue.id) - incrementDecimal(countIndex)).toFixed(5));
        }
        else {

            var checkRight = parseFloat((parseFloat(currentValue.id) + incrementDecimal(countIndex)).toFixed(5));
            var checkLeft = parseFloat((parseFloat(currentValue.id) - incrementDecimal(countIndex)).toFixed(5));
        }
        let checkBottom = parseFloat((parseFloat(currentValue.id) + 1).toFixed(5));
        let updatedItem = { ...currentValue }
        if (indexLine === checkTop) {
            updatedItem = {
                ...updatedItem,
                id: currentValue.id,
                Top: indexLine.toString()
            }
        }
        if (indexLine === checkRight) {
            updatedItem = {
                ...updatedItem,
                id: currentValue.id,
                Right: indexLine.toString(),

            }
        }
        if (indexLine === checkBottom) {
            updatedItem = {
                ...updatedItem,
                id: currentValue.id,
                Bottom: indexLine.toString(),
            }
        }
        if (indexLine === checkLeft) {
            updatedItem = {
                ...updatedItem,
                id: currentValue.id,
                Left: indexLine.toString(),
            }
        }
        accumulate.push(updatedItem)
        return accumulate;

    }, [])
    //Cập nhập lại array với các thông số được clicked, hãy f12 để xem chi tiết , sau khi click thì hãy xem xem mảng đc cập nhập
    // squareArray = updateSquareList;
    return updateSquareList;

}



function isSquareFilled(square_array) {
    square_array.forEach(element => {
        if (!element.filled && element.Top !== '' && element.Bottom !== '' && element.Left !== '' && element.Right !== '') {
            let squareFilled = document.getElementById(element.id);
            if (playerTemp == 0) {
                squareFilled.classList.add('red');
                playerRole = playerTemp;
                scorePlayer2++;
                player2.textContent = scorePlayer2;
                aiMove();
            }
            else {
                squareFilled.classList.add('blue');
                playerRole = playerTemp;
                scorePlayer1++;
                player1.textContent = scorePlayer1;
                flagPlayer = true;
            }
            squareFilled.classList.add('squareShown');
            squareFilled.classList.add('animate');
            element.filled = true;
        }
    }
    );
    let check = square_array.every(items => items.filled);
    if (check) {
        if (scorePlayer1 > scorePlayer2) alert("The winner is Player1");
        else alert("The winner is Player2");
    }
}


// if (items.Top === '') {
//     console.log('Itemns choose', items);
//     let left = parseFloat((parseFloat(items.Left)).toFixed(5));
//     let right = parseFloat((parseFloat(items.Right)).toFixed(5));
//     let bottom = parseFloat((parseFloat(items.Bottom)).toFixed(5));
//     let squareValue = parseFloat((parseFloat(items.id)).toFixed(5));
//     let result = ((squareValue - ((left + right + bottom) / 4)) * 4).toFixed(countSquare);
//     chooseIndex = result;
//     checkSquare3Edge = true;
//     console.log("TOP", result);
// }
// else if (items.Left === '') {
//     let Top = parseFloat((parseFloat(items.Top)).toFixed(5));
//     let Right = parseFloat((parseFloat(items.Right)).toFixed(5));
//     let Bottom = parseFloat((parseFloat(items.Bottom)).toFixed(5));
//     let squareValue = parseFloat((parseFloat(items.id)).toFixed(5));
//     let result = ((squareValue - ((Top + Right + Bottom) / 4)) * 4).toFixed(countSquare);
//     chooseIndex = result;
//     checkSquare3Edge = true;
//     console.log("LEFT", result);

// }
// else if (items.Right === '') {
//     let left = parseFloat((parseFloat(items.Left)).toFixed(5));
//     let Top = parseFloat((parseFloat(items.Top)).toFixed(5));
//     let Bottom = parseFloat((parseFloat(items.Bottom)).toFixed(5));
//     let squareValue = parseFloat((parseFloat(items.id)).toFixed(5));
//     let result = ((squareValue - ((left + Top + Bottom) / 4)) * 4).toFixed(countSquare);
//     chooseIndex = result;
//     checkSquare3Edge = true;
//     console.log("RIGHT", result);
// }
// else if (items.Bottom === '') {
//     let left = parseFloat((parseFloat(items.Left)).toFixed(5));
//     let Right = parseFloat((parseFloat(items.Right)).toFixed(5));
//     let Top = parseFloat((parseFloat(items.Top)).toFixed(5));
//     let squareValue = parseFloat((parseFloat(items.id)).toFixed(5));
//     let result = ((squareValue - ((left + Right + Top) / 4)) * 4).toFixed(countSquare);
//     chooseIndex = result;
//     checkSquare3Edge = true;
//     console.log("BOTTOm", result);
// }