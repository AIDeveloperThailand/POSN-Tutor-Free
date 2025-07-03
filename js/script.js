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

        // --- UPDATED TOPICS ARRAY ---
        const topics = [
            // Computer Science
            { subject: 'คอมพิวเตอร์', title: 'การออกแบบอัลกอริทึม', content: 'เรียนรู้เทคนิคการออกแบบอัลกอริทึม เช่น Divide and Conquer, Dynamic Programming, Greedy Algorithms' },
            { subject: 'คอมพิวเตอร์', title: 'โครงสร้างข้อมูลพื้นฐาน', content: 'ศึกษา Array, Linked List, Stack, Queue, Tree, และ Graph' },
            // Mathematics
            { subject: 'คณิตศาสตร์', title: 'ทฤษฎีจำนวนเบื้องต้น', content: 'การหารลงตัว, จำนวนเฉพาะ, และสมภาค (Congruence)' },
            { subject: 'คณิตศาสตร์', title: 'คอมบินาทอริกส์', content: 'หลักการนับ, การจัดหมู่, การเรียงสับเปลี่ยน, และหลักการรังนกพิราบ' },
            // Physics
            { subject: 'ฟิสิกส์', title: 'กลศาสตร์ของนิวตัน', content: 'กฎการเคลื่อนที่, งานและพลังงาน, การดลและโมเมนตัม' },
            { subject: 'ฟิสิกส์', title: 'ไฟฟ้าสถิต', content: 'กฎของคูลอมบ์, สนามไฟฟ้า, ศักย์ไฟฟ้า, และตัวเก็บประจุ' },
            // Chemistry
            { subject: 'เคมี', title: 'ปริมาณสารสัมพันธ์', content: 'มวลอะตอม, โมล, สูตรเคมี, และสมการเคมี' },
            { subject: 'เคมี', title: 'พันธะเคมี', content: 'พันธะไอออนิก, พันธะโคเวเลนต์, รูปร่างโมเลกุล, และแรงยึดเหนี่ยวระหว่างโมเลกุล' },
            // Biology
            { subject: 'ชีววิทยา', title: 'ชีววิทยาของเซลล์', content: 'โครงสร้างและหน้าที่ของเซลล์, การแบ่งเซลล์, และการหายใจระดับเซลล์' },
            { subject: 'ชีววิทยา', title: 'พันธุศาสตร์เมนเดล', content: 'กฎการถ่ายทอดลักษณะทางพันธุกรรมของเมนเดล' },
            // Astronomy (New Content)
            { subject: 'ดาราศาสตร์', title: 'ความรู้เบื้องต้นเกี่ยวกับดาราศาสตร์', content: 'ศึกษาวัตถุท้องฟ้า ปรากฏการณ์นอกโลก และทำความเข้าใจจักรวาล <a href=\'astronomy.html\'>อ่านต่อ...</a>' },
            { subject: 'ดาราศาสตร์', title: 'กฎของเคปเลอร์', content: 'กฎ 3 ข้อที่อธิบายการเคลื่อนที่ของดาวเคราะห์รอบดวงอาทิตย์ในระบบสุริยะ <a href=\'astronomy.html#solar-system\'>อ่านต่อ...</a>' },
            { subject: 'ดาราศาสตร์', title: 'ดาวฤกษ์และดาราจักร', content: 'ศึกษาการกำเนิด วิวัฒนาการของดาวฤกษ์ และโครงสร้างของดาราจักร <a href=\'astronomy.html#stars-galaxies\'>อ่านต่อ...</a>' },
            { subject: 'ดาราศาสตร์', title: 'สมการ E=mc^2', content: 'ความสัมพันธ์ระหว่างมวลและพลังงาน ซึ่งเป็นหัวใจของพลังงานในดาวฤกษ์ <a href=\'astronomy.html#stars-galaxies\'>อ่านต่อ...</a>' },
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
            localStorage.setItem('lastSearch', query); 

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
        
        const lastSearch = localStorage.getItem('lastSearch');
        if(lastSearch) {
            searchInput.value = lastSearch;
            performSearch();
        }
    }
});
