import firebase from 'firebase/app'

export const timestampToDate = (timestamp: firebase.firestore.Timestamp) => {
  const date = timestamp.toDate()
  const y = date.getFullYear()
  const m = ('0' + (date.getMonth() + 1)).slice(-2)
  const d = ('0' + date.getDate()).slice(-2)
  const h = ('0' + date.getHours()).slice(-2)
  const i = ('0' + date.getMinutes()).slice(-2)
  const s = ('0' + date.getSeconds()).slice(-2)

  return `${y}/${m}/${d} ${h}:${i}:${s}`
}
