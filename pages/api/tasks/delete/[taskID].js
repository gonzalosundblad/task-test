// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tasks } from '../_tasks'

console.log(tasks)

export default (req, res) => {

  const {
    query: { taskID },
  } = req
  
  
  var newTasks = tasks.filter(t => t.id === parseInt(taskID));
  res.status(200).json(newTasks)
}

