document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const moonIcon = 'bi-moon-stars-fill';
    const sunIcon = 'bi-sun-fill';

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            darkModeToggle.innerHTML = `<i class="bi ${sunIcon}"></i>`;
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.innerHTML = `<i class="bi ${moonIcon}"></i>`;
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Search Page Logic ---
    if (window.location.pathname.endsWith('search.html')) {
        const searchInput = document.getElementById('searchInput');
        const resultsContainer = document.getElementById('results');
        const noResultsMessage = document.getElementById('noResults');

        // Hard-coded topic data
        const topics = [
            { subject: 'คอมพิวเตอร์', title: 'การออกแบบอัลกอริทึม', content: 'เรียนรู้เทคนิคการออกแบบอัลกอริทึม เช่น Divide and Conquer, Dynamic Programming, Greedy Algorithms' },
            { subject: 'คอมพิวเตอร์', title: 'โครงสร้างข้อมูลพื้นฐาน', content: 'ศึกษา Array, Linked List, Stack, Queue, Tree, และ Graph' },
            { subject: 'คณิตศาสตร์', title: 'ทฤษฎีจำนวนเบื้องต้น', content: 'การหารลงตัว, จำนวนเฉพาะ, และสมภาค (Congruence)' },
            { subject: 'คณิตศาสตร์', title: 'คอมบินาทอริกส์', content: 'หลักการนับ, การจัดหมู่, การเรียงสับเปลี่ยน, และหลักการรังนกพิราบ' },
            { subject: 'ฟิสิกส์', title: 'กลศาสตร์ของนิวตัน', content: 'กฎการเคลื่อนที่, งานและพลังงาน, การดลและโมเมนตัม' },
            { subject: 'ฟิสิกส์', title: 'ไฟฟ้าสถิต', content: 'กฎของคูลอมบ์, สนามไฟฟ้า, ศักย์ไฟฟ้า, และตัวเก็บประจุ' },
            { subject: 'เคมี', title: 'ปริมาณสารสัมพันธ์', content: 'มวลอะตอม, โมล, สูตรเคมี, และสมการเคมี' },
            { subject: 'เคมี', title: 'พันธะเคมี', content: 'พันธะไอออนิก, พันธะโคเวเลนต์, รูปร่างโมเลกุล, และแรงยึดเหนี่ยวระหว่างโมเลกุล' },
            { subject: 'ชีววิทยา', title: 'ชีววิทยาของเซลล์', content: 'โครงสร้างและหน้าที่ของเซลล์, การแบ่งเซลล์, และการหายใจระดับเซลล์' },
            { subject: 'ชีววิทยา', title: 'พันธุศาสตร์เมนเดล', content: 'กฎการถ่ายทอดลักษณะทางพันธุกรรมของเมนเดล' },
            { subject: 'ดาราศาสตร์', title: 'กลศาสตร์ท้องฟ้า', content: 'กฎของเคปเลอร์, กฎความโน้มถ่วงสากล, และวงโคจร' },
            { subject: 'ดาราศาสตร์', title: 'ระบบสุริยะ', content: 'ดาวเคราะห์, ดาวเคราะห์น้อย, ดาวหาง, และวัตถุในแถบคอยเปอร์' },
        ];

        const displayResults = (filteredTopics) => {
            resultsContainer.innerHTML = '';
            if (filteredTopics.length === 0) {
                noResultsMessage.style.display = 'block';
                return;
            }
            
            noResultsMessage.style.display = 'none';
            
            filteredTopics.forEach(topic => {
                const card = `
                    <div class="col-md-6">
                        <div class="card result-card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${topic.title}</h5>
                                <span class="badge bg-primary subject-badge">${topic.subject}</span>
                                <p class="card-text mt-2">${topic.content}</p>
                            </div>
                        </div>
                    </div>
                `;
                resultsContainer.innerHTML += card;
            });
        };

        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            localStorage.setItem('lastSearch', query); // Save last search to localStorage

            if (!query) {
                resultsContainer.innerHTML = '';
                noResultsMessage.style.display = 'none';
                return;
            }

            const filtered = topics.filter(topic => 
                topic.title.toLowerCase().includes(query) || 
                topic.subject.toLowerCase().includes(query)
            );

            displayResults(filtered);
        };
        
        searchInput.addEventListener('keyup', performSearch);
        
        // Load and perform last search from localStorage on page load
        const lastSearch = localStorage.getItem('lastSearch');
        if(lastSearch) {
            searchInput.value = lastSearch;
            performSearch();
        }
    }
});
