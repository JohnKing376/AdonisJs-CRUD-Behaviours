import vine from '@vinejs/vine'

// This add validation to The User storing Data
// This also helps define what the data should be... Therefore helping the User input the correct data.
export const createPostValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(8),
    surname: vine.string().trim(),
    attendance: vine.boolean(),
  })
)

// This helps the user safely input parameters into the field of name
export const updatePostValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4).maxLength(8),
  })
)
