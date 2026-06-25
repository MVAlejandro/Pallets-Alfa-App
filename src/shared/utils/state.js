
// Función para crear el estado de los registros del módulo para su manejo
export function createModuleState() {
    return {
        allRecords: [],
        visibleRecords: [],
        currentPage: 1
    };
}

// Función para reiniciar el estado de los registros del módulo
export function resetState(state) {
    state.allRecords = [];
    state.visibleRecords = [];
    state.currentPage = 1;
}

// Función para actualizar el estado de los registros del módulo con base en una función GET
export async function refreshState(state, getFunction) {
    state.allRecords = await getFunction();
    state.visibleRecords = state.allRecords;
}
