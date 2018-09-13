import Route from '@ember/routing/route'

export default Route.extend({
  model ({slug}) {
    return fetch(`http://localhost:3000/post/${slug}`).then(response => {
      return response.json()
    })
  }
})
