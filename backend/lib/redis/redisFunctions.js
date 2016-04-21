export const getUserHabits = (client, username) => {
  return client.hgetAsync('users', username)
  .then(data => {
    const habits = JSON.parse(data)
    return Promise.resolve(habits)
  })
}

export const addNewHabit = (client, username, habit) => {
  return client.hgetAsync('users', username)
  .then(data => {
    const initHabits = JSON.parse(data)
    const newHabits = !initHabits ? [habit] : initHabits.concat(habit)
    const strnewHabits = JSON.stringify(newHabits)
    return client.hsetAsync('users', username, strnewHabits)
  })
  .then(() => client.hgetAsync('users', username))
  .then(data => Promise.resolve(JSON.parse(data)))
}

export const completeHabit = (client, username, habit) => {
  return client.hgetAsync('users', username)
  .then(data => {
    const parsed = JSON.parse(data).habits
    const habitObj = {}
    habitObj.habit = habit
    habitObj.completed = false
    const stringObj = JSON.stringify(habitObj)
    const parsedString = parsed.map(e => JSON.stringify(e))
    const oldSpecific = JSON.parse(parsedString[parsedString.indexOf(stringObj)])
    const beforeSpecific = parsed.slice(0, parsed.indexOf(habit) - 1)
    const newSpecific = Object.assign(oldSpecific, {}, {completed: true})
    const afterSpecific = parsed.slice(parsed.indexOf(habit) + 1, parsed.length - 1)
    const completedHabitsArray = beforeSpecific.concat(newSpecific).concat(afterSpecific)
    client.hsetAsync('users', username, JSON.stringify(completedHabitsArray))
  })
}
