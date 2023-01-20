// import of all helper components 
import helper from './helper.js'
import store from './store.js'

// import of all vue components 
import vCanvasup from './components/canvas.js'
import vCanvasone from './components/canvastriangle.js'
import vCanvasthree from './components/canvasstars.js'
import vCanvastwo from './components/canvasdot.js'
import vError from './components/error.js'
import vInput from './components/input.js'
import vText from './components/text.js'
import vCmd from './components/cmd.js'

// import of all effect
import scramble from './effects/scramble.js'
import typing from './effects/typing.js'

// vue component
Vue
  .createApp({

    data: () => store,

    watch: {
      async messageTextarea( newVal, oldVal ) {
        if( this.current.user.user_name === this.current.room.recording ) {
          if( this.dropFillMessage ) {
            clearTimeout( this.timeMessage )
            this.dropFillMessage = false

            this.timeMessage = setTimeout(async () => {
              const res = await helper.post( 'https://serega-test.store/api/messages/update', {
                refresh_token: localStorage.getItem( 'refresh_token' ),
                access_token: localStorage.getItem( 'access_token' ),
                password: this.formRoomPassword.password,
                room_id: this.current.room.id,
                text: newVal,
              });
            }, 100)

            this.dropFillMessage = true
          }
        }
      }
    },

    methods: {

      async updateRoom() {
        const res = await helper.post( 'https://serega-test.store/api/rooms/update', {
          refresh_token: localStorage.getItem( 'refresh_token' ),
          access_token: localStorage.getItem( 'access_token' ),
          password: this.current.room.password,
          recording: this.current.recording,
        });

        if( res && res.error ) {
          this.message( res.error.message, res.error.code )
          return
        }
      },

      async message( messages, code ) {
        this.error.messages = await []
        this.error.color = await 'green'
        this.error.active = await true
  
        for( let key in messages ) {
          this.error.messages.push( ...messages[key] )
        }

        this.error.color = code > 201 ? 'red' : 'green'
        this.error.active = true
      },

      async getMessagesRoom() {
        this.current.room.password = this.formRoomPassword.password
        this.current.loaderRoom = true
        this.messages = null

        const res = await helper.post( 'https://serega-test.store/api/messages/show', {
          refresh_token: localStorage.getItem( 'refresh_token' ),
          access_token: localStorage.getItem( 'access_token' ),
          password: this.formRoomPassword.password,
          room_id: this.current.room.id,
        });

        if( res && res.error ) {
          this.message( res.error.message, res.error.code )
          return
        }

        this.messages = res === null || res === undefined ? [] : res
        this.current.loaderRoom = false
        
        this.channelMessage.bind(`message-event${ this.current.room ? this.current.room.id + '' + this.current.room.password : 0 }`, ( data ) => {
          if( this.current.room.type === 'chat' ) {
            this.current.loaderRoom = false
            this.messages = data.message
            this.$refs.containerMessages.scrollTop = 99999999999999
          } else if( this.current.user.user_name !== this.current.room.recording ) {
            this.messageTextarea = data.message[ data.message.length - 1 ].text
            this.current.room.recording = data.recording
          }
        });
        
        this.message( { success: [`Вы подключились к комнате`] }, 201 )
        this.activeRoom = true

        if( this.current.room.type === 'share' ) {
          const res_two = await helper.post( 'https://serega-test.store/api/messages/show', {
            refresh_token: localStorage.getItem( 'refresh_token' ),
            access_token: localStorage.getItem( 'access_token' ),
            password: this.formRoomPassword.password,
            room_id: this.current.room.id,
          });
          
          if( res_two && res_two.error ) {
            this.message( res_two.error.message, res_two.error.code )
            return
          }
          
          this.messageTextarea = res_two[0].text
        }
      },

      async createMessage() {
        this.current.loaderRoom = true
        this.current.sendStop = true

        const res = await helper.post( 'https://serega-test.store/api/messages/create', {
          refresh_token: localStorage.getItem( 'refresh_token' ),
          access_token: localStorage.getItem( 'access_token' ),
          password: this.formRoomPassword.password,
          text: this.current.messageText,
          room_id: this.current.room.id,
        });

        if( res && res.error ) {
          this.message( res.error.message, res.error.code )
          return
        }

        this.current.sendStop = false
        this.current.messageText = null
        this.$refs.containerMessages.scrollTop = 99999999999999
      },

      async updateLike() {
        this.current.windows = this.current.windows.filter( el => el !== 'update-post' && el !== 'info-post' )
        this.current.activeWindow = 'posts'
        this.current.loaderPost = true
        this.posts = []

        const res = await helper.post( 'https://serega-test.store/api/likes/update', {
          refresh_token: localStorage.getItem( 'refresh_token' ),
          access_token: localStorage.getItem( 'access_token' ),
          post_id: this.current.post.id
        });
      },

      async createAnswer() {
        this.current.windows = this.current.windows.filter( el => el !== 'create-answer' )
        this.current.activeWindow = 'info-post'
        this.current.loaderCurrentPost = true

        const res = await helper.post( 'https://serega-test.store/api/answers/create', {
          refresh_token: localStorage.getItem( 'refresh_token' ),
          access_token: localStorage.getItem( 'access_token' ),
          post_id: this.current.post.id,
          ...this.formCreateAnswer
        });

        this.message( { success: [`Ответ опубликован`] }, 201 )
      },

      async deleteAnswer( id ) {
        this.current.windows = this.current.windows.filter( el => el !== 'update-answer' )
        this.current.activeWindow = 'info-post'
        this.current.loaderCurrentPost = true

        const res = await helper.post( 'https://serega-test.store/api/answers/delete', {
          refresh_token: localStorage.getItem( 'refresh_token' ),
          access_token: localStorage.getItem( 'access_token' ),
          post_id: this.current.post.id,
          answer_id: id,
        });

        this.message( { success: [`Ответ удален`] }, 201 )
      },

      async updateAnswer( id, bool ) {
        this.current.windows = this.current.windows.filter( el => el !== 'update-answer' )
        this.current.activeWindow = 'info-post'
        this.current.loaderCurrentPost = true

        const res = await helper.post( 'https://serega-test.store/api/answers/update', {
          refresh_token: localStorage.getItem( 'refresh_token' ),
          access_token: localStorage.getItem( 'access_token' ),
          post_id: this.current.post.id,
          answer_id: id,
          correct: bool
        });
      },

      async log() {
        const res = await helper.post( 'https://serega-test.store/api/login', this.formLog, 'login' )
        
        if( res && res.error ) {
          this.message( res.error.message, res.error.code )
          return
        }

        const payload = res.access_token.split( '.' )[1]
        this.current.user = JSON.parse( atob(payload) )

        this.message( { success: [`Добро пожаловать ${this.current.user.user_name} (0_0)/`] }, 201 )
      },

      async reg() {
        if( this.formReg.password !== this.formReg.dbPassword ) return
        const res = await helper.post( 'https://serega-test.store/api/registration', this.formReg, 'registration' )

        if( res && res.error ) {
          this.message( res.error.message, res.error.code )
          return
        }

        const payload = res.access_token.split( '.' )[1]
        this.current.user = JSON.parse( atob(payload) )

        this.message( { success: [`Добро пожаловать ${this.current.user.user_name} (0_0)/`] }, 201 )
      },

      exit() {
        this.current.windows = [ 'navigation' ]
        this.current.user = null

        localStorage.removeItem( 'refresh_token' )
        localStorage.removeItem( 'access_token' )
      },

      isActiveTegs( el ) {
        if( this.current.tegs.includes( el ) ) this.current.tegs = this.current.tegs.filter( elem => elem !== el )
        else this.current.tegs.push( el )
      },

      isActivePostTegs( el ) {
        if( this.formUpdatePost.tegs.includes( el ) ) this.formUpdatePost.tegs = this.formUpdatePost.tegs.filter( elem => elem !== el )
        else this.formUpdatePost.tegs.push( el )
      },

      selectPost() {
        const copy = JSON.parse(JSON.stringify(this.current.post))
        this.formUpdatePost.description = copy.description
        this.formUpdatePost.title = copy.title
        this.formUpdatePost.tegs = copy.tegs
      },

      isActiveWindow( title ) {
        return this.current.windows.includes( title )
      },

      async createPost() {
        this.current.windows = this.current.windows.filter( el => el !== 'update-post' && el !== 'info-post' )
        this.current.activeWindow = 'posts'
        this.current.loaderPost = true
        this.posts = []

        const res = await helper.post( 'https://serega-test.store/api/posts/create', {
          refresh_token: localStorage.getItem( 'refresh_token' ),
          access_token: localStorage.getItem( 'access_token' ),
          tegs: this.current.tegs,
          ...this.formCreatePost,
        })

        this.message( { success: [`Пост создан`] }, 201 )
      },

      async deletePost() {
        this.current.windows = this.current.windows.filter( el => el !== 'update-post' && el !== 'info-post' )
        this.current.activeWindow = 'posts'
        this.current.loaderPost = true
        this.posts = []

        const res = await helper.post( 'https://serega-test.store/api/posts/delete', {
          refresh_token: localStorage.getItem( 'refresh_token' ),
          access_token: localStorage.getItem( 'access_token' ),
          post_id: this.current.post.id
        });

        this.message( { success: [`Пост удален`] }, 201 )
      },

      async updatePost() {
        this.current.windows = this.current.windows.filter( el => el !== 'update-post' && el !== 'info-post' )
        this.current.activeWindow = 'posts'
        this.current.loaderPost = true
        this.posts = []

        const res = await helper.post( 'https://serega-test.store/api/posts/update', {
          refresh_token: localStorage.getItem( 'refresh_token' ),
          access_token: localStorage.getItem( 'access_token' ),
          post_id: this.current.post.id,
          ...this.formUpdatePost
        });

        this.message( { success: [`Пост обновлен`] }, 201 )
      },

      async eventAnswer() {
        this.channelAnswer.bind(`answer-event${ this.current.post ? this.current.post.id : 0 }`, ( data ) => {
          this.current.loaderCurrentPost = false
          this.current.post.answers = data.message
        });

        if( this.current.user ) {
          const res = await helper.post( 'https://serega-test.store/api/wiews/update', {
            refresh_token: localStorage.getItem( 'refresh_token' ),
            access_token: localStorage.getItem( 'access_token' ),
            post_id: this.current.post.id
          });
        }
      },

      colorTheme( theme ) {
        if( this.current.color && this.current.color.theme.active === theme.theme.active ) return
        const html = document.documentElement
        this.current.color = theme
        
        html.style.setProperty( '--font-color-active', `#${ this.current.color.theme.active }` )
        html.style.setProperty( '--font-color-double', `#${ this.current.color.theme.double }` )
        html.style.setProperty( '--font-color', `#${ this.current.color.theme.color }` )
        
        const old = this.current.component; this.current.component = '';
        setTimeout(() => this.current.component = old, 0)

        localStorage.setItem( 'theme', JSON.stringify(this.current.color) )
      },

      setCanvas( canvas ) {
        this.current.component = canvas
        localStorage.setItem( 'canvas', canvas )
      }
      
    },

    computed: {

      channelRoom() {
        return this.pusher.subscribe(`room-channel`)
      },

      channelMessage() {
        return this.pusher.subscribe(`message-channel`)
      },

      channelPost() {
        return this.pusher.subscribe(`post-channel`)
      },

      channelAnswer() {
        return this.pusher.subscribe(`answer-channel`)
      },

      isActiveCreatePostBtn() {
        return this.formCreatePost.title && this.formCreatePost.description
      },

      isActiveUpdatePostBtn() {
        return this.formUpdatePost.title && this.formUpdatePost.description
      },
      
      isActiveRegBtn() {
        return this.formReg.name && this.formReg.email && this.formReg.password && this.formReg.dbPassword 
      },

      roomType() {
        return this.current.room && this.current.room.type === 'share'
      },

      isActiveLogBtn() {
        return this.formLog.email && this.formLog.password
      },
      
      isActiveRoomPasswordBtn() {
        return this.formRoomPassword.password
      },

      isActiveCreateAnswerBtn() {
        return this.formCreateAnswer.text
      },

      isActiveNewMessageBtn() {
        if( typeof this.current.messageText === 'string' ) return this.current.messageText.trim()
        else return this.current.messageText
      },
      
      arrayFilters() {
        let copy = [ ...this.filters ]
        if( !this.current.user ) return copy = copy.filter( el => el !== 'your post' )
        return copy
      },

      filterNavigation() {
        let copy = [ ...this.navigation ]

        if( !this.current.user || this.current.user.user_role !== 'admin' ) copy = copy.filter( el => el.title !== 'admin panel' )
        
        if( this.current.user ) {
          this.current.windows = this.current.windows.filter( el => el !== 'login' && el !== 'registration' )
          copy = copy.filter( el => el.title !== 'login' && el.title !== 'registration' )
        }

        if( !this.current.user ) copy = copy.filter( el => el.title !== 'exit' && el.title !== 'profiler' && el.title !== 'rooms' )

        return copy
      },

      filterPosts() {
        let 
          copy = [ ...this.posts ],
          filters = {
            'popular': "copy.sort( ( a, b ) => ( a.wiews > b.wiews && -1 ) || ( a.wiews < b.wiews && 1 ) || 0 )",
            'no answer': "copy.filter( el => el.answers ? el.answers.length === 0 : el.answers === null )",
            'answer': "copy.filter( el => el.answers ? el.answers.length !== 0 : el.answers !== null )",
            'new post': "copy.filter( el => el.date === new Date().toLocaleDateString('ru-Ru') )",
            'your post': "copy.filter( el => el.author.id === this.current.user.user_id )",
          };

        if( this.current.search ) {
          copy = copy.filter( el => el.title.toLowerCase().trim().includes(this.current.search.toLowerCase().trim()) )
        }

        if( this.current.tegs.length ) {
          copy = copy.filter( el => {
            return this.current.tegs.some( teg => {
              if( el.tegs.includes( teg ) ) {
                return true
              }
            })
          })
        }

        if( this.current.filter ) {
          copy = eval( filters[ this.current.filter ] )
        }

        return copy
      },

      filterRooms() {
        let copy = [ ...this.rooms ]

        if( this.current.searchRoom ) {
          copy = copy.filter( el => el.title.toLowerCase().trim().includes(this.current.searchRoom.toLowerCase().trim()) )
        }
        
        return copy
      }

    },

    components: { 
      vCanvasone, vCanvastwo, vCanvasthree, vCanvasup, vText, vCmd, vInput, vError
    },

    async mounted() {

      const theme = localStorage.getItem( 'theme' )
      if( theme ) this.colorTheme( JSON.parse(theme) )
      else this.colorTheme({
        title: 'default', 
        theme: {
          active: '66f2ff',
          double: 'a5a5a52e',
          color: 'a5a5a5'
        }
      })

      const html = document.documentElement
      html.addEventListener( 'mousemove', e => {
        html.style.setProperty( '--mouseX', `${ e.clientX }px` )
        html.style.setProperty( '--mouseY', `${ e.clientY }px` )
        if( this.$refs.mouse ) this.$refs.mouse.style.display = 'block'
      })

      this.channelPost.bind('post-event', ( data ) => {
        this.current.loaderPost = false
        this.posts = data.message
      });

      this.channelRoom.bind('room-event', ( data ) => {
        this.current.windows = this.current.windows.filter( el => el !== 'messages' )
        this.rooms = data.message
      });

      for( let key in this.steps ) {
        setTimeout(() => {

          if( key === 'settings' ) {
            const canvas = localStorage.getItem( 'canvas' )
            canvas ? this.setCanvas( canvas ) : this.setCanvas( 'vCanvastwo' ) 
          }
          
          this.steps[key].status = true

          if( this.steps[key].timeEnd ) {
            setTimeout(() => {
              this.steps[key].status = false
            }, this.steps[key].timeEnd)
          }

        }, this.steps[key].timeStart)
      }

      const access_token = await localStorage.getItem( 'access_token' )
      if( access_token && access_token !== 'undefined' && access_token !== 'null' ) {
        const payload = await access_token.split( '.' )[1]
        this.current.user = await JSON.parse( atob(payload) )
      }

      const posts = await helper.post( 'https://serega-test.store/api/posts' )
      posts ? this.posts = posts : ''

      const tegs = await helper.post( 'https://serega-test.store/api/tegs' )
      tegs ? this.tegs = tegs : ''

      const rooms = await helper.post( 'https://serega-test.store/api/rooms' )
      rooms ? this.rooms = rooms : ''
      
    }

  })
  .directive( 'scramble', ( el, binding ) => {
    
    const effect = new scramble( el, binding.value.char, binding.value.amount, binding.value.speed, binding.value.duration || 0 )
    effect.setText( el.textContent )

  })
  .directive( 'typing', ( el, binding ) => {
    
    const effect = new typing( el, binding.value.char, binding.value.amount, binding.value.speed, binding.value.duration || 0 )
    effect.setText( el.textContent )

  })
  .directive( 'activing', ( el, binding ) => {
    
    const observer = new IntersectionObserver( (entries, observer) => entries.forEach( entry => {
      if( entry.isIntersecting ) {
        el.classList.add( 'active' )
        observer.unobserve( el )
      }
    }), { threshold: 0.5 } );
    observer.observe( el )

  })
  .mount( '#app' )