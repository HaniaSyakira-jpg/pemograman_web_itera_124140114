
import { runDemos } from "./app.js";

const output = document.getElementById("output");
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");

function addOutput(title, data) {
    const card = document.createElement("div");
    card.className = "output-item";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const result = document.createElement("pre");
    result.textContent = JSON.stringify(data, null, 2);

    card.appendChild(heading);
    card.appendChild(result);
    output.appendChild(card);
}

runBtn.addEventListener("click", () => {
    output.replaceChildren();

    try {
        runDemos(addOutput);
    } catch (error) {
        addOutput("Terjadi Kesalahan", {
            message: error.message
        });
        console.error(error);
    }
});

clearBtn.addEventListener("click", () => {
    output.replaceChildren();

    const message = document.createElement("p");
    message.className = "text-gray-500";
    message.textContent = "Output berhasil dibersihkan.";

    output.appendChild(message);
});
