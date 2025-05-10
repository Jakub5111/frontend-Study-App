
const API_BASE = "https://study-app-sk4w.onrender.com";

async function loadActivities() {
    try {
        const res = await fetch(`${API_BASE}/activities`);
        const data = await res.json();
        const list = document.getElementById("activityList");
        list.innerHTML = "";
        data.forEach(act => {
            const item = document.createElement("li");
            item.textContent = `${act.topic} - ${act.study_time} min (${new Date(act.date).toLocaleString()})`;
            list.appendChild(item);
        });
    } catch (err) {
        console.error("Error loading activities:", err);
    }
}

document.getElementById("activityForm").addEventListener("submit", async e => {
    e.preventDefault();
    const topic = document.getElementById("topic").value;
    const study_time = document.getElementById("studyTime").value;
    const date = document.getElementById("date").value;

    try {
        const res = await fetch(`${API_BASE}/activities`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic, study_time, date })
        });
        if (res.ok) {
            loadActivities();
        } else {
            console.error("Chyba pri pridávaní aktivity:", await res.json());
        }
    } catch (err) {
        console.error("Error adding activity:", err);
    }
});

document.getElementById("clearBtn").addEventListener("click", async () => {
    try {
        const res = await fetch(`${API_BASE}/activities`, { method: "DELETE" });
        if (res.ok) {
            loadActivities();
        }
    } catch (err) {
        console.error("Chyba pri mazaní:", err);
    }
});

document.addEventListener("DOMContentLoaded", loadActivities);
