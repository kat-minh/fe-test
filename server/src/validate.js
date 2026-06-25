/**
 * Express middleware that validates `req.body` against a Zod schema. On success
 * the parsed value is stored on `req.valid`; on failure it returns 400 with a
 * field-keyed error map the FE can surface next to inputs.
 */
export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const errors = {}
      for (const issue of result.error.issues) {
        const key = issue.path.join(".") || "_"
        if (!errors[key]) errors[key] = issue.message
      }
      return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors })
    }
    req.valid = result.data
    next()
  }
}
