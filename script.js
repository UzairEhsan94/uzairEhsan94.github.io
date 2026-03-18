// Add Course Row
function addRow() {
    const container = document.getElementById('course-rows');
    const div = document.createElement('div');
    div.className = 'row g-3 mb-3 course-item';
    div.innerHTML = `
        <div class="col-md-6"><input type="text" class="form-control uni-input" placeholder="Course Title"></div>
        <div class="col-md-3"><input type="number" class="form-control uni-input marks" placeholder="Marks"></div>
        <div class="col-md-3"><input type="number" class="form-control uni-input credits" placeholder="Credits"></div>
    `;
    container.appendChild(div);
}

// UMT Grading Points
function getGradePoints(m) {
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
    const marksArr = document.querySelectorAll('.marks');
    const creditsArr = document.querySelectorAll('.credits');
    let totalPoints = 0;
    let totalCredits = 0;

    marksArr.forEach((markInput, i) => {
        let m = parseFloat(markInput.value);
        let c = parseFloat(creditsArr[i].value);
        if (!isNaN(m) && !isNaN(c)) {
            totalPoints += (getGradePoints(m) * c);
            totalCredits += c;
        }
    });

    const final = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    document.getElementById('gpa-output').innerText = final;
    document.getElementById('pdf-btn').style.display = 'inline-block';
}

// PDF Download
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("UNIVERSITY TRANSCRIPT CLONE", 20, 20);
    doc.setFontSize(12);
    doc.text(`Student: Muhammad Uzair Ehsan`, 20, 40);
    doc.text(`Roll No: COSC231103002`, 20, 50);
    doc.text(`Current GPA: ${document.getElementById('gpa-output').innerText}`, 20, 60);
    doc.save("Uzair_Ehsan_Transcript.pdf");
}

// Theme Toggle
document.getElementById('theme-btn').addEventListener('click', () => {
    const body = document.body;
    const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', theme);
});
