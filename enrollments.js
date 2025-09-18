document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addEnrollmentBtn");
  const searchInput = document.getElementById("searchInput");
  const enrollmentForm = document.getElementById("enrollmentForm");

  if (addBtn) addBtn.addEventListener("click", openAddModal);
  if (searchInput) searchInput.addEventListener("keyup", searchEnrollment);
  if (enrollmentForm) enrollmentForm.addEventListener("submit", saveEnrollment);

  document.querySelectorAll(".modal .close").forEach(btn => {
    btn.addEventListener("click", closeModal);
  });

  fetchStudents();
  fetchSubjects();
  fetchEnrollments();
});

async function safeFetchJson(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON: " + text);
  }
}

async function fetchStudents() {
  try {
    const result = await safeFetchJson("api/students/getStudents.php");
    const studentSelect = document.getElementById("stud_id");
    if (!studentSelect) return;
    studentSelect.innerHTML = `<option value="">Select student</option>`;
    result.data.forEach(stud => {
      const opt = document.createElement("option");
      opt.value = stud.stud_id;
      opt.textContent = `${stud.lname}, ${stud.fname}`;
      studentSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Fetch students error:", err);
  }
}

async function fetchSubjects() {
  try {
    const result = await safeFetchJson("api/subject/getSubject.php");
    const subjectSelect = document.getElementById("subject_id");
    if (!subjectSelect) return;
    subjectSelect.innerHTML = `<option value="">Select subject</option>`;
    result.data.forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub.subject_id;
      opt.textContent = sub.subject_name;
      subjectSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Fetch subjects error:", err);
  }
}

async function fetchEnrollments() {
  try {
    const result = await safeFetchJson("api/enrollment/getEnrollments.php");
    renderTable(result.data);
  } catch (err) {
    console.error("Fetch enrollments error:", err);
  }
}

function renderTable(enrollments) {
  const tbody = document.getElementById("enrollmentTableBody");
  tbody.innerHTML = "";
  enrollments.forEach(enr => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${enr.load_id}</td>
      <td>${enr.student_name}</td>
      <td>${enr.program_name}</td>
      <td>${enr.subject_name}</td>
      <td>${enr.semester_name}</td>
      <td>
        <button class="update-btn" onclick="openUpdateModal('${enr.load_id}','${enr.stud_id}','${enr.subject_id}')">Edit</button>
        <button class="delete-btn" onclick="deleteEnrollment('${enr.load_id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openAddModal() {
  document.getElementById("modalTitle").textContent = "Add Enrollment";
  document.getElementById("enrollment_id").value = "";
  document.getElementById("stud_id").value = "";
  document.getElementById("subject_id").value = "";
  openModal();
}

function openUpdateModal(loadId, studId, subjectId) {
  document.getElementById("modalTitle").textContent = "Update Enrollment";
  document.getElementById("enrollment_id").value = loadId;
  document.getElementById("stud_id").value = studId;
  document.getElementById("subject_id").value = subjectId;
  openModal();
}

function openModal() {
  document.getElementById("enrollmentModal").style.display = "block";
}

function closeModal() {
  document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}

async function saveEnrollment(e) {
  e.preventDefault();
  const enrollment_id = document.getElementById("enrollment_id").value.trim();
  const stud_id = document.getElementById("stud_id").value.trim();
  const subject_id = document.getElementById("subject_id").value.trim();

  if (!stud_id || !subject_id) {
    alert("Please select student and subject.");
    return;
  }

  const formData = new FormData();
  formData.append("stud_id", stud_id);
  formData.append("subject_id", subject_id);

  let url;
  if (enrollment_id) {
    url = "api/enrollment/updateEnrollment.php";
    formData.append("load_id", enrollment_id);
  } else {
    url = "api/enrollment/enrollStudent.php";
  }

  try {
    const res = await fetch(url, { method: "POST", body: formData });
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } 
    catch { 
      console.error("Save response not JSON:", text);
      alert("Server error. Check console.");
      return;
    }

    if (json.success) {
      alert(json.message || "Saved successfully");
      closeModal();
      fetchEnrollments();
    } else {
      alert(json.error || "Operation failed");
    }
  } catch (err) {
    console.error("Save error:", err);
    alert("Network/server error. Check console.");
  }
}

async function deleteEnrollment(load_id) {
  if (!confirm("Are you sure you want to delete this enrollment?")) return;
  const formData = new FormData();
  formData.append("load_id", load_id);

  try {
    const res = await fetch("api/enrollment/removeEnrollment.php", { method: "POST", body: formData });
    const json = await res.json();
    if (json.success) {
      alert(json.message || "Deleted");
      fetchEnrollments();
    } else {
      alert(json.error || "Delete failed");
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Network/server error. Check console.");
  }
}

function searchEnrollment() {
  const filter = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#enrollmentTableBody tr");
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
}
