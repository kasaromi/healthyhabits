export const getAllUsers = (client) => {
  return client.hgetallAsync('users')
}

export const storeUser = (client, username, action) => {
  return client.hsetAsync('users', username, action)
}

export const getUserActions = (client, username) => {
  return client.hgetAsync('users', username)
    .then(data => {
      const habits = JSON.parse(data).actions
      return Promise.resolve(habits)
    })
}

export const addNewAction = (client, username, action) => {
  console.log(username, 'USERNAME')
  console.log(typeof action, 'ACTION')
  return client.hgetAsync('users', username)
    .then(data => {
      if (data) {
        console.log(data, 'DATA!!!')
        const initActions = JSON.parse(data).actions
        const newActions = initActions.concat(action)
        const strnewActions = JSON.stringify(newActions)
        return client.hsetAsync('users', username, JSON.stringify(strnewActions))
      } else {
        return client.hsetAsync('users', username, JSON.stringify(action))
        .then(() => {
          console.log('------log----')
          return client.hgetAsync('users', username)
          .then(d => {
            console.log(d, '<<<<<data')
            return Promise.resolve(d)
          })
        })
      }
    })
}

export const completeAction = (client, username, action) => {
  return client.hgetAsync('users', username)
    .then(data => {
      const parsed = JSON.parse(data).actions
      const actionObj = {}
      actionObj.action = action
      actionObj.completed = false
      const stringObj = JSON.stringify(actionObj)
      const parsedString = parsed.map(e => JSON.stringify(e))
      const oldSpecific = JSON.parse(parsedString[parsedString.indexOf(stringObj)])
      const beforeSpecific = parsed.slice(0, parsed.indexOf(action) - 1)
      const newSpecific = Object.assign(oldSpecific, {}, {completed: true})
      const afterSpecific = parsed.slice(parsed.indexOf(action) + 1, parsed.length - 1)
      const completedActionsArray = beforeSpecific.concat(newSpecific).concat(afterSpecific)
      client.hsetAsync('users', username, JSON.stringify(completedActionsArray))
    })
}
