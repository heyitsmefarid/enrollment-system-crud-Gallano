document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addStudentBtn");
    const searchInput = document.getElementById("searchInput");

    if (addBtn) addBtn.addEventListener("click", openAddModal);
    if (searchInput) searchInput.addEventListener("keyup", searchStudent);

    fetchStudents();

    // Modal close handler
    document.querySelector(".close").onclick = closeModal;

    // Save (Add/Update) student form submit
    document.getElementById("studentForm").addEventListener("submit", saveStudent);
});

async function fetchStudents() {
    try {
        const response = await fetch("api/students/getStudents.php");
        const result = await response.json();
        if (result.success) {
            renderTable(result.data);
        } else {
            console.error("Error fetching students:", result.error);
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

function renderTable(students) {
    const tbody = document.getElementById("studentTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    students.forEach(stud => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${stud.stud_id}</td>
            <td>${stud.lname} ${stud.fname} ${stud.middle}</td>
            <td>${stud.program_id}</td>
            <td>${stud.allowance}</td>
            <td>
                <button class="update-btn" onclick="openUpdateModal(${stud.stud_id}, '${stud.lname}', '${stud.fname}', '${stud.middle}', '${stud.program_id}', '${stud.allowance}')">Update</button>
                <button class="delete-btn" onclick="deleteStudent(${stud.stud_id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// === MODAL HANDLERS ===
function openAddModal() {
    document.getElementById("modalTitle").textContent = "Add Student";
    document.getElementById("stud_id").value = "";
    document.getElementById("studentForm").reset();
    openModal();
}

function openUpdateModal(id, lname, fname, middle, program_id, allowance) {
    document.getElementById("modalTitle").textContent = "Update Student";
    document.getElementById("stud_id").value = id;
    document.getElementById("lname").value = lname;
    document.getElementById("fname").value = fname;
    document.getElementById("middle").value = middle;
    document.getElementById("program_id").value = program_id;
    document.getElementById("allowance").value = allowance;
    openModal();
}

function openModal() {
    document.getElementById("studentModal").style.display = "block";
}

function closeModal() {
    document.getElementById("studentModal").style.display = "none";
}

// === SAVE (Add/Update) ===
async function saveStudent(e) {
    e.preventDefault();
    const id = document.getElementById("stud_id").value;
    const lname = document.getElementById("lname").value;
    const fname = document.getElementById("fname").value;
    const middle = document.getElementById("middle").value;
    const program_id = document.getElementById("program_id").value;
    const allowance = document.getElementById("allowance").value;

    const formData = new FormData();
    if (id) formData.append("stud_id", id);
    formData.append("lname", lname);
    formData.append("fname", fname);
    formData.append("middle", middle);
    formData.append("program_id", program_id);
    formData.append("allowance", allowance);

    const url = id ? "api/students/updateStudents.php" : "api/students/addStudents.php";

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            alert(result.message);
            closeModal();
            fetchStudents();
        } else {
            alert("Error: " + result.error);
        }
    } catch (err) {
        console.error("Save error:", err);
    }
}

// === DELETE ===
async function deleteStudent(stud_id) {
    if (!confirm("Are you sure you want to delete this student?")) return;
    const formData = new FormData();
    formData.append("stud_id", stud_id);

    try {
        const response = await fetch("api/students/deleteStudents.php", {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            alert(result.message);
            fetchStudents();
        } else {
            alert("Error: " + result.error);
        }
    } catch (err) {
        console.error("Delete error:", err);
    }
}

// === SEARCH ===
function searchStudent() {
    const filter = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#studentTableBody tr");
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
}
