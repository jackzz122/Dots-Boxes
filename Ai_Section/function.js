// document.querySelector('.setting-btn').addEventListener('click', () => {
//     document.querySelector('.infor_settings').classList.toggle('hidden');
// })
const player1 = document.querySelector('.playerScore');
const player2 = document.querySelector('.ComputerScore');
const countDownPlayer1 = document.querySelector('.countDown1');
const countDownPlayer2 = document.querySelector('.countDown2');
const btnQuit = document.querySelector('.btn_quit');
const showBox = document.querySelector('.show-box');
const showMode = document.querySelector('.show-mode');
const yesBtn = document.querySelector('.yesBtn');
const cancelBtn = document.querySelector('.CancelBtn');
const closeBtn = document.querySelector('.closeBtn');

btnQuit.addEventListener('click', e => {
    showBox.classList.toggle('hidden');
});
yesBtn.addEventListener('click', e => {
    window.location.href = "../Main_Section/index.html";
})
cancelBtn.addEventListener('click', e => {
    showBox.classList.add('hidden');
})
closeBtn.addEventListener('click', e => {
    showMode.classList.add('hidden')
})
