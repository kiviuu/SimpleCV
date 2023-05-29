function GeneratePDF(){
    console.log("function call");
    //section Personal Info
    var firstName = document.getElementById('firstname').value.trim();
    var middleName = document.getElementById('middlename').value.trim();
    var lastName = document.getElementById('lastname').value.trim();
    var genders = document.getElementsByName('gender');
    var gender;
    genders.forEach(item => {
        if(item.checked) gender = item.value.trim();
    });

    var birthDate = document.getElementById('birthdate').value;
    //section Personal Info


    //section Contacts
    var phone = document.getElementById('telnumber').value.trim();
    var email = document.getElementById('email').value.trim();
     //section Contacts


    //section Address
    var country = document.getElementById('country').value.trim();
    var city = document.getElementById('city').value.trim();
    var postalCode = document.getElementById('postalcode').value.trim();
    //section Address


    //section Education
    var education = document.getElementById('education').value.trim();
    //section Education


    //section Experience
    var jobsDates = document.getElementsByClassName('jobsdates');
    var jobsDatesList = [];
    for(let i = 0; i<jobsDates.length; i++){
        jobsDatesList.push(jobsDates[i].value.trim());
    }

    var jobsDescription = document.getElementsByClassName('jobsex');
    var jobdsDescriptionList = [];
    for(let i = 0; i<jobsDescription.length; i++){
        jobdsDescriptionList.push(jobsDescription[i].value.trim());
    }
    //section Experienc
    

    //section Languages
    var languages = document.getElementsByClassName('languages');
    var languagesList = [];
    for(let i = 0; i<languages.length; i++){
        languagesList.push(languages[i].value.trim());
    }

    var languagesLevels = document.getElementsByClassName('languageslevels');
    var languagesLevelsList = [];
    for(let i = 0; i<languagesLevels.length; i++){
        languagesLevelsList.push(languagesLevels[i].value.trim());
    }
    //section Languages


    //section Licenses
    var licenses = document.getElementsByClassName('licenses');
    var licensesList = [];
    for(let i = 0; i<licenses.length; i++){
        licensesList.push(licenses[i].value.trim());
    }
    //section Licenses


    //section Skills
    var skills = document.getElementsByClassName('skills');
    var skillsList = [];
    for(let i = 0; i<skills.length; i++){
       skillsList.push(skills[i].value.trim());
    }
    //section Skills


    //section Image
    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];
    
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageDataUrl = event.target.result;
      // Tutaj możesz wykorzystać imageDataUrl
      document.getElementById('imageHandler').src=imageDataUrl;
      console.log(imageDataUrl);
    };

    reader.readAsDataURL(file);
  }
    //section Image


    //section Provision
    if(document.getElementById('use-provision').checked){
        var provision = document.getElementById('identity').value.trim();
    }
    console.log(document.getElementById('use-provision').checked);
    //section Provision
}





//Fields add/remove
/*----------------------------------------------------------------------------------------*/
function removeField(counter, counterName, childClassName){
    if(counter>0){
        var children = document.getElementsByClassName(childClassName);
        var child = children.item(children.length-1);
        var element = child.parentElement;
        element.remove();

        switch (counterName){
            case 'JobsCounter': JobsCounter--;break;
            case 'LanguageCounter': LanguageCounter--;break;
            case 'LicenseCounter': LicenseCounter--;break;
            case 'SkillCounter': SkillCounter--;break;
        }
    }
    
}
/*----------------------------------------------------------------------------------------*/
//add experience button
var JobsCounter = 0;
const addjobbtn = document.getElementById('addJob');
addjobbtn.addEventListener('click', () => {
    var test = document.getElementsByClassName('jobsex')[JobsCounter];
    if(test.value.trim() != ""){
        JobsCounter++;
        var par = document.getElementById('experience');
        var div = document.createElement('div');
        var textNode = document.createTextNode('Start date');
        var label = document.createElement('label');
        label.for = 'jobdate' + JobsCounter;
        label.appendChild(textNode);
        div.appendChild(label);

        var input = document.createElement('input');
        input.type = 'date';
        input.id = 'jobdate'+JobsCounter;
        input.classList.add('jobsdates');
        input.placeholder = 'start date';
        input.addEventListener('change', () => {
            jobLangChange('jobsdates','jobsex','exp-parent','exp-field','expjob');
        });
        div.appendChild(input);

        input = document.createElement('input');
        input.type = 'text';
        input.id = 'jobex'+JobsCounter;
        input.classList.add('jobsex');
        input.placeholder = 'Job description';
        input.addEventListener('change', () => {
            jobLangChange('jobsdates','jobsex','exp-parent','exp-field','expjob');
        });
        div.appendChild(input);

        par.appendChild(div);
    }
    
});
//remove last experience button
const removejobbtn = document.getElementById('removeJob');
removejobbtn.addEventListener('click', () => {
    removeField(JobsCounter, 'JobsCounter', 'jobsdates');
    jobLangChange('jobsdates','jobsex','exp-parent','exp-field','expjob');
});
/*----------------------------------------------------------------------------------------*/
//add language field
var LanguageCounter = 0;
const addlangbtn = document.getElementById('addLanguage');
addlangbtn.addEventListener('click', () => {
    var test = document.getElementsByClassName('languages')[LanguageCounter];
    if(test.value.trim() != ""){
        LanguageCounter++;
        var par = document.getElementById('languages');
        var div = document.createElement('div');

        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'language'+LanguageCounter;
        input.classList.add('languages');
        input.placeholder = 'Language';
        input.addEventListener('change', () => {
            jobLangChange('languages','languageslevels','lang-parent','lang-field','lang-opt');
        });
        div.appendChild(input);

        input = document.createElement('input');
        input.type = 'text';
        input.id = 'languagelevel'+LanguageCounter;
        input.classList.add('languageslevels');
        input.placeholder = 'Level';
        input.addEventListener('change', () => {
            jobLangChange('languages','languageslevels','lang-parent','lang-field','lang-opt');
        });
        div.appendChild(input);

        par.appendChild(div);
    }
});
//remove last language field
const removelangbtn = document.getElementById('removeLanguage');
removelangbtn.addEventListener('click', () => {
    removeField(LanguageCounter, 'LanguageCounter', 'languages');
    jobLangChange('languages','languageslevels','lang-parent','lang-field','lang-opt');
});
/*----------------------------------------------------------------------------------------*/
//add license field
var LicenseCounter = 0;
const addlicbtn = document.getElementById('addLicense');
addlicbtn.addEventListener('click', () => {
    var test = document.getElementsByClassName('licenses')[LicenseCounter];
    if(test.value.trim() != ""){
        LicenseCounter++;
        var par = document.getElementById('licenses');
        var div = document.createElement('div');

        var label = document.createElement('label');
        var text = document.createTextNode('License');
        label.appendChild(text);
        div.appendChild(label);

        input = document.createElement('input');
        input.type = 'text';
        input.id = 'license'+LicenseCounter;
        input.classList.add('licenses');
        input.placeholder = 'License';
        div.addEventListener('change', () => {
            licSkillChange('licenses', 'licenses-parent', 'licenses-opt');
        });
        div.appendChild(input);
        par.appendChild(div);
    }
});
//remove last license field
const removelicbtn = document.getElementById('removeLicense');
removelicbtn.addEventListener('click', () => {
    removeField(LicenseCounter, 'LicenseCounter', 'licenses');
    licSkillChange('licenses', 'licenses-parent', 'licenses-opt');
});
/*----------------------------------------------------------------------------------------*/
//add skill field
var SkillCounter = 0;
const addskillbtn = document.getElementById('addSkill');
addskillbtn.addEventListener('click', () => {
    var test = document.getElementsByClassName('skills')[SkillCounter];
    if(test.value.trim() != ""){
        SkillCounter++;
        var par = document.getElementById('skills');
        var div = document.createElement('div');
        var textNode = document.createTextNode('Skill');
        var label = document.createElement('label');
        label.appendChild(textNode);
        div.appendChild(label);

        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'skill'+SkillCounter;
        input.classList.add('skills');
        input.placeholder = 'Skill description';
        input.addEventListener('change', () => {
            licSkillChange('skills', 'skills-parent', 'skill-opt');
        });
        div.appendChild(input);
        par.appendChild(div);
    }
    
});
//remove last skill field
const removeskillbtn = document.getElementById('removeSkill');
removeskillbtn.addEventListener('click', () => {
    removeField(SkillCounter, 'SkillCounter', 'skills');
    licSkillChange('skills', 'skills-parent', 'skill-opt');
});
/*----------------------------------------------------------------------------------------*/




//On change events
/*----------------------------------------------------------------------------------------*/
function simpleChange(inputId, targetId){
    let input = document.getElementById(inputId);
    let target = document.getElementById(targetId);
    target.innerHTML = input.value.trim();
}
function jobLangChange(firstInputClass, secondInputClass, parentId, pClass, spanClass){
    let targetParent = document.getElementById(parentId);
    while (targetParent.firstChild) {
        targetParent.removeChild(targetParent.firstChild);
    }

    let firstInputs = document.getElementsByClassName(firstInputClass);
    let secondInputs = document.getElementsByClassName(secondInputClass);

    let child;
    for(let i = 0; i<firstInputs.length; i++){
        child = document.createElement('p');
        child.classList.add(pClass);

        let span = document.createElement('span');
        span.classList.add(spanClass);
        span.appendChild(document.createTextNode(firstInputs[i].value.trim()));
        child.appendChild(span);

        child.appendChild(document.createTextNode(' - ' + secondInputs[i].value.trim()));
        targetParent.appendChild(child);
    }
}


document.getElementById('firstname').addEventListener('change', () => {
    simpleChange('firstname', 'name-fn');
});
document.getElementById('middlename').addEventListener('change', () => {
    simpleChange('middlename', 'name-mn');
});
document.getElementById('lastname').addEventListener('change', () => {
    simpleChange('lastname', 'name-ln');
});
document.getElementById('telnumber').addEventListener('change', () => {
    simpleChange('telnumber', 'tel-field');
});
document.getElementById('email').addEventListener('change', () => {
    simpleChange('email', 'email-field');
});
document.getElementById('country').addEventListener('change', () => {
    let input = document.getElementById('country');
    let target = document.getElementById('country-field');
    target.innerHTML = input.value.trim() + ", ";
});
document.getElementById('city').addEventListener('change', () => {
    let input = document.getElementById('city');
    let target = document.getElementById('city-field');
    target.innerHTML = input.value.trim() + " ";
});
document.getElementById('postalcode').addEventListener('change', () => {
    simpleChange('postalcode', 'postal-field');
});

document.getElementById('education').addEventListener('change', () => {
    let text = document.getElementById('education').value.trim();
    let targetParent = document.getElementById('education-list');
    

    while (targetParent.firstChild) {
        targetParent.removeChild(targetParent.firstChild);
    }
    

    let li = [];
    li = text.split(',');
    if(li[li.length-1] == "")
        li.pop();
    let child;
    for(let i = 0; i < li.length; i++){
        child = document.createElement('li');
        child.appendChild(document.createTextNode(li[i]));
        targetParent.appendChild(child);
    }
});

//TODO:
//language, license, skills, jobs - change events
//dodając te eventy trzeba je tez dodać przy tworzeniu nowych pól przyciskami

let jobsDates = document.getElementsByClassName('jobsdates');
let jobsEx = document.getElementsByClassName('jobsex');
for(let i = 0; i<jobsDates.length; i++){
    jobsDates[i].addEventListener('change', () => {
        jobLangChange('jobsdates','jobsex','exp-parent','exp-field','expjob');
    });
    jobsEx[i].addEventListener('change', () => {
        jobLangChange('jobsdates','jobsex','exp-parent','exp-field','expjob');
    });
}

let languages = document.getElementsByClassName('languages');
let languagesLevels = document.getElementsByClassName('languageslevels');
for(let i = 0; i<jobsDates.length; i++){
    languages[i].addEventListener('change', () => {
        jobLangChange('languages','languageslevels','lang-parent','lang-field','lang-opt');
    });
    languagesLevels[i].addEventListener('change', () => {
        jobLangChange('languages','languageslevels','lang-parent','lang-field','lang-opt');
    });
}

let licensesList = document.getElementsByClassName('licenses');
for(let i = 0; i<licensesList.length; i++){
    licensesList[i].addEventListener('change', () => {
        licSkillChange('licenses', 'licenses-parent', 'licenses-opt');
    });
}

let skillsList = document.getElementsByClassName('skills');
for(let i = 0; i<skillsList.length; i++){
    skillsList[i].addEventListener('change', () => {
        licSkillChange('skills', 'skills-parent', 'skill-opt');
    });
}


document.getElementById('photo').addEventListener('change', () => {
    console.log('image');
    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];
    
    if(file){
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageDataUrl = event.target.result;
            document.getElementById('imageHandler').src=imageDataUrl;
        }
        reader.readAsDataURL(file);
    }
});
const example = document.getElementById('identity-field').innerHTML;
const provisionCheck = document.getElementById('use-provision');
provisionCheck.addEventListener('change', () => {
    let input = document.getElementById('identity');
    let label = document.getElementById('identitylabel');
    let target = document.getElementById('identity-field');
    if(provisionCheck.checked){
        input.readOnly = false;
        label.style.color = '#141414';
        if(input.value != ""){
            target.innerHTML = input.value;
        }
        else{
            target.innerHTML = example;
        }
    }
    else{
        input.readOnly = true;
        label.style.color = 'rgb(110, 110, 110)';
        target.innerHTML = "";
    }
});
document.getElementById('identity').addEventListener('change', () => {
    let input = document.getElementById('identity');
    let target = document.getElementById('identity-field');
    if(provisionCheck.checked){
        if(input.value != ""){
            target.innerHTML = input.value;
        }
        else{
            target.innerHTML = example;
        }
    }
})
/*----------------------------------------------------------------------------------------*/




function licSkillChange(inputClass, parentId, pClass){
    let targetParent = document.getElementById(parentId);
    while (targetParent.firstChild) {
        targetParent.removeChild(targetParent.firstChild);
    }

    let firstInputs = document.getElementsByClassName(inputClass);

    let child;
    for(let i = 0; i<firstInputs.length; i++){
        child = document.createElement('p');
        child.classList.add(pClass);

        child.appendChild(document.createTextNode(firstInputs[i].value.trim()));
        targetParent.appendChild(child);
    }
}