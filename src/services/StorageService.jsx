const storageKey = 'lista-tarefas'; 
export function setStorage(value){
    localStorage.clear();
    localStorage.setItem(storageKey, JSON.stringify(value));
}
export function getStorage(){
    const value = localStorage.getItem(storageKey);
    return value ? JSON.parse(value) : [[], [], []];
}