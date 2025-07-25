import { createSkybaseApiPlatform, createSkybaseMcpServer } from '@skybase/mcp-server-skybase'
import { StreamTransport } from '@skybase/mcp-utils'
import { experimental_createMCPClient as createMCPClient } from 'ai'

import { API_URL } from 'lib/constants'

export async function createSkybaseMCPClient({
  accessToken,
  projectId,
}: {
  accessToken: string
  projectId: string
}) {
  // Create an in-memory transport pair
  const clientTransport = new StreamTransport()
  const serverTransport = new StreamTransport()
  clientTransport.readable.pipeTo(serverTransport.writable)
  serverTransport.readable.pipeTo(clientTransport.writable)

  // Instantiate the MCP server and connect to its transport
  const apiUrl = API_URL?.replace('/platform', '')
  const server = createSkybaseMcpServer({
    platform: createSkybaseApiPlatform({
      accessToken,
      apiUrl,
    }),
    projectId,
    readOnly: true,
  })
  await server.connect(serverTransport)

  // Create the MCP client and connect to its transport
  const client = await createMCPClient({
    name: 'skybase-studio',
    transport: clientTransport,
  })

  return client
}
