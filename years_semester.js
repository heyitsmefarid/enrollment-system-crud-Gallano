document.addEventListener("DOMContentLoaded", () => {
    const addYearBtn = document.getElementById("addYearBtn");
    const addSemesterBtn = document.getElementById("addSemesterBtn");
    const searchInput = document.getElementById("searchInput");
    const modal = document.getElementById("modal");
    const closeBtn = modal.querySelector(".close");
    const yearForm = document.getElementById("yearForm");
    const semesterForm = document.getElementById("semesterForm");
    const modalTitle = document.getElementById("modalTitle");

    let currentType = "";
    let currentId = null;

    addYearBtn.addEventListener("click", () => openModal("year"));
    addSemesterBtn.addEventListener("click", () => openModal("semester"));
    closeBtn.addEventListener("click", closeModal);
    searchInput.addEventListener("keyup", searchAll);

    yearForm.addEventListener("submit", saveYear);
    semesterForm.addEventListener("submit", saveSemester);

    fetchYears();
    fetchSemesters();

    function openModal(type) {
        currentType = type;
        currentId = null;
        modal.style.display = "block";

        if (type === "year") {
            modalTitle.textContent = "Add Year";
            yearForm.style.display = "block";
            semesterForm.style.display = "none";
            yearForm.reset();
        } else {
            modalTitle.textContent = "Add Semester";
            yearForm.style.display = "none";
            semesterForm.style.display = "block";
            semesterForm.reset();
        }
    }

    function closeModal() {
        modal.style.display = "none";
    }

    async function fetchYears() {
        try {
            const res = await fetch("api/years&semesters/getYear.php");
            const result = await res.json();
            const tbody = document.getElementById("yearsTableBody");
            tbody.innerHTML = "";
            if(result.success) {
                result.data.forEach(y => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${y.year_id}</td>
                        <td>${y.year_from}</td>
                        <td>${y.year_to}</td>
                        <td>
                            <button class="update-btn" onclick="editYear(${y.year_id}, '${y.year_from}', '${y.year_to}')">Update</button>
                            <button class="delete-btn" onclick="deleteYear(${y.year_id})">Delete</button>
                        </td>`;
                    tbody.appendChild(tr);
                });
            }
        } catch(err){ console.error("Fetch years error:", err); }
    }

    async function fetchSemesters() {
        try {
            const res = await fetch("api/years&semesters/getSemester.php");
            const result = await res.json();
            const tbody = document.getElementById("semestersTableBody");
            tbody.innerHTML = "";
            if(result.success) {
                result.data.forEach(s => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${s.sem_id}</td>
                        <td>${s.sem_name}</td>
                        <td>${s.year_id}</td>
                        <td>
                            <button class="update-btn" onclick="editSemester(${s.sem_id}, '${s.sem_name}', ${s.year_id})">Update</button>
                            <button class="delete-btn" onclick="deleteSemester(${s.sem_id})">Delete</button>
                        </td>`;
                    tbody.appendChild(tr);
                });
            }
        } catch(err){ console.error("Fetch semesters error:", err); }
    }

    async function saveYear(e) {
        e.preventDefault();
        const year_from = document.getElementById("year_from").value.trim();
        const year_to = document.getElementById("year_to").value.trim();
        if (!year_from || !year_to) return alert("Both fields are required.");

        const formData = new FormData();
        formData.append("year_from", year_from);
        formData.append("year_to", year_to);
        if(currentId) formData.append("year_id", currentId);

        const url = currentId ? "api/years&semesters/updateYear.php" : "api/years&semesters/addYear.php";

        try {
            const res = await fetch(url, { method: "POST", body: formData });
            const data = await res.json();
            if(data.success) {
                closeModal();
                fetchYears();
            } else alert("Error: " + data.error);
        } catch(err){ console.error("Save year error:", err); }
    }

    async function saveSemester(e) {
        e.preventDefault();
        const sem_name = document.getElementById("sem_name").value.trim();
        const year_id = document.getElementById("sem_year_id").value.trim();
        if (!sem_name || !year_id) return alert("Both fields are required.");

        const formData = new FormData();
        formData.append("sem_name", sem_name);
        formData.append("year_id", year_id);
        if(currentId) formData.append("sem_id", currentId);

        const url = currentId ? "api/years&semesters/updateSemester.php" : "api/years&semesters/addSemester.php";

        try {
            const res = await fetch(url, { method: "POST", body: formData });
            const data = await res.json();
            if(data.success) {
                closeModal();
                fetchSemesters();
            } else alert("Error: " + data.error);
        } catch(err){ console.error("Save semester error:", err); }
    }

    window.editYear = (id, from, to) => {
        currentType = "year";
        currentId = id;
        openModal("year");
        modalTitle.textContent = "Update Year";
        document.getElementById("year_from").value = from;
        document.getElementById("year_to").value = to;
    }

    window.editSemester = (id, name, yearId) => {
        currentType = "semester";
        currentId = id;
        openModal("semester");
        modalTitle.textContent = "Update Semester";
        document.getElementById("sem_name").value = name;
        document.getElementById("sem_year_id").value = yearId;
    }

    window.deleteYear = async (id) => {
        if(!confirm("Delete this year?")) return;
        const formData = new FormData();
        formData.append("year_id", id);
        try {
            const res = await fetch("api/years&semesters/deleteYear.php", { method:"POST", body: formData });
            const data = await res.json();
            if(data.success) fetchYears();
            else alert("Error: " + data.error);
        } catch(err){ console.error("Delete year error:", err); }
    }

    window.deleteSemester = async (id) => {
        if(!confirm("Delete this semester?")) return;
        const formData = new FormData();
        formData.append("sem_id", id);
        try {
            const res = await fetch("api/years&semesters/deleteSemester.php", { method:"POST", body: formData });
            const data = await res.json();
            if(data.success) fetchSemesters();
            else alert("Error: " + data.error);
        } catch(err){ console.error("Delete semester error:", err); }
    }

    function searchAll() {
        const filter = searchInput.value.toLowerCase();
        const yearRows = document.querySelectorAll("#yearsTableBody tr");
        const semRows = document.querySelectorAll("#semestersTableBody tr");

        yearRows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
        });
        semRows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
        });
    }
});
