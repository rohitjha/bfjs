angular.module("bf", [])
.controller("bfController", ["$scope", function($scope) {
	$scope.header = "Brainfuck Compiler in JavaScript";
	$scope.program = "Your Brainfuck program:";
	$scope.input = "Input for your program (optional):";
	$scope.output = "Result:";
	$scope.result = "";
	$scope.compiled = false;

	$scope.initTape = function() {
		$scope.size = 65535
		$scope.tape = [];
		$scope.tape.length = $scope.size;
		$scope.tape.fill(0);
	}

	$scope.reset = function() {
		$scope.initTape();
		$scope.compiled = false;
		$scope.result = "";
		$("#code").val("");
		$("#ip").val("");
		$("#op").val("");
	}
	
	$scope.compile = function() {
		$scope.initTape();
		$scope.result = "";
		var code = $("#code").val();
		if (code === "") {
			return;
		}
		var input = $("#ip").val();
		var cell = 0;
		var loop = 0;
		var ipIndex = 0;

		var i = 0;
		while (i < code.length) {
			switch(code[i]) {
				case '>':
					if (cell < $scope.size - 1) {
						cell++;
					}
					else if (cell == $scope.size - 1) {
						cell = 0;
					}
					break;
				
				case '<':
					if (cell == 0) {
						cell = $scope.size - 1;
					}
					else {
						cell--;
					}
					break;
				
				case '+':
					$scope.tape[cell]++;
					break;
				
				case '-':
					$scope.tape[cell]--;
					break;
				
				case '.':
					var cellContent = String.fromCharCode($scope.tape[cell]);
					$scope.result += cellContent;
					break;
				
				case ',':
					if (input.length === 0) {
						console.log("Unable to read input\n");
						break;
					}
					if (ipIndex < input.length) {
						$scope.tape[cell] = input[ipIndex].charCodeAt(0);
						ipIndex++;
					}
					break;
				
				case '[':
					if ($scope.tape[cell] === 0) {
						loop = 1;
						while (loop > 0) {
							i++;
							var c = code[i];
							if (c === '[') {
								loop++;
							}
							else if (c === ']') {
								loop--;
							}
						}
					}
					break;
				
				case ']':
					loop = 1;
					while (loop > 0) {
						i--;
						var c = code[i];
						if (c === '[') {
							loop--;
						}
						else if (c === ']') {
							loop++;
						}
					}
					i--;
					break;
			}
			i++;
		}
		$scope.compiled = true;
	};
}])