let topics = [];
let selectedTopic = null;
let deferredPrompt = null;
const menu = document.getElementById("menu");
const title = document.getElementById("topicTitle");
const image = document.getElementById("topicImage");
const description = document.getElementById("topicDescription");
const fact = document.getElementById("topicFact");
const audio = document.getElementById("topicAudio");
const quizQuestion = document.getElementById("quizQuestion");
const answerInput = document.getElementById("answerInput");
const result = document.getElementById("result");
async function startApp() { try { const response = await fetch("topics.json"); const data = await response.json(); topics = data.topics; makeMenu(); showTopic(0); } catch (error) { menu.innerHTML = "<p style='color:red'>Menu did not load. Please open this project with VS Code Live Server.</p>"; console.log(error); }
}
function makeMenu() { menu.innerHTML = ""; topics.forEach(function(topic, index) { const button = document.createElement("button"); button.textContent = topic.title; button.className = "menu-btn"; button.onclick = function() { showTopic(index); }; menu.appendChild(button); });
}
function showTopic(index) { selectedTopic = topics[index]; document.querySelectorAll(".menu-btn").forEach(function(button, i) { if (i === index) { button.classList.add("active"); } else { button.classList.remove("active"); } }); title.textContent = selectedTopic.title; image.src = selectedTopic.image; image.alt = selectedTopic.title; description.textContent = selectedTopic.description; fact.textContent = selectedTopic.fact; audio.src = selectedTopic.audio; audio.load(); quizQuestion.textContent = selectedTopic.question; answerInput.value = ""; result.textContent = "";
}
document.getElementById("playAudioBtn").onclick = function() { audio.currentTime = 0; audio.play().catch(function(error) { result.textContent = "Audio could not play. Check that the mp3 file exists in assets/audio."; result.style.color = "red"; console.log(error); });
};
document.getElementById("checkBtn").onclick = function() { if (!selectedTopic) return; const userAnswer = answerInput.value.trim().toLowerCase(); const correctAnswer = selectedTopic.answer.toLowerCase(); if (userAnswer === "") { result.textContent = "Please type an answer first."; result.style.color = "red"; } else if (userAnswer === correctAnswer) { result.textContent = "Correct! Good job."; result.style.color = "green"; } else { result.textContent = "Not yet. Try again. Hint: answer is one of the planet names."; result.style.color = "red"; }
};
answerInput.addEventListener("keydown", function(event) { if (event.key === "Enter") { document.getElementById("checkBtn").click(); }
});
window.addEventListener("beforeinstallprompt", function(event) { event.preventDefault(); deferredPrompt = event; document.getElementById("installBtn").style.display = "inline-block";
});
document.getElementById("installBtn").onclick = async function() { if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; } else { alert("Install option appears after using Live Server or GitHub Pages in a supported browser like Chrome."); }
};
if ("serviceWorker" in navigator) { window.addEventListener("load", function() { if (location.protocol !== "file:") { navigator.serviceWorker.register("service-worker.js"); } });
}
startApp();