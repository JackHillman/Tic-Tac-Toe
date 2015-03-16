$(document).ready(function () {

	$('.gameOver').hide();

	var moveCounter = 1;
	var used = [];
	var naughts = [];
	var crosses = [];
	
	var win = {
		0: ['#1', '#2', '#3'],
		1: ['#4', '#5', '#6'],
		2: ['#7', '#8', '#9'],
		3: ['#1', '#4', '#7'],
		4: ['#2', '#5', '#8'],
		5: ['#3', '#6', '#9'],
		6: ['#1', '#5', '#9'],
		7: ['#3', '#5', '#7']
	}

	//Player Turn

	$('.blank').click (function () {
		if ($(this).attr('class') === 'blank') {
			$(this).addClass ('cross').removeClass ('blank');
			moveCounter++;
			var pushClick = '#' + $(this).attr('id');
			used.push(pushClick);
			if (used.length === 9) {
				$('#tieMessage').show();
			}
			crosses.push(pushClick);
			winLoop();
			random();
		}
		
	});

	//CPU turn

	function random() {
		while ((moveCounter % 2 == 0) && used.length < 8) {
			var i = Math.floor((Math.random() * 9) + 1);
			i = '#' + i;
			if (used.indexOf(i) == -1) {
				$(i).addClass('naught').removeClass('blank');
				used.push(i);
				naughts.push(i);
				winLoop();
				moveCounter++;
			}

		}
	}

	//Loop win states

	function winLoop() {
		for (var key in win) {
			var a = win[key][0];
			var b = win[key][1];
			var c = win[key][2];
			checkWin(a, b, c);
		}
	}

	//Check win

	function checkWin(one, two, three) {
		if ((crosses.indexOf(one) != -1) && (crosses.indexOf(two) != -1) && (crosses.indexOf(three) != -1)) {
			winState(one, two, three);
		}
		else if ((naughts.indexOf(one) != -1) && (naughts.indexOf(two) != -1) && (naughts.indexOf(three) != -1)) {
			winState(one, two, three);
		}
	}

	//Check correct win & display win screen

	function winState(one, two, three) {
		if (($(one).hasClass('cross')) && ($(two).hasClass('cross')) && ($(three).hasClass('cross'))) {
			$('#tieMessage').hide();
			$('#winMessage').show ();
			reset();
		}
		else if (($(one).hasClass('naught')) && ($(two).hasClass('naught')) && ($(three).hasClass('naught'))) {
			$('#tieMessage').hide();
			$('#loseMessage').show();
			reset();
		}
		
	}

	function reset() {
		$('.resetButton').click (function(){
			$('td').removeClass('naught').addClass('blank');
			$('td').removeClass('cross').addClass('blank');
			$('.gameOver').hide();
			naughts = [];
			crosses = [];
			used = [];
			moveCounter = 1;
		});
	}
});