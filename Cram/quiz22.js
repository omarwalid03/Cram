const quizData = [
    {
      question: 'What does HTML stand for?',
      options: [' HyperText Markup Language', 'High-Level Text Machine Language', 'Hyperlink and Text Markup Language', 'HyperTransfer Markup Language'],
      answer: 'HyperText Markup Language',
    },
    {
      question: 'Which of the following is NOT a valid CSS property?',
      options: [' font-size', 'text-color', 'margin', 'padding'],
      answer: 'text-color',
    },
    {
      question: 'What programming language is used for adding interactivity to a website?',
      options: ['HTML', 'CSS', 'JavaScript', 'Python'],
      answer: 'JavaScript',
    },
    {
      question: ' What does the CSS property box-sizing: border-box do?',
      options: ['Adds a border around the box', 'Includes the padding and border in the box total width', 'Sets the box to be invisible', 'Adjusts the box size based on its content'],
      answer: 'Includes the padding and border in the box total width',
    },
    {
      question: 'Which of the following is used for responsive web design?',
      options: [
        'Flexbox',
        'Bootstrap',
        'Media queries',
        'Media queries',
      ],
      answer: 'Flexbox',
    },
    {
      question: 'What is the purpose of the alt attribute in an HTML image tag?',
      options: [
        'It defines the image source',
        'It provides alternative text for an image',
        'It sets the image width',
        'It specifies the image alignment',
      ],
      answer: 'It provides alternative text for an image',
    },
    {
      question: 'Which of the following is a valid way to declare a variable in JavaScript?',
      options: [
        ' var x = 10;',
        'let x = 10;',
        'const x = 10;',
        ' All of the above',
      ],
      answer: 'All of the above',
    },
    {
      question: 'What is the purpose of the CSS property z-index',
      options: [' Controls the transparency of an element', 'Sets the order of the stack context', 'Defines the size of the element', 'Adjusts the spacing between elements'],
      answer: 'Sets the order of the stack context ',
    },
    {
      question: 'In Bootstrap, what class is used to create a responsive, fixed-width container?',
      options: [
        'container',
        'container-fluid',
        'container-fixed',
        'container-fixed',
      ],
      answer: 'container-fixed',
    },
    {
      question: ' What does AJAX stand for in web development?',
      options: ['Asynchronous JavaScript and XML', 'Advanced JavaScript and XML', 'Asynchronous Java and XML', 'Advanced Java and XML'],
      answer: 'Asynchronous JavaScript and XML',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const userChoicesContainer = document.getElementById('userChoicesContainer'); // Added user choices container
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  const goBackButton = document.getElementById('previous');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  let userChoices = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }

  function goBackToPreviousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      displayQuestion();
      updateButtonsVisibility();
      displayUserChoices(); 
    }
  }
  
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      
      userChoices[currentQuestion] = {
        question: quizData[currentQuestion].question,
        userAnswer: answer,
      };
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
      updateButtonsVisibility(); 
      
    }
  }
  
  
  // function goBackToPreviousQuestion() {
  //   if (currentQuestion > 0) {
  //     currentQuestion--;
  //     displayQuestion();
  //     updateButtonsVisibility();
  //   }
  // }
  
  function updateButtonsVisibility() {
    goBackButton.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
    retryButton.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    showAnswerButton.style.display = currentQuestion === quizData.length ? 'inline-block' : 'none';
  }
  


  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }

  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    userChoices = []
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
    updateButtonsVisibility();
  userChoicesContainer.innerHTML = '';
  }
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
  
    updateButtonsVisibility();
  }
  

  function displayUserChoices() {
    let userChoicesHtml = '';
    for (let i = 0; i < userChoices.length; i++) {
      userChoicesHtml += `
        <p>
          <strong>Question:</strong> ${userChoices[i].question}<br>
          <strong>Your Answer:</strong> ${userChoices[i].userAnswer}
        </p>
      `;
    }
  
    // Display user choices wherever you want (e.g., in a div with id "userChoicesContainer")
    document.getElementById('userChoicesContainer').innerHTML = userChoicesHtml;
  }
  
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();


  
