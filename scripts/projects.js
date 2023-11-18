async function loadFile(fileName) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/scripts/${fileName}.js`, true);
        xhr.responseType = 'document';

        xhr.onload = () => {
            if (xhr.status === 200) {
                if (xhr.response && xhr.response.documentElement) {
                    resolve(xhr.response.documentElement);
                } else {
                    reject('Invalid response format');
                }
            } else {
                reject('Error loading script: ' + xhr.statusText);
            }
        };
        xhr.send();
    });
}

class Project {
    constructor(name, title, description, demo) {
        this.name = name;
        this.title = title;
        this.description = description;
        this.demo = demo;
        this.content = this.setContent();
    }
    async setContent() {
        let fileContent =  await loadFile(this.name);
        let article = document.createElement("article");
        article.setAttribute('id', this.name);
        article.append(this.setDescriptionElem());
        article.append(this.setDemoElem());
        article.append(this.setCodeElem(fileContent));
        return article()
    }
    setDescriptionElem() {
        let description = document.createElement('section');
        description.setAttribute('class', 'description');
        description.innerHTML = this.description;
        return description;
    }

    setDemoElem() {
        let demo = document.createElement('section');
        demo.setAttribute('class', 'demo');
        demo.innerHTML = this.demo ? this.demo : '';
        return demo;
    }

    setCodeElem(fileContent) {
        let code = document.createElement('section');
        code.setAttribute('class', 'code');
        code.innerHTML = fileContent;
        return code;
    }

}

projects = [
    new Project('conways-game-of-life', 'Conway\'s Game of Life 🔁', `
    <p>Conway's Game of Life is cellular automata the outcome is determined by its initial state. The
        game
        is played on a grid where each cell can be either alive or dead, and they evolve according to
        the
        following rules:</p>
    <br />
    <ol>
        <li><b>Underpopulation:</b><br />&emsp;Any live cell with fewer than two live neighbors dies.
        </li>
        <li><b>Survival:</b><br />&emsp;Any live cell with two or three live neighbors lives on to the
            next
            generation.</li>
        <li><b>Overpopulation:</b><br />&emsp;Any live cell with more than three live neighbors dies.
        </li>
        <li><b>Reproduction:</b><br />&emsp;Any dead cell with exactly three live neighbors becomes a
            live
            cell .</li>
    </ol>
    <p><strong>This version of Conway's Game of Life includes a feature that shows the cells that are
            dying
            in a lighter color.</strong></p>`,
        '<canvas id="game" width="600" height="600"></canvas>'),
    new Project(
        'rock-paper-scissors',
        'Rock, Paper, Scissors 25 🔫🐉🌙',
        `<p>Experience the expanded excitement of Rock, Paper, Scissors 25, a variation of the classic hand game with 25 unique elements. In this game:</p><br />
    <p>Challenge yourself with an array of new choices and intricate rules, adding a strategic layer to the timeless game. Can you master the extended Rock, Paper, Scissors 25?</p><br />
    <p>Additional choices include elements like Dragon 🐉, Nuke ☢️, Lightning ⚡, and more.</p><br />
    <p>Rules are outlined for each element, specifying which elements they defeat.</p><br />
    <p>The game is played over multiple rounds, with a set number of rounds determined by the user.</p>`),
]


window.onload = async () => {
    for (let project of projects) {
        document.body.appendChild(await project.content);
    }
}

