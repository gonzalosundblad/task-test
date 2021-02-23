// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tasks } from './_tasks'

console.log(tasks)

export default (req, res) => {
  res.status(200).json(tasks)
}
