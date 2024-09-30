let container = document.querySelector('.skills-list');
let selectInputs = document.querySelectorAll('.skills-list_select');
const suggestedListContainer = document.querySelector('.suggested-list');

let languages = [
    'java', 
    'javascript',
    'typescript',
    'node',
    'python',
    'react',
    'nextjs',
    'HTML',
    'tailwind css',
    'css',
    'astro js',
    'c++',
    'c#'
]

const maxSize = 5
let selectValues = [];

function render() {
    container.innerHTML = "";

    selectValues.forEach((value, index) => {
        const div = document.createElement('div');
        div.className = 'skills-list_div';
        const p = document.createElement('p');
        p.innerText = `${index + 1}. ${value}`;

        const icon = document.createElement('i')
        icon.className = "fa-solid fa-xmark"

        div.append(p, icon);

        icon.addEventListener('click', () => {
            handleDeleteSkill(index);
        })

        container.appendChild(div);
    })

    for(let i = selectValues.length; i < maxSize; i++) {
        const select = document.createElement('select');
        select.className = 'skills-list_select';
        select.innerHTML = `
            <option value="">Add skills</option>
            ${languages.map(language => 
                `<option value="${language}">${language}</option>`
            )}
        `;

        select.addEventListener('change', () => handleSelectChange(select));
        container.appendChild(select);
    }

    const selectInputs = document.querySelectorAll('.skills-list_select');

    for(let j = 1; j < selectInputs.length; j++) {
        selectInputs[j].disabled = true;
    }
    getSuggestedSkills()
}

function handleSelectChange(select) {
    const value = select.value;
    if (value !== '') {
        selectValues = [...selectValues, value];
        languages = updateLanguages(languages, value);
        if (selectValues.length > maxSize) {
            selectValues = selectValues.slice(0, maxSize);
        }
        render();
    }
}

function getSuggestedSkills() {
    suggestedListContainer.innerText = "";
    let randomLanguages = getRandomLanguages(languages, maxSize);

    randomLanguages.forEach((lang, index) => {
        const button = document.createElement('button');
        button.className = "suggested-list_button";

        button.innerText = `+ ${lang}`

        if(selectValues.length < maxSize) {
            button.addEventListener('click', () => {
                selectValues = [...selectValues, lang];
                languages = languages.filter(language => language !== lang);
                render();
            })
        }
        suggestedListContainer.append(button);
    })
}

function getRandomLanguages(arr, count) {
    let shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function updateLanguages(languages, value){
    return languages.filter(language => language !== value);
}

function handleDeleteSkill(index) {
    const deletedSkill = selectValues[index];
    selectValues = selectValues.filter((_, i) => i !== index);
    languages = [...languages, deletedSkill];

    render();
}

render()