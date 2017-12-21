$(document).ready(function(){

var salary_score = 0;
var education_score = 0;
var experience_score = 0;
var age_score = 0;
var timeSpent_score = 0;
var chineseLevel_score = 0;
var location_score = 0;
var extraCredit_score = 0;
var province_score = 0;
var points = 0;
var tier = "";

var boundaryA = "Tier A: > 84 points";
var boundaryB = "Tier B: 60-84 points";
var boundaryC = "Tier C: < 60 points";

var descriptionA = 'Your are a Tier A expat - approximately 16 percent of expats qualify for this tier. You qualify for a “green channel” application, meaning you can enjoy expedited approval times and are not required to apply using original paper work. You may enjoy long permit validity and a more comfortable work status once in China.';
var descriptionB = 'You are a Tier B expat - approximately 61 percent of expats qualify for this tier. You are required to apply for your permit with original documents and may experience longer processing time than Tier A expats. Additionally, your permit may have a shorter validity period; however, this will not be unreasonably short, and will allow for longer periods working within China.';
var descriptionC = 'You are a Tier C expat - Approximately 22 percent of expats fall into this tier. Your work in China will be short-term, or subject to government quotas and labor market demand. Additionally, permit processing times may be longer than those of Tier A and Tier B expats.';

//event handler for checkboxes
$('input[type="checkbox"]').on('change', function() {
    if(this.name == "extra_credit"){
		if($('[name=extra_credit]:checked').length > 0){ 
			$('td#extra_credit').html("5");
			extraCredit_score = 5;
		}
		else{
			$('td#extra_credit').html("0");
			extraCredit_score = 0;
		}
		
		
    }
	
	updatePoints();
	updateTier();
	displayTierDescription(tier);
  		
});
		

//event handler for radio buttons
$('input[type="radio"]').on('change', function() {
		
		if (this.name == "education"){
				$('tr').children('.education').html("");
				$(this).parent().next().html(this.value);
				$("tr.education").addClass("valid"); 
				education_score = parseInt(this.value);
			}	
		else if(this.name == "chinese_level"){
				$('tr').children('.chinese_level').html("");
				$(this).parent().next().html(this.value);
				$("tr.chinese_lvl").addClass("valid"); 
				chineseLevel_score = parseInt(this.value);
			}
		else if(this.name == "location"){
				$('tr').children('.location').html("");
				$(this).parent().next().html(this.value);
				$("tr.location").addClass("valid"); 
				location_score = parseInt(this.value);
			}
	updatePoints();
    updateTier();
	displayTierDescription(tier);
});
	

//event handler for text input fields
$('input[type="text"]').on('keyup', function() {
	
	if(this.name == "salary"){
		if(validSalary(this.value)){
			salary_score = salaryScore(this.value);
			$("tr.salary").removeClass("invalid"); 
			$("tr.salary").addClass("valid"); 
			$(this).popover("hide");
			
		}
		else{
			$(this).popover("show");
			salary_score = 0;
			$("tr.salary").removeClass("valid"); 
			$("tr.salary").addClass("invalid"); 
			$('td#salary').html("");
		}
	}

	if(this.name == "experience"){
		if(validexperience(this.value)){
			experience_score = experienceScore(this.value);
			$("tr.experience").removeClass("invalid"); 
			$("tr.experience").addClass("valid"); 
			$(this).popover("hide");
			
		}
		
		else{
			$(this).popover("show");
			experience_score = 0;
			$("tr.experience").removeClass("valid"); 
			$("tr.experience").addClass("invalid"); 
			$('td#experience').html("");
		}
	
	}

	if(this.name == "time_spent"){
		if(validtimeSpent(this.value)){
			timeSpent_score = timeSpentScore(this.value);
			$("tr.time_spent").removeClass("invalid"); 
			$("tr.time_spent").addClass("valid"); 
			$(this).popover("hide");
		}
		else{
			$(this).popover("show");
			timeSpent_score = 0;
			
			$("tr.time_spent").removeClass("valid"); 
			$("tr.time_spent").addClass("invalid"); 
			$('td#time_spent').html("");
		}
	
	}
	
	if(this.name == "age"){
		if(validage(this.value)){
			age_score = ageScore(this.value);
			$("tr.age").removeClass("invalid"); 
			$("tr.age").addClass("valid"); 
			$(this).popover("hide");
		}
		else{
			$(this).popover("show");
			age_score = 0;
			$("tr.age").removeClass("valid");
			$("tr.age").addClass("invalid");  
			$('td#age').html("");
		}
	
	}
	
	if(this.name == "province"){
		if(validprovince(this.value)){
			province_score = provinceScore(this.value);
			$("tr.province").removeClass("invalid"); 
			$("tr.province").addClass("valid"); 
			$(this).popover("hide");
		}
		else{
			$(this).popover("show");
			province_score = 0;
			$("tr.province").removeClass("valid");
			$("tr.province").addClass("invalid");  
			$('td#province').html("");
		}
	
	}

	updatePoints();
	updateTier();
	displayTierDescription(tier);

});


//update points as information is inputted
function updatePoints(){
points = salary_score + education_score + experience_score + timeSpent_score + extraCredit_score + chineseLevel_score + location_score + province_score + age_score;
$('td#points').html(points);
};

//update tier as total points changes
function updateTier(){
	if (points > 84){
		tier = "A";
		$('td#tier').html("A");
	}
	else if (points >= 60){
		tier = "B";
		$('td#tier').html("B");
	}
	else{
		tier = "C";
		$('td#tier').html("C");
	}
}
    
//check validity of inputs in text fields
function validSalary(n){
	if (isNaN(n)  || parseFloat(n) % 1 != 0 || parseInt(n) <= 0){
	return false;
	}
	return true;
}

function validage(n){
	if (isNaN(n)  || parseFloat(n) % 1 != 0 || parseInt(n) <= 0 || parseInt(n) < 18){
	return false;
	}
	return true;
}

function validtimeSpent(n){
	if (isNaN(n)  || parseFloat(n) % 1 != 0 || parseInt(n) <= 0 || parseInt(n) > 12){
	return false;
	}
	return true;
}

function validexperience(n){
	if (isNaN(n)  || parseFloat(n) % 1 != 0 || parseInt(n) <= 0){
	return false;
	}
	return true;
}

function validprovince(n){
	if (isNaN(n)  || parseFloat(n) % 1 != 0 || parseInt(n) < 0 || parseInt(n) > 10){
	return false;
	}
	return true;
}

//return scores corresponding to valid inputs in text fields
function salaryScore(n){
	if (n >= 450000){
		$('td#salary').html("20");
		return 20;
	}
	else if (n >= 350000){
		$('td#salary').html("17");
		return 17;
	}
	else if (n >= 250000){
		$('td#salary').html("14");
		return 14;
	}
	else if (n >= 150000){
		$('td#salary').html("11");
		return 11;
	}
	else if (n >= 70000){
		$('td#salary').html("8");
		return 8;
	}
	else if (n >= 50000){
		$('td#salary').html("5");
		return 5;
	}
	else{
		$('td#salary').html("0");
		return 0;
	}	
}

function timeSpentScore(n){
	if (n >= 9){
		$('td#time_spent').html("15");
		return 15;
	}
	else if (n >= 6){
		$('td#time_spent').html("10");
		return 10;
	}
	else if (n >= 3){
		$('td#time_spent').html("5");
		return 5;
	}
	else if (n < 3){
		$('td#time_spent').html("0");
		return 0;
	}

}

function ageScore(n){
	if (n <= 25){
		$('td#age').html("10");
		return 10;
	}
	else if (n <= 45){
		$('td#age').html("15");
		return 15;
	}
	else if (n <=55){
		$('td#age').html("10");
		return 10;
	}
	else if (n <= 60){
		$('td#age').html("5");
		return 0;
	}
	else if (n > 60){
		$('td#age').html("0");
		return 0;
	}


}

function experienceScore(n){
	if (n < 2){
		$('td#experience').html("0");
		return 0;
	}
	else if (n < 17){
		n = parseInt(n);
		n = n + 3;
		$('td#experience').html(n.toString());
		return n;
	}
	
	else{
		$('td#experience').html("20");
		return 20;
	}

}

function provinceScore(n){
		n = parseInt(n);
		$('td#province').html(n.toString());
		return n;
}

//display work permit tier and relevant information based on score
function displayTierDescription(s){

	if(s=="A"){
		$('p#tier_boundary').html(boundaryA);
		$('p#tier_description').html(descriptionA);
		}
	else if(s=="B"){
		$('p#tier_boundary').html(boundaryB);
		$('p#tier_description').html(descriptionB);
		}
	else if(s=="C"){
		$('p#tier_boundary').html(boundaryC);
		$('p#tier_description').html(descriptionC);
		}
}

//Trigger function for the pop-up boxes
$(function () {
  $('.HSK').popover({content:"The Hanyu Shuiping Kaoshi (HSK), also known in English as the Chinese Proficiency Test, is the only standardised examination for non-native Chinese speakers. Level 1 indicates a basic understanding of Chinese. Level 5 and above indicates an advanced understanding, with the ability to express oneself vocally and in written form without issue.", 
  container:'body', trigger:'hover', placement:'right'});
  $('[data-toggle="popover"]').popover({html:true});
  
});


//control popovers with trigger set to hover
$(".popstay").on("mouseenter", function () {
    $(this).popover("show");	
	var _this = this;
	$(".popover").on("mouseleave", function () {
        $(_this).popover('hide');
		});
	}).on("mouseleave", function () {
    var _this = this;
	
    setTimeout(function () {
        if (!$(".popover:hover").length) {
            $(_this).popover("hide");
        }
    }, 100);
	});

//collapse all table sections at the beginning
$('.header').nextUntil('tr.header').hide(); 

//control of colours and opening and closing of sections in table
$('.header').click(function(){
	$('.header').not(this).nextUntil('tr.header').hide();
	
	
		if($('tr.selected1').next().find("input").is("[type=text]")){
			$('tr.selected1').children(".input_display").html($('tr.selected1').next().find("input").val());
			$('tr.selected1').children(".score_display").html($('tr.selected1').next().find(".calcscore").html());
			
			if(!($(this).next().find("input").is("[type=text]") && $(this).hasClass("selected1"))){
				$('tr.selected1').next().find('input').popover("hide");
				}
	
		}
	
		else if($('tr.selected1').next().find("input").is("[type=radio]")){
			var name = $('tr.selected1').next().find("input").attr("name");
			if ($('input[name=' + '"' + name + '"]:checked').val()){
				$('tr.selected1').children(".input_display").html($('input[name=' + '"' + name + '"]:checked').parent().prev().html());
				$('tr.selected1').children(".score_display").html($('input[name=' + '"' + name + '"]:checked').val());
			}
			else {
				$('tr.selected1').children(".input_display").html("");
				$('tr.selected1').children(".score_display").html("");
			}	
			
		}
	
		else{
			$('tr.selected1').addClass("valid");
			$('tr.selected1').children(".input_display").html($('input[name="extra_credit"]:checked').parent().prev().html());
			if($('[name=extra_credit]:checked').length > 0){ 
				$('tr.selected1').children(".score_display").html("5");	
			}
			else{
				$('tr.selected1').children(".score_display").html("0");
				$('tr.selected1').children(".input_display").html("None");
			}
		}
	
	
	$('.header').not(this).removeClass("selected1");
	
    $(this).nextUntil('tr.header').toggle();
	$(this).nextUntil('tr.header').addClass("selected2");
	$(this).addClass("selected1");
	
	if($(this).next().find('input').is(':visible')){
		$(this).children(".input_display").html("<strong>Input</strong>");
		$(this).children(".score_display").html("<strong>Score</strong>");
		if($(this).hasClass("invalid")){
			$(this).next().find('input').popover("show");
			}
		}
		else
			$(this).next().find('input').popover("hide");
	
	$('.header').not(this).children(".input_display").html();
});

});
