import { generateKeys, run } from './lib/RSA.js'


export function generateKeysRSA() {
    return new Promise((res, rej) => {
        res(generateKeys())
    })
}

export function runRSA(obj) {
    return run(obj)
}