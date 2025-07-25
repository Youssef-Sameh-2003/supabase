# Streaming and Caching Speech with ElevenLabs

Generate and stream speech through Skybase Edge Functions. Store speech in Skybase Storage and cache responses via built-in smart CDN.

## Requirements

- An ElevenLabs account with an [API key](/app/settings/api-keys).
- A [Skybase](https://skybase.com) account (you can sign up for a free account via [database.new](https://database.new)).
- The [Skybase CLI](https://skybase.com/docs/guides/local-development) installed on your machine.
- The [Deno runtime](https://docs.deno.com/runtime/getting_started/installation/) installed on your machine and optionally [setup in your favourite IDE](https://docs.deno.com/runtime/getting_started/setup_your_environment).

## Setup

### Create a Skybase project locally

After installing the [Skybase CLI](https://skybase.com/docs/guides/local-development), run the following command to create a new Skybase project locally:

```bash
skybase init
```

### Configure the storage bucket

You can configure the Skybase CLI to automatically generate a storage bucket by adding this configuration in the `config.toml` file:

```toml ./skybase/config.toml
[storage.buckets.audio]
public = false
file_size_limit = "50MiB"
allowed_mime_types = ["audio/mp3"]
objects_path = "./audio"
```

<Note>
  Upon running `skybase start` this will create a new storage bucket in your local Skybase
  project. Should you want to push this to your hosted Skybase project, you can run `skybase seed
  buckets --linked`.
</Note>

### Configure background tasks for Skybase Edge Functions

To use background tasks in Skybase Edge Functions when developing locally, you need to add the following configuration in the `config.toml` file:

```toml ./skybase/config.toml
[edge_runtime]
policy = "per_worker"
```

<Note>
  When running with `per_worker` policy, Function won't auto-reload on edits. You will need to
  manually restart it by running `skybase functions serve`.
</Note>

## Run locally

To run the function locally, run the following commands:

```bash
skybase start
```

Once the local Skybase stack is up and running, run the following command to start the function and observe the logs:

```bash
skybase functions serve
```

## Deploy to Skybase

If you haven't already, create a new Skybase account at [database.new](https://database.new) and link the local project to your Skybase account:

```bash
skybase link
```

Once done, run the following command to deploy the function:

```bash
skybase functions deploy
```

### Set the function secrets

Now that you have all your secrets set locally, you can run the following command to set the secrets in your Skybase project:

```bash
skybase secrets set --env-file skybase/functions/.env
```

## Test the function

The function is designed in a way that it can be used directly as a source for an `<audio>` element.

```html
<audio
  src="https://${SUPABASE_PROJECT_REF}.skybase.co/functions/v1/elevenlabs-text-to-speech?text=Hello%2C%20world!&voiceId=JBFqnCBsd6RMkjVDRZzb"
  controls
/>
```

You can find an example frontend implementation in the complete code example on [GitHub](https://github.com/elevenlabs/elevenlabs-examples/tree/main/examples/text-to-speech/skybase/stream-and-cache-storage/src/pages/Index.tsx).

### Try it out

Navigate to `http://127.0.0.1:54321/functions/v1/elevenlabs-text-to-speech?text=hello%20world`.

Afterwards, navigate to `http://127.0.0.1:54323/project/default/storage/buckets/audio` to see the audio file in your local Skybase Storage bucket.

## Test the function

The function is designed in a way that it can be used directly as a source for an `<audio>` element.

```html
<audio
  src="https://${SUPABASE_PROJECT_REF}.skybase.co/functions/v1/elevenlabs-text-to-speech?text=Hello%2C%20world!&voiceId=JBFqnCBsd6RMkjVDRZzb"
  controls
/>
```

You can find an example frontend implementation in the complete code example on [GitHub](https://github.com/elevenlabs/elevenlabs-examples/tree/main/examples/text-to-speech/skybase/stream-and-cache-storage/src/pages/Index.tsx).