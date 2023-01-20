export default {

  current: {
    user: null,
    activeWindow: null,
    windows: [
      'navigation'
    ],
    component: null, 
    loaderPost: false,
    loaderCurrentPost: false,
    loaderRoom: false,
    messageText: null,
    searchRoom: null,
    sendStop: false,
    search: null,
    filter: null,
    color: null,
    room: null,
    post: null,
    tegs: []
  },
  
  timeMessage: null,
  dropFillMessage: true,
  messageTextarea: null,
  activeRoom: false,

  error: {
    messages: [],
    color: 'green',
    active: true
  },

  pusher: new Pusher('c5d1c043a1df74896204', {
    cluster: 'ap2'
  }),

  steps: {
    text: { status: false, timeStart: 3000 },
    loader: { status: false, timeStart: 3500, timeEnd: 6400 },
    settings: { status: false, timeStart: 10000 },
  },

  navigation: [
    { black_img: 'black-folders', white_img: 'white-folders', title: 'about', status: false },
    { black_img: 'black-html-file', white_img: 'white-html-file', title: 'posts', status: false },
    { black_img: 'black-folders', white_img: 'white-folders', title: 'profiler', status: false },
    { black_img: 'black-css-file', white_img: 'white-css-file', title: 'settings', status: false },
    { black_img: 'black-php-file', white_img: 'white-php-file', title: 'rooms', status: false },
    { black_img: 'black-ppt-file', white_img: 'white-ppt-file', title: 'login', status: false },
    { black_img: 'black-xls-file', white_img: 'white-xls-file', title: 'registration', status: false },
    { black_img: 'black-odt-file', white_img: 'white-odt-file', title: 'exit', status: false },
    { black_img: 'black-odt-file', white_img: 'white-odt-file', title: 'admin panel', status: false },
  ],

  filters: [
    'popular', 'no answer', 'answer', 'new post', 'your post'
  ],

  colors: [
    { title: 'default', theme: {active: '66f2ff', double: 'a5a5a52e', color: 'a5a5a5'} },
    { title: 'aid', theme: {active: 'ff0000', double: 'a5a5a52e', color: 'a5a5a5'} },
    { title: 'matrix', theme: {active: '37ff00', double: 'a5a5a52e', color: 'a5a5a5'} },
    { title: 'pink dady', theme: {active: 'ff85f7', double: 'a5a5a52e', color: 'a5a5a5'} },
  ],

  messages: null,
  rooms: [],

  posts: [],
  tegs: [],

  formRoomPassword: {
    password: null,
  },

  inputRoomPassword: [
    { where: 'password', settings: { title: 'Enter password room', type: 'password', placeholder: 'C9U20...', id: 'roomPass', min: 5, max: 11 } },
  ],

  formCreateAnswer: {
    text: null,
  },

  inputCreateAnswer: [
    { where: 'text', settings: { title: 'Enter your answer', type: 'text', placeholder: 'My first answer', id: 'postAnswerText', min: 0, max: 500 } },
  ],

  formUpdatePost: {
    description: null,
    title: null,
    tegs: [],
  },

  inputUpdatePost: [
    { where: 'title', settings: { title: 'Enter your title', type: 'text', placeholder: 'My first post', id: 'postTitle', min: 0, max: 64 } },
    { where: 'description', settings: { title: 'Enter your description', type: 'text', placeholder: 'This is my first post', id: 'postDescription', min: 0, max: 460 } },
  ],

  formCreatePost: {
    description: null,
    title: null,
  },

  inputCreatePost: [
    { where: 'title', settings: { title: 'Enter your title', type: 'text', placeholder: 'My first post', id: 'postTitle', min: 0, max: 64 } },
    { where: 'description', settings: { title: 'Enter your description', type: 'text', placeholder: 'This is my first post', id: 'postDescription', min: 0, max: 460 } },
  ],

  formLog: {
    password: null,
    email: null,
  },

  inputLog: [
    { where: 'email', settings: { title: 'Enter your email', type: 'email', placeholder: 'serega@gmail.com...', id: 'logEmail', min: 0, max: 32 } },
    { where: 'password', settings: { title: 'Enter your password', type: 'password', placeholder: '0R9UC3...', id: 'logPass', min: 5, max: 11 } },
  ],

  formReg: {
    password: null,
    dbPassword: null,
    agreement: null,
    email: null,
    name: null,
  },

  inputReg: [
    { where: 'name', settings: { title: 'Enter your name', type: 'text', placeholder: 'Serega', id: 'regName', min: 3, max: 7 } },
    { where: 'email', settings: { title: 'Enter your email', type: 'email', placeholder: 'serega@gmail.com...', id: 'regEmail', min: 0, max: 32 } },
    { where: 'password', settings: { title: 'Enter your password', type: 'password', placeholder: '0R9UC3...', id: 'regPass', min: 5, max: 11 } },
    { where: 'dbPassword', settings: { title: 'Repeat your password', type: 'password', placeholder: '0R9UC3...', id: 'regDbPass', min: 5, max: 11 } },
  ]
  
}