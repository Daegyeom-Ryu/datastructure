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
    set(key, value) {
        let keyValueArr = this.get(key);
        let index = this._hash(key);
        if(!this.keyMap[index]) this.keyMap[index] = [];
        if(!keyValueArr)    this.keyMap[index].push([key, value]);    
        else keyValueArr[1] = value;
    }
    get(key) {
        let index = this._hash(key);
        if(this.keyMap[index]) {
            for(let i = 0; i < this.keyMap[index].length; i++) {
                if(this.keyMap[index][i][0] === key)    return this.keyMap[index][i];
            }
        }
        // 해당 인덱스 배열 없는 경우, 인덱스 배열 있어도 찾는 key,value 없는 경우
        return undefined;
    }
    delete(key) {
        let index = this._hash(key);
        if(this.keyMap[index]){
            for(let i = 0; i < this.keyMap[index].length; i++) {
                if(this.keyMap[index][i][0] === key)    return this.keyMap[index].splice(i,1,undefined);
            }
        }
        return undefined;
    }
    keys() {
        let keysArr = [];
        for(let keyValueArr of this.keyMap) {
            if(!keyValueArr)    continue;
            for(let keyValue of keyValueArr) {
                keysArr.push(keyValue[0]);
            }
        }
        return keysArr;
    }
    values() {
        let valuesArr = [];
        for (let keyValueArr of this.keyMap) {
            if(!keyValueArr)    continue;
            for(let keyValue of keyValueArr) {
                valuesArr.push(keyValue[1]);
            }
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
ht.delete('parker');
console.log(ht.keyMap);
console.log(ht.keys());
console.log(ht.values());