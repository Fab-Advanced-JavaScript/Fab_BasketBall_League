const init_openQuiz = () => {
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', openWindow);

}
const openWindow = () => {
    // window.open("http://localhost:8080/quiz") this load an html page in a new tab
    window.location.href = "http://localhost:8080/quiz"; // this will an html page with another html page
}
window.addEventListener('load', init_openQuiz);