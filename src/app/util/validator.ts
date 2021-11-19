import {messages} from ".";

const pass = (val: any) => ({ success: true, val, message: '' })
const fail = (val: any, message: string) => ({ success: false, val, message })

export interface ValidatorResponse {
  success: boolean,
  val: any
  message: string
}

export interface ValidatorRequest {
  key: string,
  val: any
  params: any[]
}

const required = ({ key, val }: ValidatorRequest) => {
  return (val && val !== '') || val === 0 ? pass(val) : fail(val, messages.PARAM_REQUIRED(key));
}

const signedNumber = ({ key, val }: ValidatorRequest) => {
  let num = Number(val)
  if (num && num > 0) return pass(num)
  return fail(num, messages.INVALID_PARAM(key))
}

const minimum = ({ key, val, params }: ValidatorRequest) => {
  return val > params[0] ? pass(val) : fail(val, messages.MINIMUM(key, params[0]))
}

const maximum = ({ key, val, params }: ValidatorRequest) => {
  return val < params[0] ? pass(val) : fail(val, messages.MAXIMUM(key, params[0]))
}

const validators: {[key:string]: (data: ValidatorRequest) => ValidatorResponse} = {
  required,
  signedNumber,
  minimum,
  maximum,
}

class Validator {

  errors: string[] = []
  data: {[key:string]: any}
  validations: {[key:string]: string[]}

  constructor(data: {[key:string]: any}, validations: {[key:string]: any}) {
    this.data = data
    this.validations = validations
  }

  validate() {
    for (const key in this.validations) {
      for (const validation of this.validations[key]) {
        const validations = validation.split(',').map(v => v.trim())
        const res = validators[validations[0]]({ key, val: this.data[key], params: validations.slice(1) })
        if (!res.success) {
          this.errors.push(res.message)
          break
        } else this.data[key] = res.val
      }
    }
  }
}

export default Validator
