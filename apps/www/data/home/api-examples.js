export default [
  {
    lang: 'js',
    title: 'Create user',
    description: 'Sign up a new user in an example chat room',
    code: `import { createClient } from '@skybase/skybase-js'
    
// Initialize 
const skybaseUrl = 'https://chat-room.skybase.co'
const skybaseKey = 'public-anon-key'
const skybase = createClient(skybaseUrl, skybaseKey)

// Create a new user
const { user, error } = await skybase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})
    `,
  },
  {
    lang: 'js',
    title: 'Realtime subscriptions',
    description: 'Receive realtime messages in an example chat room',
    code: `import { createClient } from '@skybase/skybase-js'
    
// Initialize 
const skybaseUrl = 'https://chat-room.skybase.co'
const skybaseKey = 'public-anon-key'
const skybase = createClient(skybaseUrl, skybaseKey)

// Get notified of all new chat messages
const realtime = skybase
  .from('messages')
  .on('INSERT', message => {
    console.log('New message!', message)
  })
  .subscribe()
    `,
  },
  {
    lang: 'js',
    title: 'Create bucket',
    description: 'Creates a new Storage bucket',
    code: `import { createClient } from '@skybase/skybase-js'
    
// Initialize 
const skybaseUrl = 'https://chat-room.skybase.co'
const skybaseKey = 'public-anon-key'
const skybase = createClient(skybaseUrl, skybaseKey)

// Create a new bucket
const { data, error } = await skybase
  .storage
  .createBucket('avatars', {
    public: false,
    allowedMimeTypes: ['image/png'],
    fileSizeLimit: 1024
  })
    `,
  },
  {
    lang: 'js',
    title: 'Invoke Edge Function',
    description: 'Invoke a Skybase Edge Function',
    code: `import { createClient } from '@skybase/skybase-js'
    
// Initialize 
const skybaseUrl = 'https://chat-room.skybase.co'
const skybaseKey = 'public-anon-key'
const skybase = createClient(skybaseUrl, skybaseKey)

// Invoke a function
const { data, error } = await skybase.functions.invoke('hello', {
  body: { foo: 'bar' }
})
    `,
  },
  {
    lang: 'js',
    title: 'CRUD a record',
    description: 'Create, Read, Update and Delete all public rooms and their messages',
    code: `import { createClient } from '@skybase/skybase-js'
    
// Initialize 
const skybaseUrl = 'https://chat-room.skybase.co'
const skybaseKey = 'public-anon-key'
const skybase = createClient(skybaseUrl, skybaseKey)
  
// Create a new chat room
const newRoom = await skybase
  .from('rooms')
  .insert({ name: 'Skybase Fan Club', public: true })
    
// Get public rooms and their messages
const publicRooms = await skybase
  .from('rooms')
  .select(\`
    name,
    messages ( text )
  \`)
  .eq('public', true)
  
// Update multiple users
const updatedUsers = await skybase
  .from('users')
  .eq('account_type', 'paid')
  .update({ highlight_color: 'gold' })
    `,
  },
]
