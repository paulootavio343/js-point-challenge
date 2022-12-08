const container = document.getElementById('container');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
let history = [];
let redo = [];
let id = 0;

container.addEventListener('click', function (event) {
    const { clientX, clientY } = event;
    createPoint(clientX, clientY);
    checkLength();
});

undoBtn.addEventListener('click', () => {
    undoPoints();
    checkLength();
})

redoBtn.addEventListener('click', () => {
    redoPoints();
    checkLength();
})

function createPoint(coordinateX, coordinateY) {
    const object = { id: id, x: coordinateX, y: coordinateY };
    history.push(object);

    element = `<div class="point" id="point-${id}" style="top: ${coordinateY}px; left: ${coordinateX}px;"></div>`
    container.innerHTML += element;
    id++;
};

function undoPoints() {
    const obj = history.pop();
    const objID = obj.id;
    const coordinateX = obj.x;
    const coordinateY = obj.y;
    const elementToRemove = document.getElementById(`point-${objID}`);

    elementToRemove.remove();
    redo.push({ id: objID, x: coordinateX, y: coordinateY });
};

function redoPoints() {
    const firstElement = redo.pop();

    element = `<div class="point" id="point-${firstElement.id}" style="top: ${firstElement.y}px; left: ${firstElement.x}px;"></div>`
    container.innerHTML += element;

    const object = { id: firstElement.id, x: firstElement.x, y: firstElement.y };
    history.push(object);
};

function checkLength() {
    if (history.length < 1) {
        undoBtn.setAttribute('disabled', '');
    } else {
        undoBtn.removeAttribute('disabled');
    };

    if (redo.length < 1) {
        redoBtn.setAttribute('disabled', '');
    } else {
        redoBtn.removeAttribute('disabled');
    };
};

checkLength();
