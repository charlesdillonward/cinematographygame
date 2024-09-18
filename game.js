{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const canvas = document.getElementById("gameCanvas");\
const ctx = canvas.getContext("2d");\
\
canvas.width = 800;\
canvas.height = 400;\
\
let knight = \{\
  x: 50,\
  y: 300,\
  width: 50,\
  height: 50,\
  speed: 5,\
  isJumping: false,\
  velocityY: 0,\
  gravity: 0.5,\
\};\
\
// Basic platform\
let platforms = [\{x: 0, y: 350, width: 800, height: 50\}];\
\
let questions = [\
  \{ question: "What is the Rule of Thirds?", answers: ["A: A grid-based composition rule", "B: A lighting technique", "C: A camera movement"], correct: "A" \},\
  \{ question: "Which is a low-angle shot?", answers: ["A: Shot from above", "B: Shot from below", "C: Close-up shot"], correct: "B" \},\
  // Add more questions as needed\
];\
\
let currentQuestion = 0;\
let isQuestionActive = false;\
let score = 0;\
\
// Movement controls\
document.addEventListener("keydown", moveKnight);\
\
function moveKnight(event) \{\
  if (!isQuestionActive) \{\
    if (event.key === "ArrowRight") knight.x += knight.speed;\
    if (event.key === "ArrowLeft") knight.x -= knight.speed;\
    if (event.key === " " && !knight.isJumping) \{\
      knight.isJumping = true;\
      knight.velocityY = -10;\
    \}\
  \}\
\}\
\
function update() \{\
  // Gravity\
  if (knight.isJumping) \{\
    knight.y += knight.velocityY;\
    knight.velocityY += knight.gravity;\
  \}\
\
  // Landing on platform\
  if (knight.y >= platforms[0].y - knight.height) \{\
    knight.y = platforms[0].y - knight.height;\
    knight.isJumping = false;\
    knight.velocityY = 0;\
  \}\
\
  if (knight.x > 400 && !isQuestionActive) \{\
    presentQuestion();\
  \}\
\
  // Redraw the game\
  drawGame();\
\}\
\
function drawGame() \{\
  ctx.clearRect(0, 0, canvas.width, canvas.height);\
\
  // Draw knight\
  ctx.fillStyle = "blue";\
  ctx.fillRect(knight.x, knight.y, knight.width, knight.height);\
\
  // Draw platform\
  platforms.forEach(platform => \{\
    ctx.fillStyle = "green";\
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);\
  \});\
\}\
\
function presentQuestion() \{\
  isQuestionActive = true;\
  const questionElement = document.getElementById("question");\
  const questionBox = document.getElementById("questionBox");\
\
  let question = questions[currentQuestion];\
  questionElement.innerHTML = question.question;\
  questionBox.style.display = "block";\
\
  const buttons = questionBox.getElementsByTagName("button");\
  buttons[0].innerHTML = question.answers[0];\
  buttons[1].innerHTML = question.answers[1];\
  buttons[2].innerHTML = question.answers[2];\
\}\
\
function answerQuestion(answer) \{\
  let question = questions[currentQuestion];\
  const questionBox = document.getElementById("questionBox");\
\
  if (answer === question.correct) \{\
    alert("Correct!");\
    score += 1;\
  \} else \{\
    alert("Wrong answer!");\
  \}\
\
  currentQuestion += 1;\
  isQuestionActive = false;\
  questionBox.style.display = "none";\
  knight.x = 50; // Reset knight position for next level\
\}\
\
// Main game loop\
function gameLoop() \{\
  update();\
  requestAnimationFrame(gameLoop);\
\}\
\
gameLoop();\
}