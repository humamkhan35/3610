function syncSentence() {
  let menu = document.getElementById("wordMenu");
  let box = document.getElementById("sentenceBox");

  if (menu.selectedIndex > 0) {
    let option = menu.options[menu.selectedIndex];
    box.value = option.dataset.sentence;
  } else {
    box.value = "";
  }
}

function speak(text) {
  let msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
}

function speakWord() {
  let menu = document.getElementById("wordMenu");

  if (menu.selectedIndex > 0) {
    speak(menu.value);
  }
}

function speakSentence() {
  let box = document.getElementById("sentenceBox");

  if (box.value !== "") {
    speak(box.value);
  }
}