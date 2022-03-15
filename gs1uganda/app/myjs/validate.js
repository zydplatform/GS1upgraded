// Document is ready
$(document).ready(function () {
	
// Validate Businessname
	$('#businessnamecheck').hide();
	let BnameError = true;
	$('#businessName').keyup(function () {
		validateBname();
	});
	
	function validateBname() {
	let BnameValue = $('#businessName').val();
	if (BnameValue.length == '') {
	$('#businessnamecheck').show();
		BnameError = false;
		return false;
	}
	else if((BnameValue.length < 3)||
			(BnameValue.length > 20)) {
		$('#businessnamecheck').show();
		$('#businessnamecheck').html
("length of Business Name must be between 3 and 20");
		BnameError = false;
		return false;
	}
	else {
		$('#businessnamecheck').hide();
	}
	}

// Validate Businessno
	$('#businessnocheck').hide();
	let BnoError = true;
	$('#registrationNumber').keyup(function () {
		validateBno();
	});
	
	function validateBno() {
	let BnoValue = $('#registrationNumber').val();
	if (BnoValue.length == '') {
	$('#businessnocheck').show();
		BnoError = false;
		return false;
	}
	else if((BnoValue.length < 6)||
			(BnoValue.length > 15)) {
		$('#businessnocheck').show();
		$('#businessnocheck').html
("length of Business Name must be between 6 and 15");
		BnoError = false;
		return false;
	}
	else {
		$('#businessnocheck').hide();
	}
	}

// Validate Email
	const email =
		document.getElementById('businessEmail');
	email.addEventListener('blur', ()=>{
	let regex =
/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
	let s = email.value;
	if(regex.test(s)){
		email.classList.remove(
				'is-invalid');
		emailError = true;
		}
		else{
			email.classList.add(
				'is-invalid');
			emailError = false;
		}
	})

	// Validate Businessno
	$('#tinnocheck').hide();
	let tinError = true;
	$('#tinNumber').keyup(function () {
		validateTin();
	});
	
	function validateTin() {
	let TinValue = $('#tinNumber').val();
	if (TinValue.length == '') {
	$('#tinnocheck').show();
		tinError = false;
		return false;
	}
	else if((TinValue.length < 8)||
			(TinValue.length > 10)) {
		$('#tinnocheck').show();
		$('#tinnocheck').html
("length of Business TIN must be between 8 and 10");
		tinError = false;
		return false;
	}
	else {
		$('#tinnocheck').hide();
	}
	}
	
// Validate Password
	$('#passcheck').hide();
	let passwordError = true;
	$('#password').keyup(function () {
		validatePassword();
	});
	function validatePassword() {
		let passwordValue =
			$('#password').val();
		if (passwordValue.length == '') {
			$('#passcheck').show();
			passwordError = false;
			return false;
		}
		if ((passwordValue.length < 3)||
			(passwordValue.length > 10)) {
			$('#passcheck').show();
			$('#passcheck').html
("**length of your password must be between 3 and 10");
			$('#passcheck').css("color", "red");
			passwordError = false;
			return false;
		} else {
			$('#passcheck').hide();
		}
	}
		
// Validate Confirm Password
	$('#conpasscheck').hide();
	let confirmPasswordError = true;
	$('#conpassword').keyup(function () {
		validateConfirmPassword();
	});
	function validateConfirmPassword() {
		let confirmPasswordValue =
			$('#conpassword').val();
		let passwordValue =
			$('#password').val();
		if (passwordValue != confirmPasswordValue) {
			$('#conpasscheck').show();
			$('#conpasscheck').html(
				"**Password didn't Match");
			$('#conpasscheck').css(
				"color", "red");
			confirmPasswordError = false;
			return false;
		} else {
			$('#conpasscheck').hide();
		}
	}
	
// Submit button
	$('#submitbtn').click(function () {
		validateUsername();
		validatePassword();
		validateConfirmPassword();
		validateEmail();
		if ((usernameError == true) &&
			(passwordError == true) &&
			(confirmPasswordError == true) &&
			(emailError == true)) {
			return true;
		} else {
			return false;
		}
	});
});
