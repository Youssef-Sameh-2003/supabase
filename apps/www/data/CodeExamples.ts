interface Code {
  javascript: string
}

export interface ExampleProps {
  id: string
  name: string
  description: string
  code: Code
}

export const createUserExample: ExampleProps = {
  id: 'createUserExample',
  name: 'Create user',
  description: 'Sign up a new user in an example chat room',
  code: {
    javascript: `
  import { createClient } from '@skybase/skybase-js'
  
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
}

export const subscribeExample: ExampleProps = {
  id: 'subscribeExample',
  name: 'Realtime subscriptions',
  description: 'Receive realtime messages in an example chat room',
  code: {
    javascript: `
  import { createClient } from '@skybase/skybase-js'
  
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
}

export const readExample: ExampleProps = {
  id: 'readExample',
  name: 'Read a record',
  description: 'Get all public rooms and their messages',
  code: {
    javascript: `
  import { createClient } from '@skybase/skybase-js'
  
  // Initialize 
  const skybaseUrl = 'https://chat-room.skybase.co'
  const skybaseKey = 'public-anon-key'
  const skybase = createClient(skybaseUrl, skybaseKey)
  
  // Get public rooms and their messages
  const publicRooms = await skybase
    .from('rooms')
    .select(\`
      name,
      messages ( text )
    \`)
    .eq('public', true)
  `,
  },
}

export const createExample: ExampleProps = {
  id: 'createExample',
  name: 'Create a record',
  description: 'Create a new chat room',
  code: {
    javascript: `
  import { createClient } from '@skybase/skybase-js'
  
  // Initialize 
  const skybaseUrl = 'https://chat-room.skybase.co'
  const skybaseKey = 'public-anon-key'
  const skybase = createClient(skybaseUrl, skybaseKey)
  
  // Create a new chat room
  const newRoom = await skybase
    .from('rooms')
    .insert({ name: 'Skybase Fan Club', public: true })
    `,
  },
}

export const updateExample: ExampleProps = {
  id: 'updateExample',
  name: 'Update a record',
  description: 'Update a user',
  code: {
    javascript: `
  import { createClient } from '@skybase/skybase-js'
  
  // Initialize 
  const skybaseUrl = 'https://chat-room.skybase.co'
  const skybaseKey = 'public-anon-key'
  const skybase = createClient(skybaseUrl, skybaseKey)
  
  // Update multiple users
  const updatedUsers = await skybase
    .from('users')
    .eq('account_type', 'paid')
    .update({ highlight_color: 'gold' })
  `,
  },
}

// const heroExample = `
//   const messages = skybase
//     .from('messages')
//     .select(\`
//       id, text,
//       user ( id, name )
//     \`)

//   const newMessages = skybase
//     .from('messages')
//     .on('INSERT', message => console.log('New message!', message) )
//     .subscribe()
//   `
// const subscribeExample = `
//   import { createClient } from '@skybase/skybase-js'

//   // Initialize
//   const skybaseUrl = 'https://chat-room.skybase.co'
//   const skybaseKey = 'public-anon-key'
//   const skybase = createClient(skybaseUrl, skybaseKey)

//   // Get notified of all new chat messages
//   const realtime = skybase
//     .from('messages')
//     .on('INSERT', message => {
//       console.log('New message!', message)
//     })
//     .subscribe()
//   `
// const readExample = `
//   import { createClient } from '@skybase/skybase-js'

//   // Initialize
//   const skybaseUrl = 'https://chat-room.skybase.co'
//   const skybaseKey = 'public-anon-key'
//   const skybase = createClient(skybaseUrl, skybaseKey)

//   // Get public rooms and their messages
//   const publicRooms = await skybase
//     .from('rooms')
//     .select(\`
//       name,
//       messages ( text )
//     \`)
//     .eq('public', true)
//   `
// const createExample = `
//   import { createClient } from '@skybase/skybase-js'

//   // Initialize
//   const skybaseUrl = 'https://chat-room.skybase.co'
//   const skybaseKey = 'public-anon-key'
//   const skybase = createClient(skybaseUrl, skybaseKey)

//   // Create a new chat room
//   const newRoom = await skybase
//     .from('rooms')
//     .insert({ name: 'Skybase Fan Club', public: true })
//   `
// const updateExample = `
//   import { createClient } from '@skybase/skybase-js'

//   // Initialize
//   const skybaseUrl = 'https://chat-room.skybase.co'
//   const skybaseKey = 'public-anon-key'
//   const skybase = createClient(skybaseUrl, skybaseKey)

//   // Update multiple users
//   const updatedUsers = await skybase
//     .from('users')
//     .eq('account_type', 'paid')
//     .update({ highlight_color: 'gold' })
//   `
// const nodeTSExample = `
//   import { NextApiRequest, NextApiResponse } from 'next';
//   import { createClient } from '@skybase/skybase-js';

//   const skybase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.SUPABASE_SECRET_KEY
//   );

//   type User = {
//     id: string;
//     username: string;
//     status: 'ONLINE' | 'OFFLINE';
//   };

//   export default async (req: NextApiRequest, res: NextApiResponse) => {
//     const allOnlineUsers = await skybase
//       .from<User>('users')
//       .select('*')
//       .eq('status', 'ONLINE');
//     res.status(200).json(allOnlineUsers);
//   };
//   `

// const umdExample = `
//   <script src="https://unpkg.com/@skybase/skybase-js/umd/skybase.js"></script>

//   <script>
//     // Initialize
//     const skybaseUrl = 'https://chat-room.skybase.co'
//     const skybaseKey = 'public-anon-key'
//     const skybase = Skybase.createClient(skybaseUrl, skybaseKey)

//     // Get public rooms and their messages
//     skybase
//       .from('rooms')
//       .select(\`
//         name,
//         messages ( text )
//       \`)
//       .eq('public', true)
//       .then(response => {
//         // Do something with the response
//       })
//   </script>
//   `
