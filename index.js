// Dashboard counters
let totalJobs = document.getElementById('total-job');
let totalInterview = document.getElementById('total-interview');
let totalReject = document.getElementById('total-reject');

// Toggle buttons
let allBtn = document.getElementById('all-btn');
let interviewBtn = document.getElementById('interview-btn');
let rejectBtn = document.getElementById('reject-btn');

// State lists
let toggleInterviewList = [];
let toggleRejectList = [];

// DOM Sections
let sectionCards = document.getElementById('section-cards');
let heroSection = document.querySelector('.hero-section');
let toggleSection = document.getElementById('toggle-section');


function jobCount() {
    totalJobs.innerText = sectionCards.children.length;
    totalInterview.innerText = toggleInterviewList.length;
    totalReject.innerText = toggleRejectList.length;
}
jobCount();

// toggle Handler
function toggleHandler(id) {
    let buttons = [allBtn, interviewBtn, rejectBtn];


    for (let btn of buttons) {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-white', 'text-gray-400');
    }

    const clickedBtn = document.getElementById(id);
    clickedBtn.classList.remove('bg-white', 'text-gray-400');
    clickedBtn.classList.add('bg-blue-500', 'text-white');

    if (id === 'all-btn') {
        sectionCards.classList.remove('hidden');
        toggleSection.classList.add('hidden');
    } else if (id === 'interview-btn') {
        sectionCards.classList.add('hidden');
        toggleSection.classList.remove('hidden');
        interviewRender();
    } else if (id === 'reject-btn') {
        sectionCards.classList.add('hidden');
        toggleSection.classList.remove('hidden');
        rejectRender();
    }
}

// event deligation
heroSection.addEventListener('click', function (event) {


    const btn = event.target.closest('button');
    if (!btn) return;

    const card = btn.closest('.all_card');
    if (!card) return;

    const companyName = card.querySelector('.company-name').innerText;
    const position = card.querySelector('.employee-position').innerText;
    const salary = card.querySelector('.place-salary').innerText;
    const description = card.querySelector('.job-description').innerText;

    const companyInfo = {
        companyName,
        position,
        salary,
        description,
        btnInterviews: 'Interview',
        btnRejects: 'Rejected'
    };


    if (btn.querySelector('.fa-trash') || btn.classList.contains('fa-trash')) {


        card.remove();


        toggleInterviewList = toggleInterviewList.filter(item => item.companyName !== companyName);
        toggleRejectList = toggleRejectList.filter(item => item.companyName !== companyName);


        jobCount();
        if (!toggleSection.classList.contains('hidden')) {
            if (interviewBtn.classList.contains('bg-blue-500')) {
                interviewRender();
            } else if (rejectBtn.classList.contains('bg-blue-500')) {
                rejectRender();
            }
        }
        return;
    }

    // Interview 
    if (btn.classList.contains('interview-btn')) {

        let newRejectList = [];
        for (let item of toggleRejectList) {
            if (item.companyName !== companyName) newRejectList.push(item);
        }
        toggleRejectList = newRejectList;


        let exists = false;
        for (let item of toggleInterviewList) {
            if (item.companyName === companyName) exists = true;
        }
        if (!exists) {
            companyInfo.btnApply = 'Interview';
            toggleInterviewList.push(companyInfo);
        }

        card.querySelector('.btn_apply').innerText = 'Interview';
        jobCount();
        if (!toggleSection.classList.contains('hidden')) {
            if (rejectBtn.classList.contains('bg-blue-500')) {
                rejectRender();
            } else {
                interviewRender();
            }



        }
    }


    if (btn.classList.contains('reject-btn')) {

        let newInterviewList = [];
        for (let item of toggleInterviewList) {
            if (item.companyName !== companyName) newInterviewList.push(item);
        }
        toggleInterviewList = newInterviewList;


        let exists = false;
        for (let item of toggleRejectList) {
            if (item.companyName === companyName) exists = true;
        }
        if (!exists) {
            companyInfo.btnApply = 'Rejected';
            toggleRejectList.push(companyInfo);
        }

        card.querySelector('.btn_apply').innerText = 'Rejected';
        jobCount();
        if (!toggleSection.classList.contains('hidden')) {
            if (interviewBtn.classList.contains('bg-blue-500')) {
                interviewRender();
            } else {
                rejectRender();
            }
        }
    }
});

// card create
function createCardElement(item) {
    let div = document.createElement('div');
    div.className = 'all_card bg-white p-8 mb-4';
    div.innerHTML = `
        <div class="flex justify-between">
            <div>
                <h3 class="company-name text-2xl font-bold text-blue-950">${item.companyName}</h3>
                <p class="employee-position text-gray-400 py-2">${item.position}</p>
            </div>
             <div>
                            <button class="px-2 rounded-full bg-gray-200 py-1.5 cursor-pointer"><i
                                        class="fa-solid fa-trash"></i></button>
                        </div>
        </div>
        <p class="place-salary text-gray-400 py-2">${item.salary}</p>
        <button class="btn_apply bg-blue-100 px-6 py-3 text-blue-950 text-2xl rounded-sm">${item.btnApply}</button>
        <p class="job-description text-gray-700 py-2">${item.description}</p>
        <div class="flex gap-4 py-4">
            <button class="interview-btn border-2 border-green-400 text-xl text-green-400 px-6 py-2 cursor-pointer">${item.btnInterviews}</button>
            <button class="reject-btn border-2 border-red-400 text-xl text-red-400 px-6 py-2 cursor-pointer">${item.btnRejects}</button>
        </div>
    `;
    return div;
}


function interviewRender() {
    toggleSection.innerHTML = "";
    if (toggleInterviewList.length === 0) {
        toggleSection.innerHTML = `
         <div class = "w-full  mx-auto bg-white text-center "> 
         <img class = "p-14 mx-auto" src="./jobs.png">
         <h3 class = "text-2xl font-bold text-blue-950 pb-2" >No jobs available</h3>
         <p class = "text-xl text-gray-400 pb-20">Check back soon for new job opportunities</p>
         </div>
        `;
        return;
    }
    for (let item of toggleInterviewList) {
        toggleSection.appendChild(createCardElement(item));
    }
}

function rejectRender() {
    toggleSection.innerHTML = "";
    if (toggleRejectList.length === 0) {
        toggleSection.innerHTML = `
         <div class = "w-full  mx-auto bg-white text-center "> 
         <img class = "p-14 mx-auto" src="./jobs.png">
         <h3 class = "text-2xl font-bold text-blue-950 pb-2" >No jobs available</h3>
         <p class = "text-xl text-gray-400 pb-20">Check back soon for new job opportunities</p>
         </div>
        `;
        return;
    }
    for (let item of toggleRejectList) {
        toggleSection.appendChild(createCardElement(item));
    }
}



