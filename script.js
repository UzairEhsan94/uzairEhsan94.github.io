// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    themeBtn.innerText = targetTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Add New Course Row
function addCourse() {
    const container = document.getElementById('course-list');
    const row = document.createElement('div');
    row.className = 'row g-2 mb-3 course-row align-items-end';
    row.innerHTML = `
        <div class="col-md-5"><input type="text" class="form-control" placeholder="Course Title"></div>
        <div class="col-md-3"><input type="number" class="form-control marks" placeholder="0-100"></div>
        <div class="col-md-3"><input type="number" class="form-control credits" placeholder="Credits"></div>
        <div class="col-md-1"><button class="btn btn-sm text-danger" onclick="this.parentElement.parentElement.remove()">✕</button></div>
    `;
    container.appendChild(row);
}

// UMT Grading Scale Points
function getPoints(m) {
    if (m >= 85) return 4.0;
    if (m >= 80) return 3.7;
    if (m >= 75) return 3.3;
    if (m >= 70) return 3.0;
    if (m >= 65) return 2.7;
    if (m >= 61) return 2.3;
    if (m >= 58) return 2.0;
    return 0.0;
}

// Calculate GPA
function calculateGPA() {
    const marks = document.querySelectorAll('.marks');
    const credits = document.querySelectorAll('.credits');
    let totalQP = 0, totalCr = 0;

    marks.forEach((mInput, i) => {
        let m = parseFloat(mInput.value);
        let c = parseFloat(credits[i].value);
        if (!isNaN(m) && !isNaN(c)) {
            totalQP += (getPoints(m) * c);
            totalCr += c;
        }
    });

    const res = totalCr > 0 ? (totalQP / totalCr).toFixed(2) : "0.00";
    document.getElementById('gpa-display').innerText = res;
    if (totalCr > 0) document.getElementById('download-btn').style.display = 'inline-block';
}

// Generate PDF Transcript
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(139, 0, 0);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("UMT LAHORE - OFFICIAL TRANSCRIPT CLONE", 20, 22);

    // Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Student: Muhammad Uzair Ehsan`, 20, 45);
    doc.text(`ID: COSC231103002`, 20, 52);
    doc.text(`GPA: ${document.getElementById('gpa-display').innerText}`, 20, 59);

    // Table
    doc.line(20, 65, 190, 65);
    doc.text("Courses Summary", 20, 72);
    doc.save("Uzair_Ehsan_UMT_Portal.pdf");
}
