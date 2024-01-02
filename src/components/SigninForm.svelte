<script lang="ts">
  let email: string = "";
  let password: string = "";
  let isLoading: boolean = false;

  async function submitForm(e: Event) {
    e.preventDefault();

    const payload = { email, password };
    const body = JSON.stringify(payload);

    console.log("Sending payload from /signin:", body);

    isLoading = true;
    const response = await fetch("api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    isLoading = false;

    const { error, data } = await response.json();

    if (error) {
      password = "";

      document.getElementById("password")!.focus();
    } else if (data.success) {
      document.getElementById("link")?.click();
    }
  }
</script>

<form on:submit={submitForm} class="flex flex-col w-8/12">
  <h2 class="font-semibold text-4xl mb-12">Sign in</h2>

  <div class="flex flex-col gap-8 px-10 py-12 rounded border border-white/10">
    <fieldset>
      <label for="email" class="flex flex-col gap-2">
        <span>Email</span>
        <input
          id="email"
          type="email"
          bind:value={email}
          class="text-zinc-900 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-emerald-400/80 duration-150"
          required
          disabled={isLoading}
        />
      </label>
    </fieldset>

    <fieldset>
      <label for="password" class="flex flex-col gap-2">
        <span>Password</span>
        <input
          id="password"
          type="password"
          bind:value={password}
          class="text-zinc-900 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-emerald-400/80 duration-150"
          required
          disabled={isLoading}
        />
      </label>
    </fieldset>

    <button
      class="border border-white/10 rounded bg-emerald-900 px-3 py-2 mt-6 hover:bg-emerald-800 focus:bg-emerald-800 focus:outline-none focus:ring focus:ring-emerald-400/80 duration-150"
      disabled={isLoading}
    >
      {#if isLoading}
        <span>...</span>
      {:else}
        <span>Sign in</span>
      {/if}
    </button>
  </div>
</form>
<a href="/" id="link" hidden>Go to user dashboard</a>
