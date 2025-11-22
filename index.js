document.getElementById('year').textContent = new Date().getFullYear();
const menuButtons = document.querySelectorAll('nav.menu button');
const pages = document.querySelectorAll('.page');
menuButtons.forEach(btn=>{
btn.addEventListener('click', (e)=>{
const target = btn.getAttribute('data-target');
menuButtons.forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
pages.forEach(p=>{ p.classList.remove('active'); p.setAttribute('aria-hidden','true') });
const page = document.getElementById(target);
if(page){ page.classList.add('active'); page.removeAttribute('aria-hidden'); page.focus(); }
if(target === 'profile') animateSkills();
});
});
let idx = 0;
function showByIndex(i){
idx = (i+menuButtons.length)%menuButtons.length;
menuButtons[idx].click();
}
document.addEventListener('keydown', (e)=>{
if(e.key === 'ArrowRight') showByIndex(idx+1);
if(e.key === 'ArrowLeft') showByIndex(idx-1);
});
function animateSkills(){
document.querySelectorAll('.bar').forEach(bar =>{
const v = Number(bar.getAttribute('data-value')||0);
const fill = bar.querySelector('i');
fill.style.width = '0%';
setTimeout(()=> fill.style.width = v + '%', 50);
});
}
if(document.getElementById('profile').classList.contains('active')) animateSkills();
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.addEventListener('click', (e)=>{
e.preventDefault();
const id = a.getAttribute('href').substring(1);
const targetBtn = Array.from(menuButtons).find(b=>b.getAttribute('data-target')===id);
if(targetBtn) targetBtn.click();
});
});
// ===== Chuyển Trang =====
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

const bubble = document.getElementById("chat-bubble");
const chatBox = document.getElementById("chat-box");

bubble.onclick = () => {
    const isOpen = chatBox.style.display === "flex";

    if (!isOpen) {
        chatBox.style.display = "flex";
        autoGreet(); // thêm lời chào khi mở
    } else {
        chatBox.style.display = "none";
    }
};

// Chat logic
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");

function sendMessage(event) {
    if (event.key === "Enter") {
        let text = chatInput.value.trim();
        if (text === "") return;
        addMsg("Bạn", text);
        chatInput.value = "";
        setTimeout(() => botReply(text), 400);
    }
}

function addMsg(sender, msg) {
    let d = document.createElement("div");
    d.innerHTML = `<b>${sender}:</b> ${msg}`;
    d.style.margin = "6px 0";
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(text) {
    let rep = "";

    if (text.includes("xin chào") || text.includes("hello"))
        rep = "Chào bạn! Mình có thể giúp gì?";
    else if (text.includes("tên"))
        rep = "Mình là chatbot của Hải Anh 😊";
    else
        rep = "Mình chưa hiểu ý bạn, bạn nói rõ hơn nhé!";

    addMsg("Bot", rep);
}

// **Lời chào khi mở chat lần đầu**
let greeted = false;
function autoGreet() {
    if (!greeted) {
        addMsg("Bot", "Chào bạn! Mình là chatbot đây 😊");
        greeted = true;
    }
}
function botReply(text) {
    let link = "https://www.facebook.com/hai.ahhhh"; // ← đổi link của bạn tại đây

    let rep = `
        Đây là link bạn cần:<br>
        <a href="${link}" target="_blank" style="color:orange; font-weight:bold;">
            👉 Nhấp vào đây
        </a>
    `;

    addMsg("Bot", rep);
}