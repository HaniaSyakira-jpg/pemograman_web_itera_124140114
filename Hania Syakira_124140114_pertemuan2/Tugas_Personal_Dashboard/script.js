
"use strict";

// Mengambil data yang tersimpan di browser
const STORAGE_KEYS = {
    tasks: "studentDashboard_tasks",
    schedules: "studentDashboard_schedules",
    notes: "studentDashboard_notes"
};

// Class untuk memodelkan setiap tugas
class TaskItem {
    constructor({ id = Date.now().toString(), title, course, deadline, completed = false }) {
        this.id = id;
        this.title = title;
        this.course = course;
        this.deadline = deadline;
        this.completed = completed;
    }
}

// Class utama untuk mengelola dashboard
class DashboardApp {
    constructor() {
        this.tasks = this.loadData(STORAGE_KEYS.tasks);
        this.schedules = this.loadData(STORAGE_KEYS.schedules);
        this.notes = this.loadData(STORAGE_KEYS.notes);
        this.editingTaskId = null;
        this.editingNoteId = null;

        this.bindEvents();
        this.renderAll();
        this.showDate();
        this.loadQuote();
    }

    // Mengambil data dari localStorage
    loadData(key) {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error(`Gagal membaca data ${key}:`, error);
            return [];
        }
    }

    // Menyimpan data ke localStorage
    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            document.getElementById("storageStatus").textContent =
                "Perubahan tersimpan di perangkatmu.";
        } catch (error) {
            console.error("Gagal menyimpan data:", error);
            alert("Data gagal disimpan. Periksa ruang penyimpanan browser.");
        }
    }

    // Menghubungkan form dan tombol dengan fungsi
    bindEvents() {
        document.getElementById("taskForm").addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleTaskSubmit();
        });

        document.getElementById("cancelEdit").addEventListener("click", () => {
            this.resetTaskForm();
        });

        document.getElementById("taskFilter").addEventListener("change", () => {
            this.renderTasks();
        });

        document.getElementById("scheduleForm").addEventListener("submit", (event) => {
            event.preventDefault();
            this.addSchedule();
        });

        document.getElementById("noteForm").addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleNoteSubmit();
        });

        document.getElementById("cancelNoteEdit").addEventListener("click", () => {
            this.resetNoteForm();
        });

        document.getElementById("refreshQuote").addEventListener("click", () => {
            this.loadQuote();
        });

        document.getElementById("taskList").addEventListener("click", (event) => {
            const button = event.target.closest("button[data-action]");
            if (!button) return;

            const { action, id } = button.dataset;

            if (action === "edit") this.editTask(id);
            if (action === "delete") this.deleteTask(id);
        });

        document.getElementById("taskList").addEventListener("change", (event) => {
            if (event.target.matches(".task-check")) {
                this.toggleTask(event.target.dataset.id);
            }
        });

        document.getElementById("scheduleList").addEventListener("click", (event) => {
            const button = event.target.closest("button[data-action='delete']");
            if (button) this.deleteSchedule(button.dataset.id);
        });

        document.getElementById("noteList").addEventListener("click", (event) => {
            const button = event.target.closest("button[data-action]");
            if (!button) return;

            const { action, id } = button.dataset;

            if (action === "edit") this.editNote(id);
            if (action === "delete") this.deleteNote(id);
        });
    }

    // Menampilkan tanggal hari ini
    showDate() {
        const date = new Date();

        document.getElementById("currentDate").textContent =
            new Intl.DateTimeFormat("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric"
            }).format(date);
    }

    // Menangani tambah dan edit tugas
    handleTaskSubmit() {
        const title = document.getElementById("taskTitle").value.trim();
        const course = document.getElementById("taskCourse").value.trim();
        const deadline = document.getElementById("taskDeadline").value;

        if (!title || !course || !deadline) {
            alert("Lengkapi semua data tugas terlebih dahulu.");
            return;
        }

        if (this.editingTaskId) {
            this.tasks = this.tasks.map((task) =>
                task.id === this.editingTaskId
                    ? { ...task, title, course, deadline }
                    : task
            );
        } else {
            const newTask = new TaskItem({ title, course, deadline });
            this.tasks = [...this.tasks, newTask];
        }

        this.saveData(STORAGE_KEYS.tasks, this.tasks);
        this.resetTaskForm();
        this.renderAll();
    }

    // Mengisi form dengan data tugas yang akan diedit
    editTask(id) {
        const task = this.tasks.find((item) => item.id === id);
        if (!task) return;

        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskCourse").value = task.course;
        document.getElementById("taskDeadline").value = task.deadline;

        this.editingTaskId = id;
        document.getElementById("taskSubmit").textContent = "Simpan Perubahan";
        document.getElementById("cancelEdit").classList.remove("hidden");
        document.getElementById("taskTitle").focus();
    }

    // Menghapus tugas
    deleteTask(id) {
        if (!confirm("Yakin ingin menghapus tugas ini?")) return;

        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveData(STORAGE_KEYS.tasks, this.tasks);
        this.renderAll();
    }

    // Menandai tugas selesai atau belum selesai
    toggleTask(id) {
        this.tasks = this.tasks.map((task) =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        );

        this.saveData(STORAGE_KEYS.tasks, this.tasks);
        this.renderAll();
    }

    // Mengembalikan form tugas ke keadaan awal
    resetTaskForm() {
        document.getElementById("taskForm").reset();
        this.editingTaskId = null;
        document.getElementById("taskSubmit").textContent = "+ Tambah Tugas";
        document.getElementById("cancelEdit").classList.add("hidden");
    }

    // Menambahkan jadwal kuliah
    addSchedule() {
        const day = document.getElementById("scheduleDay").value;
        const time = document.getElementById("scheduleTime").value;
        const course = document.getElementById("scheduleCourse").value.trim();
        const room = document.getElementById("scheduleRoom").value.trim();

        if (!day || !time || !course) {
            alert("Lengkapi hari, waktu, dan nama mata kuliah.");
            return;
        }

        const schedule = {
            id: crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random()}`,
            day,
            time,
            course,
            room
        };

        this.schedules = [...this.schedules, schedule];
        this.saveData(STORAGE_KEYS.schedules, this.schedules);
        document.getElementById("scheduleForm").reset();
        this.renderSchedules();
    }

    // Menghapus jadwal
    deleteSchedule(id) {
        if (!confirm("Yakin ingin menghapus jadwal ini?")) return;

        this.schedules = this.schedules.filter((item) => item.id !== id);
        this.saveData(STORAGE_KEYS.schedules, this.schedules);
        this.renderSchedules();
    }

    // Menangani tambah dan edit catatan
    handleNoteSubmit() {
        const title = document.getElementById("noteTitle").value.trim();
        const content = document.getElementById("noteContent").value.trim();

        if (!title || !content) {
            alert("Isi judul dan isi catatan terlebih dahulu.");
            return;
        }

        if (this.editingNoteId) {
            this.notes = this.notes.map((note) =>
                note.id === this.editingNoteId
                    ? { ...note, title, content }
                    : note
            );
        } else {
            const newNote = {
                id: `${Date.now()}-${Math.random()}`,
                title,
                content
            };

            this.notes = [...this.notes, newNote];
        }

        this.saveData(STORAGE_KEYS.notes, this.notes);
        this.resetNoteForm();
        this.renderNotes();
    }

    // Mengisi form catatan untuk diedit
    editNote(id) {
        const note = this.notes.find((item) => item.id === id);
        if (!note) return;

        document.getElementById("noteTitle").value = note.title;
        document.getElementById("noteContent").value = note.content;

        this.editingNoteId = id;
        document.getElementById("noteSubmit").textContent = "Simpan Perubahan";
        document.getElementById("cancelNoteEdit").classList.remove("hidden");
        document.getElementById("noteTitle").focus();
    }

    // Menghapus catatan
    deleteNote(id) {
        if (!confirm("Yakin ingin menghapus catatan ini?")) return;

        this.notes = this.notes.filter((note) => note.id !== id);
        this.saveData(STORAGE_KEYS.notes, this.notes);
        this.renderNotes();
    }

    // Mengembalikan form catatan ke keadaan awal
    resetNoteForm() {
        document.getElementById("noteForm").reset();
        this.editingNoteId = null;
        document.getElementById("noteSubmit").textContent = "+ Simpan Catatan";
        document.getElementById("cancelNoteEdit").classList.add("hidden");
    }

    // Mengambil kutipan motivasi dari API
    async loadQuote() {
        const quoteText = document.getElementById("quoteText");
        const quoteAuthor = document.getElementById("quoteAuthor");
        const button = document.getElementById("refreshQuote");

        button.disabled = true;
        quoteText.textContent = "Mengambil kutipan...";
        quoteAuthor.textContent = "Tunggu sebentar";

        try {
            const response = await fetch("https://dummyjson.com/quotes/random");

            if (!response.ok) {
                throw new Error("Respons API tidak berhasil.");
            }

            const { quote, author } = await response.json();

            quoteText.textContent = quote;
            quoteAuthor.textContent = `— ${author}`;
        } catch (error) {
            console.error("Gagal mengambil kutipan:", error);
            quoteText.textContent =
                "Kamu tidak harus hebat untuk memulai, tetapi kamu harus memulai untuk menjadi hebat.";
            quoteAuthor.textContent = "Zig Ziglar";
        } finally {
            button.disabled = false;
        }
    }

    // Memperbarui angka ringkasan tugas
    renderStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter((task) => task.completed).length;
        const pending = total - completed;

        document.getElementById("totalTasks").textContent = total;
        document.getElementById("pendingTasks").textContent = pending;
        document.getElementById("completedTasks").textContent = completed;
    }

    // Menampilkan daftar tugas
    renderTasks() {
        const taskList = document.getElementById("taskList");
        const filter = document.getElementById("taskFilter").value;

        const filteredTasks = this.tasks.filter((task) => {
            if (filter === "pending") return !task.completed;
            if (filter === "completed") return task.completed;
            return true;
        });

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    Belum ada tugas di bagian ini. Yuk, tambahkan tugasmu!
                </div>
            `;
            return;
        }

        const sortedTasks = [...filteredTasks].sort((a, b) =>
            a.deadline.localeCompare(b.deadline)
        );

        taskList.innerHTML = sortedTasks.map((task) => {
            const { id, title, course, deadline, completed } = task;

            return `
                <article class="task-item ${completed ? "done" : ""}">
                    <input
                        class="task-check"
                        type="checkbox"
                        data-id="${id}"
                        aria-label="Tandai ${this.escapeHTML(title)} selesai"
                        ${completed ? "checked" : ""}
                    >

                    <div class="task-content">
                        <div class="task-title">${this.escapeHTML(title)}</div>
                        <div class="task-meta">
                            ${this.escapeHTML(course)} · Deadline:
                            ${this.formatDate(deadline)}
                        </div>

                        <div class="task-actions">
                            <button class="small-button"
                                data-action="edit" data-id="${id}">
                                Edit
                            </button>
                            <button class="small-button delete"
                                data-action="delete" data-id="${id}">
                                Hapus
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    // Menampilkan jadwal berdasarkan hari dan waktu
    renderSchedules() {
        const scheduleList = document.getElementById("scheduleList");

        const dayOrder = [
            "Senin", "Selasa", "Rabu", "Kamis",
            "Jumat", "Sabtu", "Minggu"
        ];

        const sortedSchedules = [...this.schedules].sort((a, b) => {
            const dayDifference =
                dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);

            return dayDifference || a.time.localeCompare(b.time);
        });

        if (sortedSchedules.length === 0) {
            scheduleList.innerHTML = `
                <div class="empty-state">
                    Belum ada jadwal kuliah yang ditambahkan.
                </div>
            `;
            return;
        }

        scheduleList.innerHTML = sortedSchedules.map((schedule) => {
            const { id, day, time, course, room } = schedule;

            return `
                <article class="schedule-item">
                    <div class="schedule-time">${this.escapeHTML(time)}</div>

                    <div class="schedule-info">
                        <strong>${this.escapeHTML(course)}</strong>
                        <small>${this.escapeHTML(day)}${room
                            ? ` · ${this.escapeHTML(room)}`
                            : ""}</small>

                        <div class="task-actions">
                            <button class="small-button delete"
                                data-action="delete" data-id="${id}">
                                Hapus
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    // Menampilkan catatan pribadi
    renderNotes() {
        const noteList = document.getElementById("noteList");

        if (this.notes.length === 0) {
            noteList.innerHTML = `
                <div class="empty-state">
                    Belum ada catatan. Simpan ide pentingmu di sini!
                </div>
            `;
            return;
        }

        noteList.innerHTML = [...this.notes].reverse().map((note) => {
            const { id, title, content } = note;

            return `
                <article class="note-item">
                    <strong>${this.escapeHTML(title)}</strong>
                    <p>${this.escapeHTML(content)}</p>

                    <div class="note-actions">
                        <button class="small-button"
                            data-action="edit" data-id="${id}">
                            Edit
                        </button>
                        <button class="small-button delete"
                            data-action="delete" data-id="${id}">
                            Hapus
                        </button>
                    </div>
                </article>
            `;
        }).join("");
    }

    // Memformat tanggal agar mudah dibaca
    formatDate(dateString) {
        const date = new Date(`${dateString}T00:00:00`);

        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(date);
    }

    // Menghindari input pengguna dibaca sebagai HTML
    escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    // Memperbarui seluruh tampilan
    renderAll() {
        this.renderStats();
        this.renderTasks();
        this.renderSchedules();
        this.renderNotes();
    }
}

// Arrow function untuk membuat aplikasi
const startDashboard = () => new DashboardApp();

// Menjalankan aplikasi setelah HTML selesai dimuat
document.addEventListener("DOMContentLoaded", startDashboard);
