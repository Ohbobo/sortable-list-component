let selectInputs = document.querySelectorAll('.skills-list_select');
const suggestedListContainer = document.querySelector('.suggested-list');

let list = [];

let languages = [
    'java', 
    'javascript',
    'typescript',
    'node',
    'python',
    'react',
    'nextjs'
]

function init() {
    disableAllExceptFirst();
    createOption(selectInputs, languages)
    createSuggestedSkills(languages);
}

init();

function disableAllExceptFirst() {
    for (let i = 1; i < selectInputs.length; i++) {
        selectInputs[i].disabled = true;
    }
}

function createOption(arr, values) {
    arr.forEach((element, index) => {
        element.innerText = "";
        const emptyOption = document.createElement('option');
        element.append(emptyOption);

        values.forEach(value => {
            const option = document.createElement('option');
            option.innerText = value;
            element.append(option);
        })
    })
}

function createSuggestedSkills(skills) {
    suggestedListContainer.innerText = "";
    skills.forEach(skill => {
        const button = document.createElement('button');
        button.className = 'suggested-list_button';

        button.innerText = `+ ${skill}`;
        suggestedListContainer.append(button);
    })
}

selectInputs.forEach((element, index) => {
    element.addEventListener('change', () => {
        const div = document.createElement('div')
        div.className = 'skills-list_div';

        const p = document.createElement('p');
        p.innerText = `${index + 1}. ${element.value}`;
        
        const icon = document.createElement('i')
        icon.className = "fa-solid fa-xmark";
        
        div.append(p, icon);

        element.replaceWith(div);
        languages = languages.filter(language => element.value !== language);
        list = [...list, element.value]
        createOption(selectInputs, languages);
        createSuggestedSkills(languages)
        console.log(list)
        selectInputs = document.querySelectorAll('.skills-list_select');
        const deleteButton = document.querySelectorAll('.fa-xmark');
        console.log(deleteButton)
        deleteButton.forEach((button, index) => {
            button.addEventListener('click', () => {
                list = list.filter((_, i) => index !== i)
                console.log(list)
            })
        })
        if (selectInputs.length > 0 && selectInputs[0]) {
            selectInputs[0].disabled = false;
        }
    });
});



