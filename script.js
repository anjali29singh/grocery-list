const grocWarn = document.querySelector('.hide-groc-warn'),
    quantWarn = document.querySelector('.hide-quant-warn'),
    grocBox = document.querySelector('.groc-input-box'),
    quantBox = document.querySelector('.quant-input-box'),
    addBtn = document.querySelector('.add-btn'),
    reminder = document.querySelector('.reminder'),
    addItem = document.querySelector('.list-of-items'),
    info = document.querySelector('.info'),
    done = document.querySelector('.done'),
    addCart = document.querySelector('.list-of-cart'),
    deleteBtn = document.querySelector('.delete-btn'),
    clearAll = document.querySelector('.delete-all')
listDisplay = document.querySelector('.list-display');
setupPage();
function setupPage() {
    const exist = localStorage.getItem('itemsList');
    if (exist) {
        const savedGrocery = JSON.parse(localStorage.getItem('itemsList'));
        savedGrocery.forEach((item) => {
            addToList(item);
        })
    }

}
function removeOldItems() {
    addItem.innerHTML = '';
    addCart.innerHTML = '';
}
//add button event
addBtn.addEventListener('click', inputField);

function inputField() {
    const grocery = grocBox.value;
    const quantity = quantBox.value;
    const value = `${grocery} (${quantity})`;
    grocBox.value = '';
    quantBox.value = '';
    if (grocery === '') {
        groceryWarn();
    }
    if (quantity === '') {
        quantityWarn();
    }
    else {
        const item = createItem(value, 'groceryItem');
        addToList(item);
        saveToLocalStorage(item);
    }

}
//warnings if invalid input
function groceryWarn() {
    grocWarn.classList.remove('hide-groc-warn');

}
function quantityWarn() {
    quantWarn.classList.remove('hide-quant-warn');
}

function createItem(value, listItem) {
    return {
        title: listItem,
        grocery: value,
        id: Date.now()
    }

}
//add items to grocery list
function addToList(item) {
    const listElements = document.createElement('li');
    listElements.classList.add('grocery-list-item');
    if (item.title === 'groceryItem') {
        listElements.innerHTML = `<p id='${item.id}'>${item.grocery}</p>
        <span class="material-symbols-outlined done">
    done_outline
    </span>`;
        addItem.appendChild(listElements);
    }
    else if (item.title === 'cartItem') {
        listElements.innerHTML = `<p id='${item.id}'>${item.grocery}</p> 
        <span class="material-symbols-outlined delete-btn">delete</span> `;
        addCart.appendChild(listElements);
    }

}
//add event listner to UL of grocery list
addItem.addEventListener('click', function (e) {
    const element = e.target;
    if (element.classList[1] === 'done') {
        grocId = Number(element.parentElement.children[0].id);
        element.parentElement.remove();
        const inCart = updateTitleStorage(grocId, 'cartItem');
        addToList(inCart);
    }
})
//add event listener to ul of cart list
addCart.addEventListener('click', function (e) {
    const targetElement = e.target;
    if (targetElement.classList[1] === 'delete-btn') {
        const grocId = targetElement.parentElement.children[0].id;
        targetElement.parentElement.remove();
        removeFromStorage(grocId);

    }

})
function removeFromStorage(itemId) {
    const savedItems = JSON.parse(localStorage.getItem('itemsList'));
    const newItemsList = savedItems.filter((item) => {
        return item.id != itemId;
    });
    localStorage.setItem('itemsList', JSON.stringify(newItemsList));


}
function updateTitleStorage(itemId, newTitle) {
    let updatedItem;
    const savedGroc = JSON.parse(localStorage.getItem('itemsList'));
    savedGroc.forEach((item) => {
        if (item.id == itemId) {
            item.title = newTitle;
            updatedItem = item;
        }
    });
    localStorage.setItem('itemsList', JSON.stringify(savedGroc));
    return updatedItem;


}
function saveToLocalStorage(item) {
    const savedItems = JSON.parse(localStorage.getItem('itemsList')) || [];
    savedItems.push(item);
    localStorage.setItem('itemsList', JSON.stringify(savedItems));
}

//delete all items event listener

clearAll.addEventListener('click', function () {
    const canDelete = confirm('are you sure you want to delete grocery');
    if (canDelete) {
        localStorage.clear();
        removeOldItems();
    }



})
