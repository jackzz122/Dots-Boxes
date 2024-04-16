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
// ! Game Pvp
const my2DArrays = [];
//Chỉnh sửa rows and columns để tester nhé, thanks <3
const containerElements = document.createElement('div');
let indexLine = 0, indexVertical = 0;
let playerRole = 1;
let squareArray = [];
let maxLength = rows * columns;
let floatIndex = 0.0;
let incr_double = 0.2;
let incr_single = 0.1;
let incr_square_dbl = 0.2;
let incr_square_single = 0.1;
let round_number = 1;
let interNumber, interSquareIndex;
let playerTemp;
let scorePlayer1 = 0, scorePlayer2 = 0;
let timeLeft = 20;

//Hàm bắt đầu game
if (flag === false) {
    startGame();
}
// Document.body: toàn bộ trang web, containElement: sẽ là nơi chứa ma trận và các thuật toán do đó sẽ được lưu trữ trong này
document.querySelector('.game').append(containerElements);
console.log(my2DArrays);

// setInterval(updateCountDown, 1000);

function updateCountDown() {
    if (playerRole === 1) {
        timeLeft = 20;
        countDownPlayer1.innerHTML = `0:${timeLeft < 10 ? "0" : ""}${timeLeft}`;
    }
    timeLeft--;
}

//Hàm lấy 2 chữ số sau dấu thập phân
function roundFixedNumber(number) {
    return parseFloat(parseFloat(number).toFixed(2));
}

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
        // squareElements.style.marginLeft = '10px';
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
            //!Tạo id cho các thanh ngang, sau này khi mà chọn 1 thanh nào đó thì nó sẽ biết id mà đánh dấu
            //!Sẽ có id cho toàn bộ , kể cả chấm lẫn các thanh dọc , ngang, ô vuông
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
            //Cái này chính là kiểm tra xem nếu id của mình tiến tới những trường hợp như 0.9, 1.9, 2.9 , 3.9, v...v
            //Chúng ta không muốn các số trên nó thành 1, 2, 3, 4 , .. mà cta muốn nó thành 0.10, 1.10, 2.10, 3.10 cơ, để tiện cho việc chia 4
            //Do đó hàm dưới để sinh ra
            if (parseFloat((index % 1).toFixed(round_number)) % 1 >= 0.9) {
                let currentIndex = Math.round(index);
                let pastIndex = roundFixedNumber(index);
                //Công thức dưới chính là: 
                //! phần nguyên + làm tròn - giá trị trước đó: ví dụ đối với số 0.9 thì nó sẽ thành 0 + 1 - 0.9 => 0.10
                floatIndex = parseFloat(roundFixedNumber(interNumber + currentIndex - pastIndex).toFixed(round_number));
                //Cái incr_double, incr_single: chính là để lưu trữ giá trị cộng dồn, 1 thằng lưu giá trị chẵn, 1 thằng lưu giá trị lẻ: ví dụ
                //double: 0.2, 0.4, 0.6
                //single: 0.1, 0.3, 0.5
                //!Lý do nó sinh ra là để cta tập trung chính vào thằng 0.9, 1.9, 2.9, tránh việc số chẵn có thể rơi vào
                //! /=10 tức là mỗi khi hàm thỏa mãn điều kiện thì nó sẽ không còn +0.1 như mặc định nữa mà sẽ cộng thành 0.01, rồi cứ tăng lên theo time 0.001, 0.0001
                incr_double /= 10;
                incr_single /= 10;
                //round_number: chính là số lượng số sau dấu phẩy: ví dụ với 0.1 thì toFixed(1) còn khi vào hàm này sẽ thành toFixed(2) vì bây giờ đã tồn tại 0.10, 0.11, 0.12 nếu k thì nó sẽ làm tròn 1 chữ số mất
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
            // square.classList.add('square');
            square.classList.add('square')
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
}


//Hàm chuyển đổi vai trò
function playerRoleSwitch(event) {
    if (playerRole == 1) {
        event.target.classList.add('active');
        event.target.classList.add('blue');
        playerRole = 0;
        playerTemp = 1;

    }
    else {
        event.target.classList.add('active');
        event.target.classList.add('red');
        playerRole = 1;
        playerTemp = 0;
    }
}

//Hàm sẽ đếm số lượng phần tử sau dấu phẩy
function countDecimals(value) {
    return value.toString().split(".")[1].length || 0;
}


//Hàm đóng vai trò sẽ cộng dồn: ví dụ lúc đầu khi chạy sẽ là + 0.1 để tăng dần id, nhưng khi đến những id mà gồm 2 chữ số sau dấu phẩy thì nó cần cộng với 0.01 để có thể tìm ra được
//các cạnh hvuong mà lưu vào
function incrementDecimal(value) {
    if (countDecimals(value) === 1) {
        return 0.1;
    }
    else {
        return 1 / Math.pow(10, countDecimals(value));
    }
}



function lineClickListener(event) {
    playerRoleSwitch(event);
    // indexLine, đóng vai trò 
    let indexLine = parseFloat(parseFloat(event.target.id).toFixed(5));
    let countIndex = event.target.id;
    event.target.classList.add('animate');
    (event.target).removeEventListener('click', lineClickListener);
    //Câu lệnh hàm reduce: hiểu đơn giản là method của array:
    //Giá trị trả về của nó là 1 array hoàn toàn mới:
    //Do đó tôi dùng để có thể cập nhập mảng của tôi sau mỗi lần click:
    //Với accumulate: là mạng trả về, currentValue là các object square: {id: , Top , Left, Bottom, Right, isFilled}
    //Hiểu đơn giản thì reduce giống như là dùng for để tính tổng các phần tử trong mảng , thằng này không khác gì
    let updateSquareList = squareArray.reduce((accumulate, currentValue) => {
        let checkTop = parseFloat((parseFloat(currentValue.id) - 1).toFixed(5));
        //Kiểm tra xem có phải trường hợp 0.9, 1.9, 2.9 không để khi cộng vào ko thành 1, 2, 3 mà phải thành 0.10, 1.10, 2.10
        if (parseFloat((currentValue.id % 1).toFixed(1)) % 1 >= 0.9) {
            var checkRight = Math.ceil(currentValue.id) + (Math.floor(currentValue.id) - currentValue.id);
            var checkLeft = parseFloat((parseFloat(currentValue.id) - incrementDecimal(countIndex)).toFixed(5));
        }
        else {
            //Công thức tính toán chính là 
            //Right:  id được clicked + 0.1 ví dụ: 0.1 + 0.1 , nếu như id được click là 0.12 => thì incrementDecimal sẽ trả về là 0.01 => 0.12 + 0.01
            //Tương tự với left sẽ là -0.1 hoặc -0.01 cứ tăng dần như thế
            var checkRight = parseFloat((parseFloat(currentValue.id) + incrementDecimal(countIndex)).toFixed(5));
            var checkLeft = parseFloat((parseFloat(currentValue.id) - incrementDecimal(countIndex)).toFixed(5));
        }
        let checkBottom = parseFloat((parseFloat(currentValue.id) + 1).toFixed(5));

        //updatedItem: sao chép lại object hiện tại {...<tên>} tên là destructuring assignment, gg là hiểu, còn ko thì cứ hiểu là sao chép lại object và gán vào biến hiện tại
        let updatedItem = { ...currentValue }
        //Các câu lệnh kiểm tra điều kiện thỏa mãn thì lưu vào thôi, không có vấn đề gì nhiều
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
    squareArray = updateSquareList;
    console.log(squareArray);

    isSquareFilled(squareArray);

}


//Hàm kiểm tra xem hvuong đã được filled chưa:
//Thuật toán:
//Mỗi khi click thì sẽ lưu giá trị id được clicked vào các object square:
//Kiểm tra xem object nào đủ 4 cạnh Top , Left, Right, Bottom
//Thì sẽ thay đổi biến isFilled từ false thành true
// PlayerTemp ở đây là lưu trạng thái trước đó xem là của ng chơi 1 hay ng chơi 2
//Thông thường là khi cta click thì trạng thái player sẽ thay đổi liên tục từ 0 - 1 , do đó khi ấn 1 phần tử thì tại thời điểm cta ấn giả sử là 0 thì trạng thái hiện tại của player sẽ là 1
//Do đó cần 1 biến lưu lại trạng thái trc đó
function isSquareFilled(square_array) {
    let flag = 0;
    square_array.forEach(element => {
        if (!element.filled && element.Top !== '' && element.Bottom !== '' && element.Left !== '' && element.Right !== '') {
            let squareFilled = document.getElementById(element.id);
            // console.log(playerTemp)
            if (playerTemp == 0) {
                squareFilled.classList.add('red');
                scorePlayer1++;
                player2.textContent = scorePlayer1;
                playerRole = playerTemp;
            }
            else {
                squareFilled.classList.add('blue');
                scorePlayer2++;
                player1.textContent = scorePlayer2;
                playerRole = playerTemp;
            }
            squareFilled.classList.add('squareShown');
            squareFilled.classList.add('animate');
            element.filled = true;
        }
    });

    let check = square_array.every(items => items.filled);
    if (check) {
        if (scorePlayer1 > scorePlayer2) alert("The winner is Player1");
        else alert("The winner is Player2");
    }

}