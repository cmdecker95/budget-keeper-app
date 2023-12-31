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

<form on:submit={submitForm}>
  <h2>Sign in</h2>

  <fieldset>
    <label for="email">
      <span>Email</span>
      <input type="text" placeholder="Your email" bind:value={email} />
    </label>
  </fieldset>

  <fieldset>
    <label for="password">
      <span>Your password</span>
      <input type="password" bind:value={password} />
    </label>
  </fieldset>

  <button>Sign in</button>
</form>
