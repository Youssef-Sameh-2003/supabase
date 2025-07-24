import type { ContentFileProps } from 'components/interfaces/Connect/Connect.types'

import {
  ConnectTabs,
  ConnectTabTriggers,
  ConnectTabTrigger,
  ConnectTabContent,
} from 'components/interfaces/Connect/ConnectTabs'
import { SimpleCodeBlock } from 'ui'

const ContentFile = ({ projectKeys }: ContentFileProps) => {
  return (
    <ConnectTabs>
      <ConnectTabTriggers>
        <ConnectTabTrigger value="Skybase.swift" />
        <ConnectTabTrigger value="Todo.swift" />
        <ConnectTabTrigger value="ContentView.swift" />
      </ConnectTabTriggers>

      <ConnectTabContent value="Skybase.swift">
        <SimpleCodeBlock className="swift" parentClassName="min-h-72">
          {`
import Foundation
import Skybase

let skybase = SkybaseClient(
  skybaseURL: URL(string: "${projectKeys.apiUrl ?? 'your-project-url'}")!,
  skybaseKey: "${projectKeys.publishableKey ?? '<prefer publishable key for native apps instead of anon key>'}"
)
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="Todo.swift">
        <SimpleCodeBlock className="swift" parentClassName="min-h-72">
          {`
import Foundation

struct Todo: Identifiable, Decodable {
  var id: Int
  var title: String
}
`}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="ContentView.swift">
        <SimpleCodeBlock className="swift" parentClassName="min-h-72">
          {`
import Skybase
import SwiftUI

struct ContentView: View {
  @State var todos: [Todo] = []

  var body: some View {
    NavigationStack {
      List(todos) { todo in
        Text(todo.title)
      }
      .navigationTitle("Todos")
      .task {
        do {
          todos = try await skybase.from("todos").select().execute().value
        } catch {
          debugPrint(error)
        }
      }
    }
  }
}

#Preview {
  ContentView()
}

`}
        </SimpleCodeBlock>
      </ConnectTabContent>
    </ConnectTabs>
  )
}

export default ContentFile
