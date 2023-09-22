class HashTable {
    constructor(size=53) {
        this.keyMap = new Array(size);
    }
    _hash(key) {
        let primeNum = 31;
        let idx = 0;
        for(let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            idx = (idx * primeNum + Math.abs(value)) % this.keyMap.length;
        }
        return idx;     
    }
    _rehash(key, value) {
        const prevKeyMap = this.keyMap;
        const newKeyMap = new Array(this.keyMap.length * 2);

        for(let i = 0; i < this.keyMap.length; i++) {
            if(this.keyMap[i]) {
                let prevKey = this.keyMap[i][0], prevValue = this.keyMap[i][1];
                this.keyMap = newKeyMap;
                this.set(prevKey, prevValue);
                this.keyMap = prevKeyMap;
            } 
        }
        this.keyMap = newKeyMap;
        this.set(key, value);
    }
    set(key, value) {
        let keyValue = this.get(key); // 끝까지 돌아서 없으면 undefined
        let index = this._hash(key);
        if(keyValue) {
            keyValue[1] = value;
            return;
        }
        while(index < this.keyMap.length) {
            if(!this.keyMap[index]) {
                this.keyMap[index] = [key, value];
                return;
            }
            index = index + 1;
        }
        this._rehash(key, value);
    }
    findIdxOfKey(key, index) {
        while(index < this.keyMap.length) {
            if(this.keyMap[index] && this.keyMap[index][0]===key)   return index;
            index = index + 1;
        }
        return undefined;
    }
    get(key) {
        let index = this._hash(key);
        let initialKeyValue = this.keyMap[index];
        let emptyOrOtherKey = !initialKeyValue || (initialKeyValue && initialKeyValue[0] !== key);
        if(emptyOrOtherKey) index = this.findIdxOfKey(key, index);
        if(!index)  return undefined;
        return this.keyMap[index];
        
    }
    delete(key) {
        let index = this._hash(key);
        let initialKeyValue = this.keyMap[index];
        let emptyOrOtherKey = !initialKeyValue || (initialKeyValue && initialKeyValue[0] !== key);
        if(emptyOrOtherKey) index = this.findIdxOfKey(key, index);
        if(!index)  return undefined;
        return this.keyMap.splice(index,1,undefined);
    }
    keys() {
        let keysArr = [];
        for(let keyValue of this.keyMap) {
            if(!keyValue)    continue;
            keysArr.push(keyValue[0]);   
        }
        return keysArr;
    }
    values() {
        let valuesArr = [];
        for (let keyValue of this.keyMap) {
            if(!keyValue)   continue;
            valuesArr.push(keyValue[1]);
        }
        return valuesArr;
    }
}
let ht = new HashTable(17);
ht.set('james',25);
ht.set('stark',31);
ht.set('kim',7);
ht.set('lee',22);
ht.set('yu',16);
ht.set('choi',84);
ht.set('jeon',34);
ht.set('park',59);
ht.set('parker',62);
console.log(ht.keyMap);
ht.set('parker',67);
console.log(ht.keyMap);
console.log(ht.delete('parker'));
console.log(ht.keyMap);
ht.set('aaa',1);
ht.set('bbb',2);
ht.set('ccc',3);
ht.set('ddd',4);
ht.set('eee',5);
ht.set('fff',6);
ht.set('ggg',7);
// console.log(ht.keyMap);
ht.set('hhh',8);
// console.log(ht.keyMap);
ht.set('iii',9);
// console.log(ht.keyMap);
ht.set('jjj',10);
console.log(ht.keyMap);
// console.log(ht.keys());
// console.log(ht.values());
// console.log(ht.keys());
// console.log(ht.values());