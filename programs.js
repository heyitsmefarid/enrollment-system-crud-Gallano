document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addProgramBtn");
    const searchInput = document.getElementById("searchInput");

    if (addBtn) addBtn.addEventListener("click", openAddModal);
    if (searchInput) searchInput.addEventListener("keyup", searchProgram);

    fetchPrograms();

    // Modal close handler
    document.querySelector(".close").onclick = closeModal;

    // Save (Add/Update) program form submit
    document.getElementById("programForm").addEventListener("submit", saveProgram);
});

// === FETCH PROGRAMS ===
async function fetchPrograms() {
    try {
        const response = await fetch("api/program/getProgram.php"); // ✅ singular
        const result = await response.json();
        if (result.success) {
            renderTable(result.data);
        } else {
            console.error("Error fetching programs:", result.error);
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

// === RENDER TABLE ===
function renderTable(programs) {
    const tbody = document.getElementById("programTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    programs.forEach(prog => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${prog.program_id}</td>
            <td>${prog.program_name}</td>
            <td>${prog.ins_id}</td>
            <td>
                <button class="update-btn" 
                    onclick="openUpdateModal('${prog.program_id}', '${prog.program_name}', '${prog.ins_id}')">Update</button>
                <button class="delete-btn" 
                    onclick="deleteProgram('${prog.program_id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// === MODAL HANDLERS ===
function openAddModal() {
    document.getElementById("modalTitle").textContent = "Add Program";
    document.getElementById("program_id").value = ""; // hidden field
    document.getElementById("programForm").reset();
    openModal();
}

function openUpdateModal(id, name, ins_id) {
    document.getElementById("modalTitle").textContent = "Update Program";
    document.getElementById("program_id").value = id; // hidden field
    document.getElementById("program_name").value = name;
    document.getElementById("ins_id").value = ins_id;
    openModal();
}

function openModal() {
    document.getElementById("programModal").style.display = "block";
}

function closeModal() {
    document.getElementById("programModal").style.display = "none";
}

// === SAVE (ADD / UPDATE) ===
async function saveProgram(e) {
    e.preventDefault();
    const id = document.getElementById("program_id").value.trim();
    const name = document.getElementById("program_name").value.trim();
    const ins_id = document.getElementById("ins_id").value.trim();

    const formData = new FormData();
    formData.append("program_name", name);
    formData.append("ins_id", ins_id);
    if (id) formData.append("program_id", id); // only when updating

    // choose URL based on whether id is present
    const url = id ? "api/program/updateProgram.php" : "api/program/addProgram.php";

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            alert(result.message);
            closeModal();
            fetchPrograms();
        } else {
            alert("Error: Invalid Institute ID or this ID don't exist");
        }
    } catch (err) {
        console.error("Save error:", err);
    }
}

// === DELETE ===
async function deleteProgram(program_id) {
    if (!confirm("Are you sure you want to delete this program?")) return;
    const formData = new FormData();
    formData.append("program_id", program_id);

    try {
        const response = await fetch("api/program/deleteProgram.php", {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            alert(result.message);
            fetchPrograms();
        } else {
            alert("Error: " + result.error);
        }
    } catch (err) {
        console.error("Delete error:", err);
    }
}

// === SEARCH ===
function searchProgram() {
    const filter = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#programTableBody tr");
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
}
