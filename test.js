/* 공부 습관 자가진단 — 10문항 합산 후 최고점 그룹 판정 */

var GROUPS = {
  nt: { key: "nt", label: "NT · 분석가 / 전략가형", page: "nt.html",
        desc: "원리와 구조를 먼저 이해할 때 가장 잘 배우는 타입입니다. 개념 지도와 비판적 질문을 무기로 삼으세요." },
  nf: { key: "nf", label: "NF · 이상가 / 몰입가형", page: "nf.html",
        desc: "의미와 이야기가 있을 때 폭발적으로 몰입하는 타입입니다. 공부에 나만의 '왜'를 붙이세요." },
  sj: { key: "sj", label: "SJ · 관리자 / 성실가형", page: "sj.html",
        desc: "계획과 반복으로 차곡차곡 쌓아 올리는 타입입니다. 루틴과 체크리스트가 최고의 도구입니다." },
  sp: { key: "sp", label: "SP · 탐험가 / 실전가형", page: "sp.html",
        desc: "직접 부딪히며 익히는 타입입니다. 문제풀이 먼저, 짧고 강한 몰입 세션이 잘 맞습니다." }
};

var QUESTIONS = [
  {
    q: "새로운 단원을 시작할 때 나는…",
    a: [
      { t: "전체 구조와 원리부터 파악한다", g: "nt" },
      { t: "이걸 왜 배우는지 의미를 먼저 찾는다", g: "nf" },
      { t: "진도 계획표부터 세운다", g: "sj" },
      { t: "일단 문제부터 풀어본다", g: "sp" }
    ]
  },
  {
    q: "공부가 가장 잘 될 때는…",
    a: [
      { t: "궁금했던 것이 논리적으로 풀릴 때", g: "nt" },
      { t: "배우는 내용에 마음이 움직일 때", g: "nf" },
      { t: "세운 계획대로 착착 진행될 때", g: "sj" },
      { t: "짧게 집중하고 바로 결과를 확인할 때", g: "sp" }
    ]
  },
  {
    q: "내 노트 정리 스타일은…",
    a: [
      { t: "개념 관계도·마인드맵 위주", g: "nt" },
      { t: "이야기와 비유를 곁들여서", g: "nf" },
      { t: "깔끔하고 체계적으로 빠짐없이", g: "sj" },
      { t: "거의 안 함, 문제집에 바로 표시", g: "sp" }
    ]
  },
  {
    q: "무언가를 암기할 때 나는…",
    a: [
      { t: "원리를 이해하면 자연스럽게 외워진다", g: "nt" },
      { t: "이야기나 이미지로 엮어서 외운다", g: "nf" },
      { t: "여러 번 반복해서 쓰며 외운다", g: "sj" },
      { t: "소리 내 읽거나 움직이며 외운다", g: "sp" }
    ]
  },
  {
    q: "나에게 맞는 공부 계획은…",
    a: [
      { t: "큰 목표만 잡고 유연하게 조정", g: "nt" },
      { t: "하고 싶을 때 몰입해서 몰아서", g: "nf" },
      { t: "주간·일간으로 꼼꼼하게", g: "sj" },
      { t: "계획보다 그때그때 상황에 맞춰", g: "sp" }
    ]
  },
  {
    q: "시험이 다가오면 나는…",
    a: [
      { t: "핵심 개념 위주로 구조를 정리한다", g: "nt" },
      { t: "컨디션과 멘탈 관리에 신경 쓴다", g: "nf" },
      { t: "미리미리 꾸준히 준비해 둔다", g: "sj" },
      { t: "막판에 집중해서 몰아친다", g: "sp" }
    ]
  },
  {
    q: "틀린 문제를 보면 나는…",
    a: [
      { t: "어떤 원리를 잘못 적용했는지 분석한다", g: "nt" },
      { t: "왜 틀렸는지 곱씹으며 마음이 쓰인다", g: "nf" },
      { t: "오답노트에 정리하고 다시 반복한다", g: "sj" },
      { t: "비슷한 유형을 몇 개 더 풀어본다", g: "sp" }
    ]
  },
  {
    q: "함께 공부하는 것에 대해…",
    a: [
      { t: "대체로 혼자가 집중이 잘 된다", g: "nt" },
      { t: "같이 하면 힘이 나고 동기가 생긴다", g: "nf" },
      { t: "서로 챙기고 진도를 맞추면 좋다", g: "sj" },
      { t: "퀴즈 내기 같은 활동이면 좋다", g: "sp" }
    ]
  },
  {
    q: "오래 앉아 있는 것은 나에게…",
    a: [
      { t: "관심 있는 주제면 몇 시간도 가능하다", g: "nt" },
      { t: "그날의 기분에 따라 크게 달라진다", g: "nf" },
      { t: "익숙하다, 엉덩이 힘이 있는 편이다", g: "sj" },
      { t: "힘들다, 자주 일어나게 된다", g: "sp" }
    ]
  },
  {
    q: "내가 공부하는 진짜 이유는…",
    a: [
      { t: "아는 것 자체가 즐겁고 유능해지고 싶어서", g: "nt" },
      { t: "되고 싶은 모습과 꿈이 있어서", g: "nf" },
      { t: "해야 할 일이고 책임을 다하고 싶어서", g: "sj" },
      { t: "목표 점수나 눈앞의 보상을 위해서", g: "sp" }
    ]
  }
];

var form = document.getElementById("quiz");
var resultBox = document.getElementById("result");
var warn = document.getElementById("warn");

function buildQuiz() {
  form.innerHTML = "";
  QUESTIONS.forEach(function (item, qi) {
    var wrap = document.createElement("div");
    wrap.className = "quiz-q";

    var title = document.createElement("div");
    title.className = "q-title";
    title.textContent = (qi + 1) + ". " + item.q;
    wrap.appendChild(title);

    item.a.forEach(function (opt, oi) {
      var label = document.createElement("label");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + qi;
      input.value = opt.g;
      input.id = "q" + qi + "_" + oi;

      var span = document.createElement("span");
      span.textContent = opt.t;

      label.appendChild(input);
      label.appendChild(span);
      wrap.appendChild(label);
    });

    form.appendChild(wrap);
  });
}

function calcResult() {
  var scores = { nt: 0, nf: 0, sj: 0, sp: 0 };
  var answered = 0;

  QUESTIONS.forEach(function (item, qi) {
    var checked = form.querySelector('input[name="q' + qi + '"]:checked');
    if (checked) {
      scores[checked.value] += 1;
      answered += 1;
    }
  });

  if (answered < QUESTIONS.length) {
    warn.classList.remove("hidden");
    resultBox.classList.add("hidden");
    var firstEmpty = null;
    QUESTIONS.forEach(function (item, qi) {
      if (!firstEmpty && !form.querySelector('input[name="q' + qi + '"]:checked')) {
        firstEmpty = form.querySelectorAll(".quiz-q")[qi];
      }
    });
    if (firstEmpty) firstEmpty.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  warn.classList.add("hidden");

  var max = Math.max(scores.nt, scores.nf, scores.sj, scores.sp);
  var winners = ["nt", "nf", "sj", "sp"].filter(function (k) { return scores[k] === max; });
  var top = GROUPS[winners[0]];

  showResult(top, scores, winners);
}

function showResult(top, scores, winners) {
  var order = ["nt", "nf", "sj", "sp"];
  var scoreLine = order.map(function (k) {
    return k.toUpperCase() + " " + scores[k];
  }).join("  ·  ");

  var tieNote = winners.length > 1
    ? '<p class="score-line">동점 그룹: ' +
      winners.map(function (k) { return k.toUpperCase(); }).join(", ") +
      ' — 두 성향이 섞여 있어요. 아래 그룹부터 참고해 보세요.</p>'
    : "";

  resultBox.innerHTML =
    '<p class="eyebrow" style="background:var(--purple-soft);">나의 공부유형</p>' +
    "<h2>" + top.label + "</h2>" +
    "<p>" + top.desc + "</p>" +
    '<p class="score-line">' + scoreLine + "</p>" +
    tieNote +
    '<div class="btn-row" style="margin-top:18px;">' +
    '  <a class="btn" href="' + top.page + '">' + top.key.toUpperCase() + " 공부법 자세히 보기</a>" +
    '  <button type="button" class="btn secondary" id="shareBtn">친구에게 공유</button>' +
    "</div>";

  resultBox.classList.remove("hidden");
  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });

  document.getElementById("shareBtn").addEventListener("click", function () {
    shareResult(top);
  });
}

function shareResult(top) {
  var pageUrl = location.href.split("#")[0].replace(/test\.html$/, "index.html");
  var text = "나의 공부유형은 [" + top.label + "]! MBTI 공부법 연구소에서 확인해봐 👉";

  if (navigator.share) {
    navigator.share({ title: "MBTI 공부법 연구소", text: text, url: pageUrl })
      .catch(function () {});
    return;
  }

  var full = text + " " + pageUrl;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(full).then(function () {
      alert("공유 문구를 복사했어요!\n\n" + full);
    }, function () {
      prompt("아래 문구를 복사해 친구에게 보내세요:", full);
    });
  } else {
    prompt("아래 문구를 복사해 친구에게 보내세요:", full);
  }
}

document.getElementById("submitBtn").addEventListener("click", calcResult);
document.getElementById("resetBtn").addEventListener("click", function () {
  buildQuiz();
  resultBox.classList.add("hidden");
  warn.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

buildQuiz();
