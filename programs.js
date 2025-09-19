document.addEventListener("DOMContentLoaded", () => {
    const addProgramBtn = document.getElementById("addProgramBtn");
    const addInstituteBtn = document.getElementById("addInstituteBtn");
    const searchProgramInput = document.getElementById("searchProgramInput");
    const searchInstituteInput = document.getElementById("searchInstituteInput");

    if (addProgramBtn) addProgramBtn.addEventListener("click", openAddProgramModal);
    if (addInstituteBtn) addInstituteBtn.addEventListener("click", openAddInstituteModal);
    if (searchProgramInput) searchProgramInput.addEventListener("keyup", searchProgram);
    if (searchInstituteInput) searchInstituteInput.addEventListener("keyup", searchInstitute);

    document.querySelectorAll(".close").forEach(btn => btn.addEventListener("click", closeModal));

    fetchPrograms();
    fetchInstitutes();

    document.getElementById("programForm").addEventListener("submit", saveProgram);
    document.getElementById("instituteForm").addEventListener("submit", saveInstitute);
});

async function fetchPrograms() {
    try {
        const res = await fetch("api/program/getProgram.php");
        const result = await res.json();
        if (result.success) renderProgramTable(result.data);
    } catch (err) {
        console.error("Fetch programs error:", err);
    }
}

async function fetchInstitutes() {
    try {
        const res = await fetch("api/program/getInstitute.php");
        const result = await res.json();
        if (result.success) {
            renderInstituteTable(result.data);
            populateProgramInstituteOptions(result.data);
        }
    } catch (err) {
        console.error("Fetch institutes error:", err);
    }
}

function renderProgramTable(programs) {
    const tbody = document.getElementById("programTableBody");
    tbody.innerHTML = "";
    programs.forEach(prog => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${prog.program_id}</td>
            <td>${prog.program_name}</td>
            <td>${prog.ins_name || "-"}</td>
            <td>
                <button class="update-btn" onclick="openUpdateProgramModal('${prog.program_id}','${prog.program_name}','${prog.ins_id}')">Update</button>
                <button class="delete-btn" onclick="deleteProgram('${prog.program_id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderInstituteTable(institutes) {
    const tbody = document.getElementById("instituteTableBody");
    tbody.innerHTML = "";
    institutes.forEach(ins => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${ins.ins_id}</td>
            <td>${ins.ins_name}</td>
            <td>
                <button class="update-btn" onclick="openUpdateInstituteModal('${ins.ins_id}','${ins.ins_name}')">Update</button>
                <button class="delete-btn" onclick="deleteInstitute('${ins.ins_id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function populateProgramInstituteOptions(institutes) {
    const select = document.getElementById("program_ins_id");
    if (!select) return;
    select.innerHTML = "";
    institutes.forEach(ins => {
        const option = document.createElement("option");
        option.value = ins.ins_id;
        option.textContent = ins.ins_name;
        select.appendChild(option);
    });
}

function openAddProgramModal() {
    document.getElementById("modalTitle").textContent = "Add Program";
    document.getElementById("program_id").value = "";
    document.getElementById("programForm").reset();
    openModal("programModal");
}

function openUpdateProgramModal(id, name, ins_id) {
    document.getElementById("modalTitle").textContent = "Update Program";
    document.getElementById("program_id").value = id;
    document.getElementById("program_name").value = name;
    document.getElementById("program_ins_id").value = ins_id;
    openModal("programModal");
}

function openAddInstituteModal() {
    document.getElementById("modalTitle").textContent = "Add Institute";
    document.getElementById("ins_id").value = "";
    document.getElementById("instituteForm").reset();
    openModal("instituteModal");
}

function openUpdateInstituteModal(id, name) {
    document.getElementById("modalTitle").textContent = "Update Institute";
    document.getElementById("ins_id").value = id;
    document.getElementById("ins_name").value = name;
    openModal("instituteModal");
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal() {
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}

async function saveProgram(e) {
    e.preventDefault();
    const id = document.getElementById("program_id").value.trim();
    const name = document.getElementById("program_name").value.trim();
    const ins_id = document.getElementById("program_ins_id").value.trim();

    if (!name || !ins_id) { alert("Fill all fields"); return; }

    const formData = new FormData();
    formData.append("program_name", name);
    formData.append("ins_id", ins_id);
    if (id) formData.append("program_id", id);

    const url = id ? "api/program/updateProgram.php" : "api/program/addProgram.php";

    try {
        const res = await fetch(url, { method: "POST", body: formData });
        const result = await res.json();
        if (result.success) {
            alert(result.message);
            closeModal();
            fetchPrograms();
        } else {
            alert("Error: " + result.error);
        }
    } catch (err) {
        console.error("Save program error:", err);
    }
}

async function saveInstitute(e) {
    e.preventDefault();
    const id = document.getElementById("ins_id").value.trim();
    const name = document.getElementById("ins_name").value.trim();

    if (!name) { alert("Fill institute name"); return; }

    const formData = new FormData();
    formData.append("ins_name", name);
    if (id) formData.append("ins_id", id);

    const url = id ? "api/program/updateInstitute.php" : "api/program/addInstitute.php";

    try {
        const res = await fetch(url, { method: "POST", body: formData });
        const result = await res.json();
        if (result.success) {
            alert(result.message);
            closeModal();
            fetchInstitutes();
            fetchPrograms(); 
        } else {
            alert("Error: " + result.error);
        }
    } catch (err) {
        console.error("Save institute error:", err);
    }
}

async function deleteProgram(program_id) {
    if (!confirm("Delete this program?")) return;
    const formData = new FormData();
    formData.append("program_id", program_id);

    try {
        const res = await fetch("api/program/deleteProgram.php", { method: "POST", body: formData });
        const result = await res.json();
        if (result.success) {
            alert(result.message);
            fetchPrograms();
        } else alert("Error: " + result.error);
    } catch (err) {
        console.error("Delete program error:", err);
    }
}

async function deleteInstitute(ins_id) {
    if (!confirm("Delete this institute?")) return;
    const formData = new FormData();
    formData.append("ins_id", ins_id);

    try {
        const res = await fetch("api/program/deleteInstitute.php", { method: "POST", body: formData });
        const result = await res.json();
        if (result.success) {
            alert(result.message);
            fetchInstitutes();
            fetchPrograms(); 
        } else alert("Error: " + result.error);
    } catch (err) {
        console.error("Delete institute error:", err);
    }
}

function searchProgram() {
    const filter = document.getElementById("searchProgramInput").value.toLowerCase();
    document.querySelectorAll("#programTableBody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
}

function searchInstitute() {
    const filter = document.getElementById("searchInstituteInput").value.toLowerCase();
    document.querySelectorAll("#instituteTableBody tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
}
