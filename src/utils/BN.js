import { ethers } from 'ethers'

const BNRegex = /^(?<neg>-?)(?<whole>\d*)(.(?<fraction>\d*))?$/

ethers.BigNumber.prototype.format = function(decimals, precision = 0) {
    const num = this.toString() / 10 ** decimals
    return num.toLocaleString(undefined, {
        maximumFractionDigits: precision
    })
}

ethers.BigNumber.prototype.e = function(x) {
  return this.mul(new BN(10).pow(new BN(x)))
}

export function toBN(x) { return ethers.BigNumber.from(x) }

export function parse(input, decimals = 0) {
  if(typeof input !== 'string') throw new Error(`[BN.parse] while converting ${input}, is not a string`)

  const match = input.match(BNRegex)

  if(!match) throw new Error(`[ethjs-unit] while converting number ${input} to wei, invalid value`);

  const { whole, fraction, neg } = match.groups

  if(fraction && fraction.length > decimals) throw new Error(`[ethjs-unit] while converting number ${input} to wei,  too many decimal places`);

  const fractionBN = !fraction ? 0 :
    fraction.length > decimals
      ? fraction.substring(0, decimals)
      : fraction.padEnd(decimals, 0)

  return toBN(neg + whole).e(decimals).add(toBN(neg + fractionBN))
}


export const MAX_256 = toBN('115792089237316195423570985008687907853269984665640564039457584007913129639935')
export default toBN

window.BN = {
  parse
}
