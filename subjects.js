document.addEventListener("DOMContentLoaded", () => {
    const addSubjectBtn = document.getElementById("addSubjectBtn");
    const searchInput = document.getElementById("searchInput");

    if (addSubjectBtn) addSubjectBtn.addEventListener("click", () => openModal("add"));
    if (searchInput) searchInput.addEventListener("keyup", searchSubjects);

    document.querySelector("#subjectModal .close").onclick = closeModal;
    document.getElementById("subjectForm").addEventListener("submit", saveSubject);

    fetchSubjects();
});

async function fetchSubjects() {
    try {
        const res = await fetch("api/subject/getSubject.php");
        const result = await res.json();
        if (!result.success) return console.error(result.error);

        const tbody = document.getElementById("subjectsTableBody");
        tbody.innerHTML = "";

        result.data.forEach(subject => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${subject.subject_id}</td>
                <td>${subject.subject_name}</td>
                <td>${subject.sem_id}</td>
                <td>
                    <button class="update-btn" onclick="editSubject(${subject.subject_id}, '${subject.subject_name}', ${subject.sem_id})">Update</button>
                    <button class="delete-btn" onclick="deleteSubject(${subject.subject_id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("Fetch subjects error:", err);
    }
}

let currentId = null;

function openModal(type = "add") {
    if (type === "add") currentId = null;
    document.getElementById("subjectForm").reset();
    document.getElementById("modalTitle").textContent = type === "add" ? "Add Subject" : "Update Subject";
    document.getElementById("subjectModal").style.display = "block";
}

function closeModal() {
    document.getElementById("subjectModal").style.display = "none";
}

async function saveSubject(e) {
    e.preventDefault();

    const subject_name = document.getElementById("subject_name").value.trim();
    const sem_id = document.getElementById("sem_id").value.trim();

    if (!subject_name || !sem_id) return alert("All fields are required.");

    const formData = new FormData();
    formData.append("subject_name", subject_name);
    formData.append("sem_id", sem_id);
    if (currentId) formData.append("subject_id", currentId);

    const url = currentId ? "api/subject/updateSubject.php" : "api/subject/addSubject.php";

    try {
        const res = await fetch(url, { method: "POST", body: formData });
        const data = await res.json();
        if (data.success) {
            closeModal();
            fetchSubjects();
        } else alert("Error: " + data.error);
    } catch (err) {
        console.error("Save subject error:", err);
    }
}

function editSubject(id, name, semId) {
    currentId = id;
    document.getElementById("subject_name").value = name;
    document.getElementById("sem_id").value = semId;
    openModal("update");
}

async function deleteSubject(id) {
    if (!confirm("Delete this Subject?")) return;

    const formData = new FormData();
    formData.append("subject_id", id);

    try {
        const res = await fetch("api/subject/deleteSubject.php", { method: "POST", body: formData });
        const data = await res.json();
        if (data.success) fetchSubjects();
        else alert("Error: " + data.error);
    } catch (err) {
        console.error("Delete subject error:", err);
    }
}

function searchSubjects() {
    const filter = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#subjectsTableBody tr");
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
}
