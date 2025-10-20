
let curr_id = 2
document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
        const parentId = this.parentElement.id;
        console.log('Parent ID:', parentId);
        document.getElementById(parentId).remove();
    });
});
function newBarista() {
    const baristaGroup = document.createElement('div');
    baristaGroup.className = 'barista-group';
    baristaGroup.id = curr_id;
    curr_id++;

    baristaGroup.innerHTML = `
                <input class="barista-name" type="text" placeholder="Enter a name here..."/>
                <input class="barista-hours" type="text" placeholder="Enter hrs." />
                <input class="barista-minutes" type="text" placeholder="Enter min." />
                <button class="delete-button">X Delete</button>
            `;

    baristaGroup.querySelector('.delete-button').addEventListener('click', function() {
        const parentId = this.parentElement.id;
        console.log('Parent ID:', parentId);
        document.getElementById(parentId).remove();
    });

    document.body.insertBefore(baristaGroup, document.getElementById('action-buttons'));
}

function calculateTips() {
    let timeFlag = false;
    const baristaMap = new Map();
    document.querySelectorAll('.barista-group').forEach(item => {
        children = item.children
        barista_name = children[0].value
        hours = children[1].value
        parsed_hour = parseFloat(hours)
        minutes = children[2].value
        parsed_minutes = parseFloat(minutes)
        if (isNaN(parsed_hour) && isNaN(parsed_minutes)) {
            timeFlag = true
        }
        const barista = {
            name: barista_name,
            hours: parsed_hour,
            minutes: parsed_minutes,
        }
        if (baristaMap.has(barista_name)) {
            alert("Names must be unique!")
        }
        baristaMap.set(barista_name, barista)
    });
    if (timeFlag) {
        alert('You must enter a time for all baristas!');
    }
    parsed_tips = parseFloat(document.getElementById('tip-input').value)
    let total = 0
    baristaMap.forEach((value, key) => {
        if (!isNaN(value.minutes)) {
            total += (value.minutes / 60.0)
        }
        if (!isNaN(value.hours)) {
            total += (value.hours)
        }
    });
    const tips = document.createElement('div');
    tips.innerHTML = `
        <h3>These are the tips:</h3> 
      `
    tips.id = "tips"
    baristaMap.forEach((value, key) => {
        let time = 0.0
        if (!isNaN(value.minutes)) {
            time += (value.minutes / 60.0)
        }
        if (!isNaN(value.hours)) {
            time += (value.hours)
        }
        let tipShare = parsed_tips * time / total
        console.log(`${value.name}: ${tipShare.toFixed(2)}`)
        tips.innerHTML += `<p>${value.name} tips: ${tipShare.toFixed(2)}</p>`
    });

    const elementToRemove = document.getElementById('tips');

    if (elementToRemove) {
        elementToRemove.remove();
    }
    document.body.insertBefore(tips, document.getElementById('action-buttons').nextSibling)
}

document.getElementById('calculate').addEventListener('click', calculateTips)

document.getElementById('add-barista').addEventListener('click', newBarista);
