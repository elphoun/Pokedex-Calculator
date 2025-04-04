document.addEventListener('DOMContentLoaded', function() {
    const modifierSelect = document.querySelector('.modifier-select');
    const modifierList = document.querySelector('.modifier-list');
    const selectedModifiers = new Set();

    modifierSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.value && !selectedModifiers.has(selectedOption.value)) {
            selectedModifiers.add(selectedOption.value);
            addModifierToList(selectedOption.value, selectedOption.text);
            this.value = ''; // Reset the select
        }
    });

    function addModifierToList(value, text) {
        const item = document.createElement('div');
        item.className = 'modifier-item';
        item.dataset.value = value;

        const textSpan = document.createElement('span');
        textSpan.textContent = text;

        const removeButton = document.createElement('button');
        removeButton.textContent = '×';
        removeButton.addEventListener('click', function() {
            selectedModifiers.delete(value);
            item.remove();
        });

        item.appendChild(textSpan);
        item.appendChild(removeButton);
        modifierList.appendChild(item);
    }
});