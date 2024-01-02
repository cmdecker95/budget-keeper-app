<script lang="ts">
  let email: string = "";
  let password: string = "";
  let isLoading: boolean = false;

  async function submitForm(e: Event) {
    e.preventDefault();

    const payload = { email, password };
    const body = JSON.stringify(payload);

    isLoading = true;
    const response = await fetch("api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    isLoading = false;

    console.log(response.status);

    if (response.ok) {
      const { data } = await response.json();

      console.dir(data);
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
          type="text"
          bind:value={email}
          class="text-zinc-900 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-emerald-400/80 duration-150"
          required
        />
      </label>
    </fieldset>

    <fieldset>
      <label for="password" class="flex flex-col gap-2">
        <span>Password</span>
        <input
          type="password"
          bind:value={password}
          class="text-zinc-900 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-emerald-400/80 duration-150"
          required
        />
      </label>
    </fieldset>

    <button
      class="border border-white/10 rounded bg-emerald-900 px-3 py-2 mt-6 hover:bg-emerald-800 focus:bg-emerald-800 focus:outline-none focus:ring focus:ring-emerald-400/80 duration-150"
      >Sign in</button
    >
  </div>
</form>
