// Tab Switching Logic
function switchTab(tabId) {
    // Reset buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = 'tab-btn px-4 py-2 rounded-md font-medium transition-colors text-slate-500 hover:text-slate-900 hover:bg-slate-100';
    });
    // Active button
    const activeBtn = document.getElementById('tab-' + tabId);
    activeBtn.className = 'tab-btn px-4 py-2 rounded-md font-medium transition-colors text-brand-600 bg-brand-50';

    // Hide all content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('opacity-100', 'pointer-events-auto');
        content.classList.add('opacity-0', 'pointer-events-none');
    });
    // Show active content
    const activeContent = document.getElementById('content-' + tabId);
    activeContent.classList.remove('opacity-0', 'pointer-events-none');
    activeContent.classList.add('opacity-100', 'pointer-events-auto');
}

// Countdown Timer Logic
const targetDate = new Date("2026-11-03T00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("countdown-container").innerHTML = "<div class='text-brand-600 font-bold'>Election Day!</div>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timeBlocks = [
        { label: 'Days', value: days },
        { label: 'Hrs', value: hours },
        { label: 'Min', value: minutes },
        { label: 'Sec', value: seconds }
    ];

    let html = '';
    timeBlocks.forEach(block => {
        html += `
            <div class="flex flex-col bg-white rounded-lg px-3 py-2 border border-slate-200 shadow-sm min-w-[50px] items-center">
                <span class="text-xl font-bold text-slate-800">${block.value.toString().padStart(2, '0')}</span>
                <span class="text-[10px] text-slate-500 font-medium uppercase">${block.label}</span>
            </div>
        `;
    });

    document.getElementById("countdown-container").innerHTML = html;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Flashcard Logic
const flashcardsData = [
    { term: "Electoral College", def: "A body of electors established by the US Constitution, which forms every four years for the sole purpose of electing the president and vice president." },
    { term: "Primary Election", def: "An election that narrows the field of candidates before a general election for office." },
    { term: "Caucus", def: "A meeting of supporters or members of a specific political party or movement to choose candidates or determine policy." },
    { term: "Gerrymandering", def: "The practice of drawing electoral district lines to favor one political party, individual, or constituency." },
    { term: "Filibuster", def: "A political procedure where one or more members of parliament or congress debate over a proposed piece of legislation to delay or entirely prevent a decision." },
    { term: "Incumbent", def: "The current holder of a political office running for re-election." },
    { term: "Swing State", def: "A US state where the two major political parties have similar levels of support among voters." },
    { term: "Absentee Voting", def: "A vote cast by someone who is unable or unwilling to attend the official polling station." },
    { term: "Ballot Initiative", def: "A means by which a petition signed by voters can force a public vote on a proposed statute." },
    { term: "PAC", def: "An organization that pools campaign contributions from members and donates those funds to campaigns." }
];

let currentCardIndex = 0;
const cardElement = document.getElementById('flashcard');
const termElement = document.getElementById('card-term');
const defElement = document.getElementById('card-def');
const counterElement = document.getElementById('card-counter');

function updateCardContent() {
    if (cardElement.classList.contains('is-flipped')) {
        cardElement.classList.remove('transition-transform');
        cardElement.classList.remove('is-flipped');
        setTimeout(() => {
            cardElement.classList.add('transition-transform');
            setCardText();
        }, 50);
    } else {
        setCardText();
    }
}

function setCardText() {
    termElement.textContent = flashcardsData[currentCardIndex].term;
    defElement.textContent = flashcardsData[currentCardIndex].def;
    counterElement.textContent = `${currentCardIndex + 1} / ${flashcardsData.length}`;
}

function flipCard() {
    cardElement.classList.toggle('is-flipped');
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
    updateCardContent();
}

function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
    updateCardContent();
}

updateCardContent();

// Chart Logic
document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('pollChart').getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)'); // brand-500
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2004', '2008', '2012', '2016', '2020', '2024'],
            datasets: [{
                label: 'Voter Turnout (%)',
                data: [60.1, 61.6, 58.6, 60.1, 66.8, 65.2],
                borderColor: '#3b82f6',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#3b82f6',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleColor: '#fff',
                    bodyColor: '#e2e8f0',
                    padding: 10,
                    borderColor: '#334155',
                    borderWidth: 1,
                    displayColors: false,
                }
            },
            scales: {
                y: {
                    min: 50,
                    max: 75,
                    grid: { color: '#e2e8f0', drawBorder: false },
                    ticks: { color: '#64748b' }
                },
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: { color: '#64748b' }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });
});

// Chat Logic
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `flex items-start gap-4 chat-animate ${isUser ? 'flex-row-reverse' : ''}`;
    
    if (isUser) {
        msgDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 shadow-sm">
                <i class="fa-solid fa-user text-xs text-white"></i>
            </div>
            <div class="bg-brand-600 text-white rounded-2xl rounded-tr-sm p-4 text-sm max-w-[85%] shadow-sm">
                ${text}
            </div>
        `;
    } else {
        msgDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0 shadow-md">
                <i class="fa-solid fa-robot text-xs text-white"></i>
            </div>
            <div class="bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm p-4 text-sm max-w-[85%] shadow-sm">
                ${text}
            </div>
        `;
    }

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const msgDiv = document.createElement('div');
    msgDiv.id = 'typing-indicator';
    msgDiv.className = 'flex items-start gap-4 chat-animate';
    
    msgDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0 shadow-md">
            <i class="fa-solid fa-robot text-xs text-white"></i>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-1 h-12">
            <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
            <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
            <div class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
        </div>
    `;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

function clearChat() {
    chatMessages.innerHTML = `
        <div class="flex items-start gap-4 chat-animate">
            <div class="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0 shadow-md">
                <i class="fa-solid fa-robot text-xs text-white"></i>
            </div>
            <div class="bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm p-4 text-sm max-w-[85%] shadow-sm">
                Chat cleared. How can I assist you with election information today?
            </div>
        </div>
    `;
}

function getMockResponse(query) {
    const q = query.toLowerCase();
    if (q.includes("primary") || q.includes("caucus")) return "Primaries and caucuses are ways that political parties choose candidates...";
    if (q.includes("electoral")) return "The Electoral College consists of 538 electors...";
    return "That's a great question about the civic process. While I'm just a mock assistant right now, I encourage you to check official state election websites.";
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, true);
    chatInput.value = '';
    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        appendMessage(getMockResponse(text), false);
    }, 1500);
});

document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        chatInput.value = btn.textContent;
        chatForm.dispatchEvent(new Event('submit'));
    });
});
