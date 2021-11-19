const messages = {
  SUCCESSFUL: 'successful',
  PARAM_REQUIRED: (param: string) => `${param} is required`,
  CREATION_ERROR: (data: string) => `an error occurred while saving ${data}`,
  FETCHING_ERROR: (data: string) => `an error occurred while fetching ${data}`,
  INVALID_ID: (data: string) => `invalid ${data} id`,
  INVALID_PARAM: (data: string) => `${data} is invalid`,
  MINIMUM: (param: string, min: any) => `${param} cannot be less than ${min}`,
  MAXIMUM: (param: string, max: any) => `${param} cannot be more than ${max}`,
}

export default messages
