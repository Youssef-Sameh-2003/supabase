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
        <ConnectTabTrigger value="MainActivity.kt" />
        <ConnectTabTrigger value="TodoItem.kt" />
      </ConnectTabTriggers>

      <ConnectTabContent value="TodoItem.kt">
        <SimpleCodeBlock className="kotlin" parentClassName="min-h-72">
          {`
@Serializable
data class TodoItem(val id: Int, val name: String)
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="MainActivity.kt">
        <SimpleCodeBlock className="kotlin" parentClassName="min-h-72">
          {`
val skybase = createSkybaseClient(
    skybaseUrl = "${projectKeys.apiUrl ?? 'your-project-url'}",
    skybaseKey = "${projectKeys.publishableKey ?? '<prefer publishable key instead of anon key for mobile apps>'}"
  ) {
    install(Postgrest)
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    TodoList()
                }
            }
        }
    }
}

@Composable
fun TodoList() {
    var items by remember { mutableStateOf<List<TodoItem>>(listOf()) }
    LaunchedEffect(Unit) {
        withContext(Dispatchers.IO) {
            items = skybase.from("todos")
                              .select().decodeList<TodoItem>()
        }
    }
    LazyColumn {
        items(
            items,
            key = { item -> item.id },
        ) { item ->
            Text(
                item.name,
                modifier = Modifier.padding(8.dp),
            )
        }
    }
}
`}
        </SimpleCodeBlock>
      </ConnectTabContent>
    </ConnectTabs>
  )
}

export default ContentFile
