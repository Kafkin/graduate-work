export default {

  post: async ( url, data, description ) => {
    try {
      const res = await fetch( url, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data ),
        method: 'POST',
      })

      const response = await res.json()

      if( description === 'login' || description === 'registration' ) {
        localStorage.setItem( 'refresh_token', response.refresh_token )
        localStorage.setItem( 'access_token', response.access_token )
      }

      if( description !== 'login' && description !== 'registration' && response && response.access_token && response.refresh_token ) {
        localStorage.setItem( 'refresh_token', response.refresh_token )
        localStorage.setItem( 'access_token', response.access_token )

        const new_res = await fetch( url, {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            refresh_token: response.refresh_token,
            access_token: response.access_token
          }),
          method: 'POST',
        })

        const new_response = await new_res.json()
        return new_response
      }

      return response
    } catch (error) {
      return null
    }
  },

  get: async ( url ) => {
    try {
      const res = await fetch( url )

      return await res.json()
    } catch (error) {
      // console.log( error );
    }
  }

}