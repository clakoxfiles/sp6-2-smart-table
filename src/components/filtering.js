import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules)

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach(elName => {
        elements[elName].append(
            ...Object.values(indexes[elName])
                .map(name => {
                    // const tag = `<option value="${name}">${name}</option>`
                    const tag = document.createElement('option')
                    tag.setAttribute('value', name)
                    tag.textContent = name

                    return tag
                })
        )
    })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action !== undefined && action.getAttribute('name') === 'clear') {
            const clearButton = action
            const input = clearButton.parentNode.querySelector('input')
            const fieldKey = clearButton.dataset.field

            input.value = ''
            state[fieldKey] = ''
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}