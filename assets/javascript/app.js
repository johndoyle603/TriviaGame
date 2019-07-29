$(document).ready(function() {

    var Questions = [{
            question: "What was Homer eating when he took the stage at the Brad Goodman seminar?",
            answerList: ["A donut", "Two candy apples", "Ice cream", "A candy apple"],
            answer: 1,
            image: "./assets/images/singe.gif"
        }, {
            question: "Who starred alongside Troy McClure in <i>Calling All Quakers</i>?",
            answerList: ["Delores Montenegro", "Alexis Tatum", "Leah London", "Gwen Landry", ],
            answer: 0,
            image: "./assets/images/troy.gif"
        }, {

            question: "Which of the following illegal activities did not take place in the back room of Moe's Tavern?",
            answerList: ["Orca smuggling", "Russian Roulette", "Panda smuggling", "Keeping Hans Moleman under his bars in a subterranean torture chamber"],
            answer: 3,
            image: "./assets/images/moe.gif"
        }, {

            question: "What kind of car does Kearney drive?",
            answerList: ["Hyundai", "Toyota", "Ford", "Honda"],
            answer: 0,
            image: "./assets/images/kearney.gif"
        }, {

            question: "Who was the celebrity on the maiden voyage of the North Haverbrook monorail?",
            answerList: ["Soupy Sales", "Gallagher", "Sam Snead", "Shecky Greene", ],
            answer: 1,
            image: "./assets/images/mono.gif"
        },

        {

            question: "Which of the following is not a line Homer has heard from women who don't want to date him?",
            answerList: ["I no speak English...", "I don't want to kill you, but I will", "I'm married to the sea...", "I get the idea"],
            answer: 3,
            image: "./assets/images/bees.gif"
        },

        {

            question: "Which of the following is not an ingredient in Homer's patented, space-age, out-of-this-world 'moon waffles'?",
            answerList: ["Liquid smoke", "Eggs", "Waffle batter", "Caramel"],
            answer: 1,
            image: "./assets/images/waffle.gif"
        },

        {

            question: "Which of the following beers did Barney Gumble drink at the Duff brewery tour?",
            answerList: ["Tartar Control Duff", "Raspberry Duff", "Lady Duff", "Duff Dark"],
            answer: 3,
            image: "./assets/images/duff.gif"
        },

        {

            question: "What, according to Grandpa Simpson, were once featured on nickels?",
            answerList: ["Ladybugs", "Onions", "Bumblebees", "Beetles"],
            answer: 2,
            image: "./assets/images/abe.gif"
        },

        {

            question: "Complete the following sentence: 'You couldn't fool your mother on the foolingest day of your life if you had...'?",
            answerList: ["...a fool's errand", "...a fool-proof plan", "...two ways to be fooled", "...an electrified fooling machine"],
            answer: 3,
            image: "./assets/images/fool.gif"
        },
    ]


    var correctChoices = 0;
    var wrongChoices = 0;

    var currentQuestion = 0;

    var unanswered = 0;
    var answered = 0;
    var userSelect = 0;

    var sec = 0;
    var time = 0;

    var messages = {
        correct: "Correct!",
        incorrect: "Incorrect!",
        endTime: "Time Is Up!",
        finished: "Game Over",
    }

    function startGame() {
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#wrongAnswers').empty();
        $('#unanswered').empty();

        currentQuestion = 0;
        correctChoices = 0;
        wrongChoices = 0;
        unanswered = 0;

        newQuestion()
    }


    function countDown() {
        sec = 10;
        $('#timer').html('<h3> Time Left: ' + sec + '</h3>');
        answered = true;
        time = setInterval(showCountdDown, 1000);
    }

    function showCountdDown() {
        sec--;
        $('#timer').html('<h3>Time Left: ' + sec + '</h3>');
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            answerPage()
        }
    }


    function newQuestion() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        answered = true;
        var img = $('<img id="sharkimg">');
        $("img").hide();
        img.attr("src", Questions[currentQuestion].image);
        img.appendTo("#image");


        $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + Questions.length);
        $('.question').html('<h2>' + Questions[currentQuestion].question + '</h2>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(Questions[currentQuestion].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }

        countDown();


        $('.thisChoice').on('click', function() {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage()
        });
    }


    function answerPage() {
        $('#currentQuestion').empty();
        $('.thisChoice').empty();
        $('.question').empty();

        var rightAnswerText = Questions[currentQuestion].answerList[Questions[currentQuestion].answer];
        var rightAnswerIndex = Questions[currentQuestion].answer;

        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctChoices++;
            $('#message').html(messages.correct);

        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            wrongChoices++;
            $('#message').html(messages.incorrect);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else {
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }

        if (currentQuestion == (Questions.length - 1)) {
            setTimeout(scoreBoard, 1000)
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 2000);
        }
    }

    function scoreBoard() {
        $('#timer').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();

        $('#finalMessage').html(messages.finished);

        $('#correctAnswers').html("Cromulent Answers: " + correctChoices);
        $('#wrongAnswers').html("Craptacular Answers: " + wrongChoices);
        $('#unanswered').html("Unanswered: " + unanswered);

        $('#startAgainBtn').addClass('reset');
        $('#startAgainBtn').show();
        $('#startAgainBtn').html('Start Over?');
    }


    $('#startBtn').on('click', function() {
        $(this).hide();
        startGame();
    });

    $('#startAgainBtn').on('click', function() {
        $(this).hide();
        startGame();
    });

});