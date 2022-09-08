function generatePrimeNumber(b) {
    const min = bigInt.one.shiftLeft(b - 1);
    const max = bigInt.one.shiftLeft(b).prev();

    while (true) {
        let p = bigInt.randBetween(min, max);
        if (p.isProbablePrime(256)) {
            return p;
        }
    }
}

export function generateKeys() {
    const size = 1024
    const e = bigInt(1399)
    let p, q, t, n, d

    do {
        p = generatePrimeNumber(size / 2)
        q = generatePrimeNumber(size / 2)
        t = bigInt.lcm(p.prev(), q.prev());
    } while (bigInt.gcd(e, t).notEquals(1) || p.minus(q).abs().shiftRight(size / 2 - 100).isZero())

    n = p.multiply(q)
    d = e.modInv(t)

    return {
        e,
        n,
        d,
        p,
        q
    }
}

function convertStringToAsciiBytes(message) {
    const bytes = message
        .split('')
        .map(c => c.charCodeAt())
        .join('');

    return bigInt(bytes);
}


function convertAsciiBytesToString(bytes) {
    const str = bytes.toString();
    let string = '';

    for (let i = 0; i < str.length; i += 2) {
        let num = Number(str.substr(i, 2));

        if (num <= 30) {
            string += String.fromCharCode(Number(str.substr(i, 3)));
            i++;
        } else {
            string += String.fromCharCode(num);
        }
    }

    return string;
}

function cypher(encodedMsg, n, e) {
    return bigInt(encodedMsg).modPow(e, n);
}

function decypher(encryptedMsg, d, n) {
    return bigInt(encryptedMsg).modPow(d, n);
}


export function run({e,n,d, message}) {
    console.log(message)
    let numberAscii = convertStringToAsciiBytes(message)
    let cyphered = cypher(numberAscii, n, e)
    let decyphered = decypher(cyphered, d, n)

    let textConvert = convertAsciiBytesToString(decyphered)


    return {
        numberAscii,
        cyphered,
        decyphered,
        textConvert
    }
}