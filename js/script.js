document.cookie = 'mode=light';
let previewOriginal = null;

function consumeCookies(){
    let cookies = document.cookie.split(';');
    if (cookies.length >= 1){
        let temp = cookies[0].split("=");
        if (temp[0] === 'mode'){
            let toChangeH2 = document.querySelectorAll('.block h2');
            console.log(toChangeH2);
            let newH2Color = 'black';
            switch(temp[1]){
                case 'dark':{
                    document.body.style.backgroundColor = '#493C4B';
                    document.getElementById('options').style.color = 'white';
                    newH2Color = 'white';
                    document.getElementById('options').style.backgroundColor = '#242424';
                    document.getElementsByClassName('footer')[0].style.backgroundColor = 'black';
                    break;
                }
                case 'light':{
                    document.body.style.backgroundColor = '#EEE1F0';
                    document.getElementById('options').style.color = 'black';
                    newH2Color = 'black';
                    document.getElementById('options').style.backgroundColor = 'rgb(218, 214, 214)';
                    document.getElementsByClassName('footer')[0].style.backgroundColor = '#242424';
                    break;
                }
            }

            for(let i = 0; i < toChangeH2.length; i++){
                toChangeH2[i].style.color = newH2Color;
            }

        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    previewOriginal = document.getElementById('preview').cloneNode(true);
    //consume cookies
    consumeCookies();
});

function GeneratePDF(){
    console.log("function call");
    //section Personal Info
    var firstName = document.getElementById('firstname').value.trim();
    var middleName = document.getElementById('middlename').value.trim();
    var lastName = document.getElementById('lastname').value.trim();
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
    var educatnioList = [];
    educatnioList = education.split(',');
    if(educatnioList[educatnioList.length-1] == "")
        educatnioList.pop();
    //array with elements
    //section Education


    //section Experience
    var jobsDates = document.getElementsByClassName('jobsdates');
    var jobsDatesList = [];
    for(let i = 0; i<jobsDates.length; i++){
        jobsDatesList.push(jobsDates[i].value.trim());
    }

    var jobsDescription = document.getElementsByClassName('jobsex');
    var jobdsElements = [];
    for(let i = 0; i<jobsDescription.length; i++){
        var obj = {
            text: jobsDatesList[i],
            bold: true,
            width: 'auto',
        };
        var obj2 = {
            text: "-\u00A0" + jobsDescription[i].value.trim(),
            width: 'auto', 
            margin: [10,0,0,0]
        };
        var column = [obj, obj2];
        jobdsElements.push({columns: column});
    }
    //section Experienc

    

    //section Languages
    var languages = document.getElementsByClassName('languages');
    var languagesList = [];
    for(let i = 0; i<languages.length; i++){
        languagesList.push(languages[i].value.trim());
    }
    var languagesLevels = document.getElementsByClassName('languageslevels');
    var languagesElements = [];
    for(let i = 0; i<languagesLevels.length; i++){
        var obj = {
            text: languagesList[i],
            bold: true,
            width: 'auto',
        };
        var obj2 = {
            text: "-\u00A0" + languagesLevels[i].value.trim(),
            width: 'auto', 
            margin: [10,0,0,0]
        };
        var column = [obj, obj2];
        console.log(column);
        languagesElements.push({columns: column});
       
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
       skillsList.push({text: skills[i].value.trim()});
    }

    //section Skills


    //section Image
    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];
    const imageHandler = document.getElementById('imageHandler');
    let imgHeight = 0;
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageDataUrl = event.target.result; 
            //console.log(imageDataUrl);
            imageHandler.src=imageDataUrl;
        };
    
        reader.readAsDataURL(file);
    }
    var imageSrc = imageHandler.src;
    //console.log(imageSrc.height);
    const calculatedBottomMargin = 220 - imgHeight;
    //console.log(calculatedBottomMargin);
    var img = {
        image: "",
        fit: [150, 170],
        margin: [0,-5,0,0]
    }

    //console.log(file);
    if(typeof(file) === 'undefined'){
        alert("Wybierz plik graficzny!");
        return 0;
    }
    else{
        img.image = imageSrc;
    }
    var imageObj = {
        layout: 'noBorders',
        table:{
            heights: [ 200 ],
            body: [
                [
                    img
                ]
            ]
        }
    }
    //console.log(image);
    //section Image


    //section Provision
    var provision = "";
    if(document.getElementById('use-provision').checked){
        provision = document.getElementById('identity').value.trim();
    }
    //section Provision


    //section custom settings
    var headerColor = document.getElementById('header-color').value;
    var headerFontColor = document.getElementById('header-font-color').value;
    var contentColor = document.getElementById('content-color').value;
    var contentFontColor = document.getElementById('content-font-color').value;
    //section custom settings



    var h2Style = {
        fontSize: 15,
        margin: [0,20,0,10],
        bold: true
    };
    var footerStyle = {
        alignment: 'center',
        fontSize: 8,
        color: "#999999"
    };
    var space = {
        margin: [5,0,0,0]
    };
    var dd = {
        pageSize: 'A4',
        pageMargins: [ 30, 20, 30, 40 ],
        background: function () {
            return {
                canvas: [
                    {
                       type: 'rect',
                        x: 0, y: 0, w: 595.28, h: 250,
                        color: headerColor
                    },
                    {
                        type: 'rect',
                        x: 0, y: 200, w: 595.28, h: 641.89,
                        color: contentColor
                    }
                ]
            };
        },
        content: [
            {
                columns: [

                        imageObj,
                        {
                            stack:[
                                    {
                                        columns: [
                                                {text: firstName, width: 'auto'},
                                                {text: middleName, width: 'auto', style: 'spaces'},
                                                {text: (lastName + " "), width: 'auto', style: 'spaces'}
                                            ]
                                    },
                                    {text: "tel.\u00A0" + phone},
                                    {text: email},
                                    {
                                        columns: [
                                                {text: country + ",", width: 'auto'},
                                                {text: city, width: 'auto', style: 'spaces'},
                                                {text: postalCode, width: 'auto', style: 'spaces'}
                                            ], 
                                    }
                                ],width: 'auto',
                                absolutePosition: { x: 350, y: 45},bold: true, color: headerFontColor
                        }
                    ]

            },
            {
              text: "Education", bold: true, style: "h2", color: contentFontColor
            },
            {
                ul: educatnioList,color: contentFontColor
            },
            {
                text: "Experience", bold: true, style: "h2",color: contentFontColor
            },
            {
                stack: jobdsElements,color: contentFontColor
            },
            {
                text: "Language", bold: true, style: "h2",color: contentFontColor
            },
            {
                stack:  languagesElements,color: contentFontColor
            },
            {
                text: "Licenses", bold: true, style: "h2",color: contentFontColor
            },
            {
                stack: licensesList,color: contentFontColor
            },
            {
                text: "Skills", bold: true, style: "h2",color: contentFontColor
            },
            {
                stack: skillsList,color: contentFontColor
            },
            {
                text: provision,
                style: "footer",
                absolutePosition: { x: 35, y: 760, bottom: 0 },
            }
            
        ],
        styles: {
            h2: h2Style,
            footer: footerStyle,
            spaces: space
        }
    }
    pdfMake.createPdf(dd).open();
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

        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'jobdate'+JobsCounter;
        input.classList.add('jobsdates');
        input.placeholder = 'Job';
        input.addEventListener('input', () => {
            jobLangChange('jobsdates','jobsex','exp-parent','exp-field','expjob');
        });
        div.appendChild(input);

        input = document.createElement('input');
        input.type = 'text';
        input.id = 'jobex'+JobsCounter;
        input.classList.add('jobsex');
        input.placeholder = 'Job description';
        input.addEventListener('input', () => {
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
        input.addEventListener('input', () => {
            jobLangChange('languages','languageslevels','lang-parent','lang-field','lang-opt');
        });
        div.appendChild(input);

        input = document.createElement('input');
        input.type = 'text';
        input.id = 'languagelevel'+LanguageCounter;
        input.classList.add('languageslevels');
        input.placeholder = 'Level';
        input.addEventListener('input', () => {
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
        div.addEventListener('input', () => {
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
        input.addEventListener('input', () => {
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
//add email validation
const email = document.getElementById('email');
email.addEventListener('input', () => {
    if (email.validity.valid){
        email.style.borderColor = 'transparent';
        email.style.backgroundColor = 'transparent';
    }
    else{
        email.style.borderColor = 'red';
        email.style.backgroundColor = '#F29292';
    }
});



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
function changeColor(idInput, idTarget, isBackground){
    let input = document.getElementById(idInput);
    let target = document.getElementById(idTarget);
    if(isBackground)
        target.style.backgroundColor = input.value;
    else
        target.style.color = input.value;
}

function attachOnChangeEvents() {
    document.getElementById('firstname').addEventListener('input', () => {
        simpleChange('firstname', 'name-fn');
    });
    document.getElementById('middlename').addEventListener('input', () => {
        simpleChange('middlename', 'name-mn');
    });
    document.getElementById('lastname').addEventListener('input', () => {
        simpleChange('lastname', 'name-ln');
    });
    document.getElementById('telnumber').addEventListener('input', () => {
        simpleChange('telnumber', 'tel-field');
    });
    document.getElementById('email').addEventListener('input', () => {
        simpleChange('email', 'email-field');
    });
    document.getElementById('country').addEventListener('input', () => {
        let input = document.getElementById('country');
        let target = document.getElementById('country-field');
        target.innerHTML = input.value.trim() + ", ";
    });
    document.getElementById('city').addEventListener('input', () => {
        let input = document.getElementById('city');
        let target = document.getElementById('city-field');
        target.innerHTML = input.value.trim() + " ";
    });
    document.getElementById('postalcode').addEventListener('input', () => {
        simpleChange('postalcode', 'postal-field');
    });
    document.getElementById('education').addEventListener('input', () => {
        let text = document.getElementById('education').value.trim();
        let targetParent = document.getElementById('education-list');


        while (targetParent.firstChild) {
            targetParent.removeChild(targetParent.firstChild);
        }


        let li = [];
        li = text.split(',');
        if (li[li.length - 1] == "")
            li.pop();
        let child;
        for (let i = 0; i < li.length; i++) {
            child = document.createElement('li');
            child.appendChild(document.createTextNode(li[i]));
            targetParent.appendChild(child);
        }
    });


    let jobsDates = document.getElementsByClassName('jobsdates');
    let jobsEx = document.getElementsByClassName('jobsex');
    for (let i = 0; i < jobsDates.length; i++) {
        jobsDates[i].addEventListener('input', () => {
            jobLangChange('jobsdates', 'jobsex', 'exp-parent', 'exp-field', 'expjob');
        });
        jobsEx[i].addEventListener('input', () => {
            jobLangChange('jobsdates', 'jobsex', 'exp-parent', 'exp-field', 'expjob');
        });
    }

    let languages = document.getElementsByClassName('languages');
    let languagesLevels = document.getElementsByClassName('languageslevels');
    for (let i = 0; i < jobsDates.length; i++) {
        languages[i].addEventListener('input', () => {
            jobLangChange('languages', 'languageslevels', 'lang-parent', 'lang-field', 'lang-opt');
        });
        languagesLevels[i].addEventListener('input', () => {
            jobLangChange('languages', 'languageslevels', 'lang-parent', 'lang-field', 'lang-opt');
        });
    }

    let licensesList = document.getElementsByClassName('licenses');
    for (let i = 0; i < licensesList.length; i++) {
        licensesList[i].addEventListener('input', () => {
            licSkillChange('licenses', 'licenses-parent', 'licenses-opt');
        });
    }

    let skillsList = document.getElementsByClassName('skills');
    for (let i = 0; i < skillsList.length; i++) {
        skillsList[i].addEventListener('input', () => {
            licSkillChange('skills', 'skills-parent', 'skill-opt');
        });
    }


    document.getElementById('photo').addEventListener('input', () => {
        const fileInput = document.getElementById('photo');
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imageDataUrl = event.target.result;
                document.getElementById('imageHandler').src = imageDataUrl;
            }
            reader.readAsDataURL(file);
        }
    });
    const example = document.getElementById('identity-field').innerHTML;
    const provisionCheck = document.getElementById('use-provision');
    provisionCheck.addEventListener('input', () => {
        let input = document.getElementById('identity');
        let label = document.getElementById('identitylabel');
        let target = document.getElementById('identity-field');
        if (provisionCheck.checked) {
            input.disabled = false;
            label.style.color = '#141414';
            if (input.value != "") {
                target.innerHTML = input.value;
            } else {
                target.innerHTML = example;
            }
        } else {
            input.disabled = true;
            label.style.color = 'rgb(110, 110, 110)';
            target.innerHTML = "";
        }
    });
    document.getElementById('identity').addEventListener('input', () => {
        let input = document.getElementById('identity');
        let target = document.getElementById('identity-field');
        if (provisionCheck.checked) {
            if (input.value != "") {
                target.innerHTML = input.value;
            } else {
                target.innerHTML = example;
            }
        }
    })


    document.getElementById('header-color').addEventListener('input', () => {
        changeColor('header-color', 'pdfheader', true);
    });
    document.getElementById('header-font-color').addEventListener('input', () => {
        changeColor('header-font-color', 'pdfheader', false);
    });
    document.getElementById('content-color').addEventListener('input', () => {
        changeColor('content-color', 'pdfsection', true);
    });
    document.getElementById('content-font-color').addEventListener('input', () => {
        changeColor('content-font-color', 'pdfsection', false);
    });
}
attachOnChangeEvents();
/*----------------------------------------------------------------------------------------*/
function validateRequiredFields(){
    let fullValid = true;
    return true;
    const toValidateFields = document.getElementsByClassName('to-validate');
    const toValidPairs = Array.from(toValidateFields).map(field => {
       const input = field.querySelector('input');
       const message = field.querySelector('.message');
       return [input, message];
    });

    for (let i = 0; i < toValidateFields.length; i++) {
        if (toValidPairs[i][0].validity.valid === false){
            toValidPairs[i][1].style.display = 'block';
            fullValid = false;
        }
        else{
            toValidPairs[i][1].style.display = 'none';
        }
    }
    return fullValid;
}

document.getElementById('submit-btn').addEventListener('click', () => {
    if (validateRequiredFields()) {
        GeneratePDF();
    }
});
document.getElementById('reset-btn').addEventListener('click', () => {
    const previewCopy = previewOriginal.cloneNode(true);
    document.getElementById('preview').replaceWith(previewCopy);
    attachOnChangeEvents();
});