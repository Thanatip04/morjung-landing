// <!-- Initialization Script -->
        lucide.createIcons();
 
    // --- Configuration & Demo Data ---
    // ตั้งค่าตัวเลขเริ่มต้น (Base Count) สำหรับช่วง Demo
    const BASE_COUNT = 0; 
    const counterElement = document.getElementById('userCount');
    const demoBtn = document.getElementById('demoButton');

    // --- 1. Functions สำหรับจัดการตัวเลข ---
    
    // ฟังก์ชันดึงยอดการกดจากเครื่อง (LocalStorage)
    function getLocalClickCount() {
        const localClicks = localStorage.getItem('morjung_demo_clicks') || 0;
        return parseInt(localClicks);
    }

    // ฟังก์ชันอัปเดตตัวเลขบนหน้าเว็บ
    function updateDisplay() {
        const totalCount = BASE_COUNT + getLocalClickCount();
        counterElement.innerText = totalCount.toLocaleString();
    }

    // --- 2. Backend / API Bridge (แยกส่วนไว้เชื่อมต่อภายหลัง) ---
    // async function syncWithBackend(currentClick) {
    //     /* 
    //       Backend เสร็จ ให้เอา Code ด้านล่างนี้ไปใช้งาน:
           
    //        try {
    //            const response = await fetch('https://api.morjung.com/v1/track-demo', {
    //                method: 'POST',
    //                headers: { 'Content-Type': 'application/json' },
    //                body: JSON.stringify({ click_event: currentClick })
    //            });
    //            const data = await response.json();
    //            // อัปเดต BASE_COUNT จาก Database จริง
    //            // counterElement.innerText = data.total_users;
    //        } catch (error) {
    //            console.error('API Error:', error);
    //        }
    //     */
    //     console.log('Backend Bridge: Data is ready to be sent to API');
    // }

    // --- 3. Event Listeners ---
    demoBtn.addEventListener('click', (e) => {
        const currentClicks = getLocalClickCount();
        localStorage.setItem('morjung_demo_clicks', currentClicks + 1);

        updateDisplay();
        // 3. เรียกฟังก์ชันรอเชื่อม API
        syncWithBackend(currentClicks + 1);
    });
    updateDisplay();

    // (Fake Live Activity)
    // setInterval(() => {
    //     if(Math.random() > 0.9) { 
    //         updateDisplay();
    //     }
    // }, 10000);
