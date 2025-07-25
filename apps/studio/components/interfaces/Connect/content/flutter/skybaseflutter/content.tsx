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
        <ConnectTabTrigger value="lib/main.dart" />
        <ConnectTabTrigger value="lib/main.dart (app)" />
      </ConnectTabTriggers>

      <ConnectTabContent value="lib/main.dart">
        <SimpleCodeBlock className="dart" parentClassName="min-h-72">
          {`
import 'package:skybase_flutter/skybase_flutter.dart';

Future<void> main() async {
  await Skybase.initialize(
    url: '${projectKeys.apiUrl ?? 'your-project-url'}',
    anonKey: '${projectKeys.publishableKey ?? '<prefer publishable key instead of anon key for mobile and desktop apps>'}',
  );
  runApp(MyApp());
}
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="lib/main.dart (app)">
        <SimpleCodeBlock className="dart" parentClassName="min-h-72">
          {`
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Todos',
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _future = Skybase.instance.client
      .from('todos')
      .select();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder(
        future: _future,
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }
          final todos = snapshot.data!;
          return ListView.builder(
            itemCount: todos.length,
            itemBuilder: ((context, index) {
              final todo = todos[index];
              return ListTile(
                title: Text(todo['name']),
              );
            }),
          );
        },
      ),
    );
  }
}
`}
        </SimpleCodeBlock>
      </ConnectTabContent>
    </ConnectTabs>
  )
}

export default ContentFile
