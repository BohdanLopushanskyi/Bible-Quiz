/* Bible Quiz - all the logic lives in this file.
   A quiz looks like: { id, title, questions:[ { q, a:[4 answers], c:0-3, ref, exp } ] }
   "c" is the number of the correct answer: 0=A, 1=B, 2=C, 3=D. */

   const KEY = "bibleQuizzes";
   const LETTERS = ["A", "B", "C", "D"];
   const $ = id => document.getElementById(id);
   
   /* ---------- Sample quiz (references checked against the verses) ---------- */
   const SAMPLE = {
     id: "sample", title: "Sample Bible Quiz",
     questions: [
       { q: "How many apostles did Jesus choose?", a: ["10", "12", "7", "40"], c: 1, ref: "Luke 6:13", exp: "Jesus called his disciples and chose twelve of them, whom he named apostles." },
       { q: "Who built an ark at God's command?", a: ["Moses", "Abraham", "Noah", "Elijah"], c: 2, ref: "Genesis 6:13-14", exp: "God told Noah to make an ark because of the coming flood." },
       { q: "Which prophet was swallowed by a great fish?", a: ["Jonah", "Daniel", "Isaiah", "Amos"], c: 0, ref: "Jonah 1:17", exp: "The Lord provided a great fish to swallow Jonah." },
       { q: "Which giant did David defeat with a sling and a stone?", a: ["Og", "Goliath", "Sisera", "Nimrod"], c: 1, ref: "1 Samuel 17:50", exp: "David overcame the Philistine with a sling and a stone, without a sword." },
       { q: "In which town was Jesus born?", a: ["Nazareth", "Jerusalem", "Capernaum", "Bethlehem"], c: 3, ref: "Matthew 2:1", exp: "Jesus was born in Bethlehem of Judea in the days of King Herod." },
       { q: "How many days did Jesus fast in the wilderness?", a: ["7", "12", "40", "100"], c: 2, ref: "Matthew 4:1-2", exp: "After fasting forty days and forty nights, Jesus was hungry." },
       { q: "Who was thrown into a den of lions for praying to God?", a: ["Daniel", "Joseph", "Samson", "Gideon"], c: 0, ref: "Daniel 6:16", exp: "King Darius gave the order, and Daniel was cast into the lions' den." },
       { q: "Where did Jesus turn water into wine?", a: ["Bethany", "Cana in Galilee", "Jericho", "Emmaus"], c: 1, ref: "John 2:1-11", exp: "This was the first of Jesus' signs, at a wedding in Cana of Galilee." },
       { q: "Who was chosen to take Judas Iscariot's place among the apostles?", a: ["Barnabas", "Silas", "Stephen", "Matthias"], c: 3, ref: "Acts 1:26", exp: "The lot fell on Matthias, and he was counted with the eleven apostles." },
       { q: "Who led Israel across the Jordan River into the Promised Land?", a: ["Moses", "Joshua", "Caleb", "Samuel"], c: 1, ref: "Joshua 1:1-2", exp: "After Moses died, God told Joshua to cross the Jordan with all the people." },
       { q: "What did the first believers devote themselves to?", a: ["The apostles' teaching, fellowship, breaking bread and prayer", "Building a new temple", "Collecting taxes", "Sailing the seas"], c: 0, ref: "Acts 2:42", exp: "They devoted themselves to the apostles' teaching and fellowship, to breaking of bread and to prayer." }
     ]
   };
   
   /* ---------- More built-in quizzes ---------- */
   const Q = (q, a, c, ref = "", exp = "") => ({ q, a, c, ref, exp });   // short way to write a question
   
   const BASICS = { id: "basics", title: "Bible Basics", questions: [
     Q("How many books are in the Bible?", ["27", "39", "66", "73"], 2, "", "Most Protestant Bibles have 66 books: 39 in the Old Testament and 27 in the New Testament."),
     Q("What is the first book of the Bible?", ["Exodus", "Genesis", "Psalms", "Matthew"], 1, "", "Genesis means “beginning” and starts with creation."),
     Q("What is the last book of the Bible?", ["Jude", "Acts", "Revelation", "Malachi"], 2, "", "Revelation is the final book of the New Testament and of the whole Bible."),
     Q("How many books are in the Old Testament?", ["27", "39", "46", "66"], 1),
     Q("How many books are in the New Testament?", ["12", "27", "39", "66"], 1),
     Q("What are the first four books of the New Testament called?", ["The Epistles", "The Prophets", "The Gospels", "The Law"], 2, "", "Matthew, Mark, Luke and John tell the story of Jesus."),
     Q("Which short verse is often called the shortest in the English Bible?", ["Jesus wept.", "God is love.", "Pray always.", "Rejoice always."], 0, "John 11:35", "In most English translations, John 11:35 is just two words."),
     Q("Which book of the Bible has the most chapters?", ["Genesis", "Isaiah", "Psalms", "Luke"], 2, "", "Psalms has 150 chapters."),
     Q("In which language was most of the Old Testament originally written?", ["Greek", "Latin", "Hebrew", "English"], 2, "", "Mostly Hebrew, with a few parts in Aramaic."),
     Q("In which language was the New Testament originally written?", ["Greek", "Hebrew", "Latin", "Arabic"], 0)
   ]};
   
   const OT = { id: "ot", title: "Old Testament Heroes", questions: [
     Q("Who was the first man God created?", ["Abel", "Adam", "Enoch", "Seth"], 1, "Genesis 2:7", "God formed the man from the dust of the ground."),
     Q("Who was sold into slavery by his brothers?", ["Benjamin", "Reuben", "Joseph", "Judah"], 2, "Genesis 37:28", "His brothers sold him to traders who took him to Egypt."),
     Q("Who did God send to bring Israel out of Egypt?", ["Aaron", "Moses", "Joshua", "Caleb"], 1, "Exodus 3:10", "God told Moses to go to Pharaoh and bring his people out."),
     Q("How many plagues did God send on Egypt?", ["7", "10", "12", "40"], 1, "Exodus 7-12", "The ten plagues are told in Exodus chapters 7 to 12."),
     Q("What did God give Moses on Mount Sinai?", ["The Ten Commandments", "The Ark", "A golden calf", "The Psalms"], 0, "Exodus 20:1-17"),
     Q("Which city's walls fell after Israel marched around it?", ["Babylon", "Ai", "Jericho", "Nineveh"], 2, "Joshua 6:20"),
     Q("Which judge lost his strength when his hair was cut?", ["Gideon", "Samson", "Ehud", "Othniel"], 1, "Judges 16:17"),
     Q("Which king asked God for wisdom?", ["Saul", "David", "Hezekiah", "Solomon"], 3, "1 Kings 3:9-12", "God was pleased and gave him a wise and discerning heart."),
     Q("Who was Naomi's Moabite daughter-in-law who stayed with her?", ["Ruth", "Esther", "Orpah", "Rahab"], 0, "Ruth 1:16"),
     Q("Which queen asked the king to save her people?", ["Vashti", "Esther", "Jezebel", "Deborah"], 1, "Esther 7:3-4")
   ]};
   
   const NT = { id: "nt", title: "New Testament People", questions: [
     Q("Who baptized Jesus?", ["Peter", "John the Baptist", "Andrew", "Philip"], 1, "Matthew 3:13"),
     Q("Which angel told Mary she would have a son?", ["Michael", "Raphael", "Gabriel", "Uriel"], 2, "Luke 1:26-27", "The angel Gabriel was sent to a virgin named Mary."),
     Q("Which disciple denied Jesus three times?", ["Thomas", "Peter", "Matthew", "James"], 1, "Matthew 26:75"),
     Q("Who betrayed Jesus for thirty pieces of silver?", ["Judas Iscariot", "Nicodemus", "Barabbas", "Caiaphas"], 0, "Matthew 26:14-15"),
     Q("How much food did Jesus use to feed the five thousand?", ["Five loaves and two fish", "Two loaves and five fish", "Seven loaves and a few fish", "Twelve loaves"], 0, "Matthew 14:17-21"),
     Q("Which tax collector climbed a sycamore tree to see Jesus?", ["Matthew", "Zacchaeus", "Bartimaeus", "Nathanael"], 1, "Luke 19:1-4"),
     Q("Who did Jesus raise from the dead after four days?", ["Jairus' daughter", "Lazarus", "Dorcas", "Eutychus"], 1, "John 11:39-44"),
     Q("Which Pharisee came to Jesus by night?", ["Gamaliel", "Joseph of Arimathea", "Nicodemus", "Simon"], 2, "John 3:1-2"),
     Q("Who met the risen Jesus on the road to Damascus?", ["Saul (Paul)", "Barnabas", "Stephen", "Timothy"], 0, "Acts 9:3-5"),
     Q("Which disciple said he would not believe until he saw Jesus' wounds?", ["Philip", "Andrew", "Thomas", "Bartholomew"], 2, "John 20:24-28")
   ]};
   
   const BUILTINS = [SAMPLE, BASICS, OT, NT];
   
   /* ---------- State ---------- */
   let quizzes = loadQuizzes();     // all saved quizzes
   let cur = null;                  // quiz being played
   let idx = 0;                     // current question number (0-based)
   let started = false, revealed = false, explained = false;
   let doneSet = new Set();         // questions whose answer was revealed
   let draft = null, editQ = -1;    // editor: quiz copy + question being edited (-1 = new)
   let timerId = null, timeLeft = 0;
   
   /* Competitive mode: teams, points per answer, and who scored on each question */
   let comp = loadComp();           // settings saved in the browser
   let teams = [];                  // team names for the game being played
   let awarded = [];                // awarded[questionNumber] = Set of team numbers who got it right
   
   function loadComp() {
     try {
       const s = JSON.parse(localStorage.getItem("bibleQuizComp"));
       if (s && Array.isArray(s.names)) return s;
     } catch (e) {}
     return { on: false, names: ["Team 1", "Team 2"], pts: 10 };
   }
   /* Reads the team settings from the home screen and saves them. Returns an error text or "". */
   function readComp() {
     comp.on = $("compOn").checked;
     comp.names = $("teamNames").value.split("\n").map(x => x.trim().slice(0, 20)).filter(Boolean);
     comp.pts = Math.max(1, Math.min(1000, +$("pts").value || 10));
     localStorage.setItem("bibleQuizComp", JSON.stringify(comp));
     if (comp.on && (comp.names.length < 2 || comp.names.length > 8)) return "Competitive mode needs 2 to 8 team names, one per line.";
     return "";
   }
   function initComp() {
     $("compOn").checked = comp.on; $("teamNames").value = comp.names.join("\n"); $("pts").value = comp.pts;
     const sync = () => { $("compBox").hidden = !$("compOn").checked; };
     sync();
     ["compOn", "teamNames", "pts"].forEach(id => $(id).addEventListener("input", () => { sync(); readComp(); }));
   }
   function scoreOf(t) { return awarded.reduce((sum, set) => sum + (set.has(t) ? comp.pts : 0), 0); }
   
   /* ---------- Saving and loading ---------- */
   /* Loads saved quizzes and adds any built-in quiz you have not received yet.
      A built-in quiz you delete stays deleted. */
   function loadQuizzes() {
     let q = [], seen = [];
     try { const x = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(x)) q = x; } catch (e) {}
     try { seen = JSON.parse(localStorage.getItem("bibleQuizSeen")) || []; } catch (e) {}
     if (q.some(z => z.id === "sample") && !seen.includes("sample")) seen.push("sample");  // older installs
     BUILTINS.forEach(b => {
       if (!seen.includes(b.id)) { q.push(JSON.parse(JSON.stringify(b))); seen.push(b.id); }
     });
     localStorage.setItem(KEY, JSON.stringify(q));
     localStorage.setItem("bibleQuizSeen", JSON.stringify(seen));
     return q;
   }
   function saveQuizzes() { localStorage.setItem(KEY, JSON.stringify(quizzes)); }
   
   /* Checks a quiz object; returns an error message, or "" if it is fine. */
   function validate(z) {
     if (!z || typeof z.title !== "string" || !z.title.trim()) return "The quiz needs a title.";
     if (!Array.isArray(z.questions) || !z.questions.length) return "The quiz needs at least one question.";
     for (let n = 0; n < z.questions.length; n++) {
       const q = z.questions[n], p = "Question " + (n + 1) + ": ";
       if (!q || typeof q.q !== "string" || !q.q.trim()) return p + "missing question text.";
       if (!Array.isArray(q.a) || q.a.length !== 4 || q.a.some(x => typeof x !== "string" || !x.trim())) return p + "needs exactly four answers.";
       if (!Number.isInteger(q.c) || q.c < 0 || q.c > 3) return p + "needs a correct answer (0-3).";
       if (q.ref !== undefined && typeof q.ref !== "string") return p + "reference must be text.";
       if (q.exp !== undefined && typeof q.exp !== "string") return p + "explanation must be text.";
     }
     return "";
   }
   
   /* ---------- Screens ---------- */
   function show(id) {
     ["home", "editor", "game", "results"].forEach(s => $(s).hidden = s !== id);
   }
   
   /* ---------- Home screen ---------- */
   function renderHome() {
     const box = $("list"); box.innerHTML = "";
     quizzes.forEach(z => {
       const row = document.createElement("div"); row.className = "item";
       const info = document.createElement("div");
       info.innerHTML = "<strong></strong><br><small></small>";
       info.querySelector("strong").textContent = z.title;
       info.querySelector("small").textContent = z.questions.length + " questions";
       const btns = document.createElement("div"); btns.className = "bar";
       btns.append(
         mkBtn("Play", () => play(z), "gold"), mkBtn("Edit", () => openEditor(z)),
         mkBtn("Export", () => exportQuiz(z)), mkBtn("Delete", () => {
           if (confirm('Delete "' + z.title + '"?')) { quizzes = quizzes.filter(x => x !== z); saveQuizzes(); renderHome(); }
         }, "danger"));
       row.append(info, btns); box.append(row);
     });
     if (!quizzes.length) box.textContent = "No quizzes yet. Click “New quiz” to make one.";
     show("home");
   }
   function mkBtn(label, fn, cls) {
     const b = document.createElement("button"); b.className = "btn " + (cls || ""); b.textContent = label; b.onclick = fn; return b;
   }
   function exportQuiz(z) {
     const url = URL.createObjectURL(new Blob([JSON.stringify(z, null, 2)], { type: "application/json" }));
     const a = document.createElement("a"); a.href = url; a.download = z.title.replace(/[^\w-]+/g, "_") + ".json"; a.click();
     URL.revokeObjectURL(url);
   }
   $("imp").onchange = e => {
     const f = e.target.files[0]; if (!f) return;
     const r = new FileReader();
     r.onload = () => {
       try {
         const z = JSON.parse(r.result), err = validate(z);
         if (err) return alert("Could not import: " + err);
         quizzes.push({ id: "q" + Date.now(), title: z.title, questions: z.questions }); saveQuizzes(); renderHome();
       } catch (x) { alert("Could not import: this is not a valid JSON file."); }
     };
     r.readAsText(f); e.target.value = "";
   };
   $("newBtn").onclick = () => openEditor(null);
   
   /* ---------- Editor ---------- */
   // Build the four answer rows once
   $("fans").innerHTML = LETTERS.map((L, n) =>
     `<div class="ansrow"><span>${L}</span><input id="fa${n}" placeholder="Answer ${L}"><label><input type="radio" name="corr" value="${n}"> correct</label></div>`).join("");
   
   function openEditor(z) {
     draft = z ? JSON.parse(JSON.stringify(z)) : { id: "q" + Date.now(), title: "", questions: [] };
     $("etitle").value = draft.title; clearForm(); renderQList(); show("editor");
   }
   function clearForm() {
     editQ = -1; $("formHead").textContent = "Add a question";
     ["fq", "fref", "fexp", "fa0", "fa1", "fa2", "fa3"].forEach(i => $(i).value = "");
     document.querySelectorAll("[name=corr]").forEach(r => r.checked = false);
   }
   function renderQList() {
     const box = $("qlist"); box.innerHTML = "";
     draft.questions.forEach((q, n) => {
       const row = document.createElement("div"); row.className = "item";
       const t = document.createElement("div"); t.textContent = (n + 1) + ". " + q.q;
       const b = document.createElement("div"); b.className = "bar";
       b.append(mkBtn("Edit", () => {
         editQ = n; $("formHead").textContent = "Edit question " + (n + 1);
         $("fq").value = q.q; q.a.forEach((x, k) => $("fa" + k).value = x);
         document.querySelectorAll("[name=corr]")[q.c].checked = true;
         $("fref").value = q.ref || ""; $("fexp").value = q.exp || ""; $("fq").focus();
       }), mkBtn("Delete", () => { draft.questions.splice(n, 1); clearForm(); renderQList(); }, "danger"));
       row.append(t, b); box.append(row);
     });
   }
   $("saveQ").onclick = () => {
     const sel = document.querySelector("[name=corr]:checked");
     const q = { q: $("fq").value.trim(), a: [0, 1, 2, 3].map(n => $("fa" + n).value.trim()),
                 c: sel ? +sel.value : -1, ref: $("fref").value.trim(), exp: $("fexp").value.trim() };
     const err = validate({ title: "x", questions: [q] });
     if (err) return alert(err.replace("Question 1: ", "") + " Please tick the correct answer too.");
     if (editQ >= 0) draft.questions[editQ] = q; else draft.questions.push(q);
     clearForm(); renderQList();
   };
   $("saveQuiz").onclick = () => {
     draft.title = $("etitle").value.trim();
     const err = validate(draft); if (err) return alert(err);
     const n = quizzes.findIndex(x => x.id === draft.id);
     if (n >= 0) quizzes[n] = draft; else quizzes.push(draft);
     saveQuizzes(); renderHome();
   };
   $("cancelEd").onclick = renderHome;
   
   /* ---------- Game ---------- */
   function play(z) {
     const err = readComp(); if (err) return alert(err);
     cur = z; idx = 0; started = false; doneSet = new Set(); resetQuestionState();
     teams = comp.on ? comp.names.slice() : [];
     awarded = z.questions.map(() => new Set());
     show("game"); render();
   }
   function resetQuestionState() { revealed = false; explained = false; stopTimer(); }
   
   /* Draws the audience stage and presenter panel from the current state.
      The correct answer is only marked when "revealed" is true. */
   function render() {
     const total = cur.questions.length, q = cur.questions[idx];
     $("pbar").style.width = (started ? (idx + (revealed ? 1 : 0)) / total * 100 : 0) + "%";
     $("cards").innerHTML = "";
     if (!started) {
       $("count").textContent = total + " questions";
       $("qtext").textContent = cur.title; $("timer").textContent = "";
       $("refline").textContent = ""; $("expl").textContent = "Press “Start quiz” when you are ready.";
       $("pinfo").textContent = "Ready to begin.";
     } else {
       $("count").textContent = "Question " + (idx + 1) + " of " + total;
       $("qtext").textContent = q.q;
       q.a.forEach((text, n) => {
         const c = document.createElement("div"); c.className = "card";
         if (revealed) c.classList.add(n === q.c ? "correct" : "dim");
         c.innerHTML = "<b></b><span></span>"; c.children[0].textContent = LETTERS[n]; c.children[1].textContent = text;
         $("cards").append(c);
       });
       $("refline").textContent = revealed && q.ref ? "📖 " + q.ref : "";
       $("expl").textContent = revealed && explained ? (q.exp || "") : "";
       // Presenter-only info (the correct answer is shown here, never on the stage)
       $("pinfo").innerHTML = "<div>Question " + (idx + 1) + " / " + total + "</div><div class='ok'></div><div class='r'></div><div class='e'></div>";
       $("pinfo").querySelector(".ok").textContent = "Correct: " + LETTERS[q.c] + ". " + q.a[q.c];
       $("pinfo").querySelector(".r").textContent = q.ref ? "Reference: " + q.ref : "";
       $("pinfo").querySelector(".e").textContent = q.exp ? "Explanation: " + q.exp : "";
     }
     renderScores(); renderAward();
     // Button states
     const last = started && idx === total - 1;
     setDis("start", started); setDis("prev", !started || idx === 0);
     setDis("next", !started); setDis("reveal", !started || revealed);
     setDis("explain", !started || !revealed || explained || !q.exp);
     setDis("restart", !started);
     document.querySelectorAll("[data-act=next]").forEach(b => b.textContent = last ? "Finish" : (b.closest("#toolbar") ? "▶" : "Next"));
   }
   /* Scoreboard on the audience screen (only in competitive mode) */
   function renderScores() {
     const box = $("scores"); box.innerHTML = ""; box.hidden = !teams.length;
     const pts = teams.map((_, t) => scoreOf(t)), top = Math.max(0, ...pts);
     teams.forEach((name, t) => {
       const d = document.createElement("div"); d.className = "team" + (top > 0 && pts[t] === top ? " lead" : "");
       d.innerHTML = "<span></span><b></b>"; d.children[0].textContent = name; d.children[1].textContent = pts[t];
       box.append(d);
     });
   }
   /* Presenter buttons: tick the teams that answered correctly (click again to undo) */
   function toggleAward(t) { awarded[idx].has(t) ? awarded[idx].delete(t) : awarded[idx].add(t); render(); }
   function renderAward() {
     const tb = $("tbAward"); tb.innerHTML = "";
     const box = $("award"); box.innerHTML = ""; box.hidden = !teams.length || !started;
     if (box.hidden) return;
     const h = document.createElement("div"); h.className = "hint";
     h.textContent = revealed ? "Which teams got it right? (click again to undo)" : "Reveal the answer, then give points.";
     box.append(h);
     teams.forEach((name, t) => {
       const on = awarded[idx].has(t);
       const b = mkBtn((on ? "✓ " : "+ ") + name, () => { on ? awarded[idx].delete(t) : awarded[idx].add(t); render(); }, on ? "gold" : "");
       b.disabled = !revealed; box.append(b);
       // Same buttons in the Presentation Mode bar, numbered so the keys 1-8 match
       const tbb = mkBtn((t + 1) + " " + (on ? "✓ " : "") + name, () => toggleAward(t), on ? "gold" : "");
       tbb.disabled = !revealed; tb.append(tbb);
     });
   }
   function setDis(act, v) { document.querySelectorAll("[data-act=" + act + "]").forEach(b => b.disabled = v); }
   
   /* Timer: counts down from the number of seconds set on the home screen */
   function startTimer() {
     stopTimer(); const s = +$("secs").value || 0; if (s <= 0) return $("timer").textContent = "";
     timeLeft = s; $("timer").textContent = "⏱ " + timeLeft;
     timerId = setInterval(() => {
       timeLeft--; $("timer").textContent = timeLeft > 0 ? "⏱ " + timeLeft : "⏱ Time's up!";
       if (timeLeft <= 0) stopTimer(true);
     }, 1000);
   }
   function stopTimer(keepText) { clearInterval(timerId); timerId = null; if (!keepText && $("timer")) $("timer").textContent = ""; }
   
   /* ---------- Actions (buttons and keys) ---------- */
   function act(name) {
     if (name === "home") { exitPresent(); return renderHome(); }
     if (name === "exit") return exitPresent();
     if (!cur || $("game").hidden && name !== "restart2") return;
     const total = cur.questions.length;
     if (name === "start" && !started) { started = true; render(); startTimer(); }
     else if (name === "next" && started) {
       if (idx < total - 1) { idx++; resetQuestionState(); render(); startTimer(); } else finish();
     }
     else if (name === "prev" && started && idx > 0) { idx--; resetQuestionState(); render(); startTimer(); }
     else if (name === "reveal" && started && !revealed) { revealed = true; doneSet.add(idx); stopTimer(); render(); }
     else if (name === "explain" && revealed) { explained = true; render(); }
     else if (name === "present") { document.body.classList.add("present"); document.documentElement.requestFullscreen?.().catch(() => {}); }
     else if (name === "restart" && confirm("Restart the quiz from the beginning?")) play(cur);
     else if (name === "end" && confirm("End the quiz now and see the results?")) finish();
   }
   function finish() {
     exitPresent(); stopTimer();
     const total = cur.questions.length, n = doneSet.size;
     $("rtext").textContent = "You completed " + n + " of " + total + " questions (" + Math.round(n / total * 100) + "%).";
     const rank = $("rank"); rank.innerHTML = "";
     if (teams.length) {
       const order = teams.map((name, t) => ({ name, pts: scoreOf(t) })).sort((a, b) => b.pts - a.pts);
       const winners = order.filter(x => x.pts === order[0].pts).map(x => x.name);
       const w = document.createElement("h3");
       w.textContent = order[0].pts === 0 ? "No points were scored." : winners.length > 1 ? "It's a tie: " + winners.join(" & ") + "!" : "Winner: " + winners[0] + "!";
       rank.append(w);
       order.forEach((x, n) => {
         const r = document.createElement("div"); r.className = "team" + (x.pts === order[0].pts && x.pts > 0 ? " lead" : "");
         r.innerHTML = "<span></span><b></b>"; r.children[0].textContent = (n + 1) + ". " + x.name; r.children[1].textContent = x.pts + " pts";
         rank.append(r);
       });
     }
     show("results");
   }
   function exitPresent() {
     document.body.classList.remove("present");
     if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
   }
   
   document.addEventListener("click", e => {
     const b = e.target.closest("[data-act]"); if (!b) return;
     if (b.dataset.act === "restart2") return play(cur);
     act(b.dataset.act);
   });
   document.addEventListener("keydown", e => {
     if (/INPUT|TEXTAREA/.test(e.target.tagName) || $("game").hidden) return;
     if (e.key === "ArrowRight") act("next");
     else if (e.key === "ArrowLeft") act("prev");
     else if (e.key === " ") { e.preventDefault(); act("reveal"); }
     else if (/^[1-8]$/.test(e.key) && teams.length && revealed && +e.key <= teams.length) toggleAward(+e.key - 1);
   });
   // If the person leaves fullscreen with Esc, also leave Presentation Mode
   document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) document.body.classList.remove("present"); });
   
   initComp();
   renderHome();